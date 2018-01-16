/* eslint-disable */
angular.module('vamp-ui').controller('editBlueprintController',

function ($scope, $state, $stateParams, $vamp, artifact, $interval, toastr, $filter, $timeout, uiStatesFactory, revisionsService, $element, snippet, alert, $authorization) {

  var $ctrl = this;

  this.kind = $scope.$resolve.model;
  this.name = $stateParams.name;
  this.title = $filter('decodeName')(this.name);

  this.errorClass = '';
  this.errorMessage = '';
  $ctrl.restOfMessage = '';
  this.editor = artifact.editor;
  $ctrl.expandError = false;
  $ctrl.sourceCopy = {};

  var path = '/' + this.kind + '/' + this.name;

  this.base = null;
  this.source = null;

  $scope.activeRevision = revisionsService.activeRevision;

  this.valid = true;
  $ctrl.inEdit = false;
  var validation = true;
  var ignoreChange = false;
  $ctrl.readOnly = function () {
    return $authorization.readOnly($ctrl.kind);
  };

  $scope.$watch('activeRevision', function (oldVal, newVal) {
    if (oldVal !== newVal) {
      if (_.isEmpty(newVal)) {
        $ctrl.source = $ctrl.sourceCopy;
      } else {
        $ctrl.inEdit = false;
        $ctrl.source = YAML.parse(newVal.source);

      }
      populateBlueprint();
    }
  }, true);

  function init() {
    if ($state.current.name === 'artifacts.one.source.view') {
      $ctrl.stopEdit();
    } else {
      $ctrl.startEdit();
    }
  }

  $scope.$on('$destroy', function () {
    uiStatesFactory.setRightPanelViewState(uiStatesFactory.STATE_ENUM.HIDDEN);
  });

  function transformErrorMessage(message) {
    $ctrl.errorMessage = message;

    var newLineIndex = message.indexOf('\n');
    if (newLineIndex !== -1) {
      $ctrl.errorMessage = message.substring(0, newLineIndex);
      $ctrl.restOfMessage = message.substring(newLineIndex + 1);
      $ctrl.expandError = false;
    }
  }

  $ctrl.startEdit = function () {
    $ctrl.inEdit = true;

    $state.go('^.edit').then(function () {
      uiStatesFactory.setRightPanelViewState(uiStatesFactory.STATE_ENUM.EXPANDED);
      $timeout(function () {
        $($element).find('#editor textarea').focus();
      });
    });
  };

  $ctrl.stopEdit = function () {
    $ctrl.source = $ctrl.base;
    $ctrl.inEdit = false;

    $state.go('^.view').then(function () {
      $timeout(function () {
        $ctrl.peek();
      });

      uiStatesFactory.setRightPanelViewState(uiStatesFactory.STATE_ENUM.EXPANDED);
    });
  };


  //* Initial Empty BluePrint
  $ctrl.blueprint = {
    name: '',
    gateways: {
      name: '',
      port: ''
    },
    breed: {
      deployable: '',
      ports: [{
        name: '',
        port: '',
        protocol: ""
      }],
      variables: [{
        key: '',
        value: ''
      }]
    },
    scale: {
      cpu: '',
      instances: '',
      memory: ''
    },
    dialects: {
      forceimage: false,
      params: [{
        key: '',
        value: ''
      }]
    }
  };

  this.peek = function () {
    $vamp.get(path, null, 'JSON').then(function (response) {
      if ($ctrl.base === null) {
        $ctrl.valid = true;
        $ctrl.base = $ctrl.source = response.data;
        $ctrl.sourceCopy = angular.copy($ctrl.source);
        populateBlueprint();
      }
    });

    $vamp.peek('/events', JSON.stringify({
      tags: [
        'archive', $ctrl.kind + ':' + $ctrl.name
      ]
    }), {
      type: 'archive'
    });
  }

  function populateBlueprint() {

    //* Populate bounded blueprint
    for (port in $ctrl.source.gateways) {
      $ctrl.blueprint.gateways.port = parseInt(port);
    }

    for (portName in $ctrl.source.gateways[$ctrl.blueprint.gateways.port].routes) {
      var blueprint_name = portName.split("/")[0];
      var port_name = portName.split("/")[1];
      $ctrl.blueprint.name = blueprint_name;
      $ctrl.blueprint.gateways.name = port_name;
    }

    $ctrl.blueprint.breed.deployable = $ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.deployable.definition;
    $ctrl.blueprint.scale = $ctrl.source.clusters[$ctrl.blueprint.name].services[0].scale;
    $ctrl.blueprint.dialects.forceimage = $ctrl.source.clusters[$ctrl.blueprint.name].services[0].dialects.marathon.container.docker.forcePullImage;

    $ctrl.blueprint.breed.ports = [];
    for (portName in $ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.ports) {
      $ctrl.blueprint.breed.ports.push({
        name: portName,
        port: parseInt($ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.ports[portName].split("/")[0]),
        protocol: $ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.ports[portName].split("/")[1]
      })
    }

    $ctrl.blueprint.breed.variables = [];
    for (varName in $ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.environment_variables) {
      $ctrl.blueprint.breed.variables.push({
        key: varName,
        value: $ctrl.source.clusters[$ctrl.blueprint.name].services[0].breed.environment_variables[varName]
      })
    }

    for (paramName in $ctrl.source.clusters[$ctrl.blueprint.name].services[0].dialects.marathon.container.docker.parameters) {
      $ctrl.blueprint.dialects.params = $ctrl.source.clusters[$ctrl.blueprint.name].services[0].dialects.marathon.container.docker.parameters;
    }
  }

  this.peek();

  $scope.$on(path, function (e, response) {
    if (response.content === 'JSON') {
      if (response.status === 'ERROR') {
        $ctrl.valid = false;
        $ctrl.errorClass = 'error';
        transformErrorMessage(response.data.message);
        $ctrl.expandError = false;
      } else {
        $ctrl.valid = true;
        $ctrl.errorClass = '';
        $ctrl.errorMessage = '';
        $ctrl.restOfMessage = '';
        $ctrl.expandError = false;
      }
    }
  });

  $scope.$on('/events/stream', function (e, response) {

    if ($ctrl.base && _.includes(response.data.tags, $ctrl.kind + ':' + $ctrl.name)) {
      if (_.includes(response.data.tags, 'archive:delete')) {
        alert.show('Warning', '\'' + $ctrl.name + '\' has been deleted in background. If you save the content, \'' + $ctrl.name + '\' will be recreated.', 'OK');
      } else if (!ignoreChange && _.includes(response.data.tags, 'archive:update')) {
        alert.show('Warning', '\'' + $ctrl.name + '\' has been updated in background. Do you want to reload changes?', 'Reload', 'Keep', function () {
          $ctrl.base = $ctrl.source = null;
          $ctrl.peek();
        });
      }
    }
  });

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (!ignoreChange && $ctrl.isModified()) {
      event.preventDefault();
      alertIfDirty(function () {
        $ctrl.base = $ctrl.source = null;
        $state.go(toState, toParams);
      });
    }
  });

  $scope.$on('$vamp:connection', function (event, connection) {
    if (connection === 'opened') {
      $ctrl.peek();
    }
  });

  this.validate = function () {
    artifact.validate(path, $ctrl.source, validation);
  };

  this.isModified = function () {
    return !($ctrl.base === null || $ctrl.base === $ctrl.source);
  };

  this.fullErrorMessage = function () {
    snippet.show('Error message', artifact.transformErrorMessage($ctrl.errorMessage), 'lg');
  };

  this.cancel = function () {
    alertIfDirty($ctrl.stopEdit);
  };

  function alertIfDirty(callback) {
    if ($ctrl.isModified()) {
      alert.show('Warning', '\'' + $ctrl.name + '\' has been changed. If you proceed, all changes will be lost.', 'Proceed', 'Cancel', callback);
    } else {
      callback();
    }
  }

  this.save = function () {
    validation = false;
    ignoreChange = true;

    var finalBlueprint = prepareBlueprint($ctrl.blueprint);
    var yaml = json2yaml(finalBlueprint);

    $vamp.httpPut(path, yaml, {}, 'JSON')
    .then(function (resp) {
      $ctrl.base = yaml;
      goBack();
      toastr.success('\'' + $ctrl.name + '\' has been successfully saved.');
    }).catch(function (response) {
      validation = true;
      ignoreChange = false;
      if (response) {
        toastr.error(response.data.message, 'Save of \'' + $ctrl.name + '\'failed.');
      } else {
        toastr.error('Server timeout.', 'Save of \'' + $ctrl.name + '\'failed.');
      }
    });
  };

  function goBack() {
    validation = false;
    ignoreChange = true;

    $ctrl.stopEdit();
  }

  init();

  $ctrl.addPort = function () {
    var newPort = {
      name: '',
      port: '',
      protocol: ""
    };
    $ctrl.blueprint.breed.ports.push(newPort);
  };
  $ctrl.addVar = function () {
    var newVar = {
      name: '',
      value: ''
    };
    $ctrl.blueprint.breed.variables.push(newVar);
  };
  $ctrl.addParams = function () {
    var newParam = {
      key: '',
      value: ''
    };
    $ctrl.blueprint.dialects.params.push(newParam);
  };

  function prepareBlueprint(blueprint) {
    var finalBlueprint = {
      name: blueprint.name,
      gateways: {},
      clusters: {}
    };
    finalBlueprint.clusters[blueprint.name] = {
      services: [
        {
          breed: {
            name: blueprint.name,
            deployable: {
              definition: blueprint.breed.deployable
            },
            ports: {},
            environment_variables: {}
          },
          scale: {
            cpu: blueprint.scale.cpu,
            memory: blueprint.scale.memory,
            instances: blueprint.scale.instances
          },
          dialects: {
            marathon: {
              container: {
                docker: {
                  forcePullImage: blueprint.dialects.forceimage,
                  parameters: prepareParams(blueprint.dialects.params)
                }
              }
            }
          }
        }
      ]
    };

    blueprint.breed.ports.forEach(function (port) {
      finalBlueprint.clusters[blueprint.name].services[0].breed.ports[port.name] = port.port + '/' + port.protocol;
    });

    blueprint.breed.variables.forEach(function (variable) {
      finalBlueprint.clusters[blueprint.name].services[0].breed.environment_variables[variable.key] = variable.value;
    });

    function prepareParams(params) {
      if (params.length === 1) {
        if (params[0].key === "" || params[0].value === "") {
          return [];
        }
      }
      return params;
    }

    finalBlueprint.gateways[blueprint.gateways.port] = blueprint.name + '/' + blueprint.gateways.name;
    return finalBlueprint;
  }

});
