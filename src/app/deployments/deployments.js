angular.module('app')
  .controller('DeploymentsController', DeploymentsController)
  .factory('$vampDeployment', ['$filter', function ($filter) {
    return new DeploymentService($filter);
  }]);

/** @ngInject */
function DeploymentsController($scope, $uibModal, $location, toastr, $vamp, $vampDeployment, $controller) {
  var $ctrl = this;
  $controller('BaseArtifactsController', {$ctrl: $ctrl, $scope: $scope});

  $ctrl.getScale = function (deployment) {
    return $vampDeployment.scale(deployment);
  };
  $ctrl.getStatus = function (deployment) {
    return $vampDeployment.deploymentStatus(deployment);
  };

  $ctrl.exportDeployment = function (deploymentToExport, $event) {
    $event.stopPropagation();

    $uibModal.open({
      animation: true,
      backdrop: 'static',
      controller: function ($scope, $uibModalInstance, deployment) {
        $scope.deployment = deployment;
        $scope.name = angular.copy(deployment.name);
        $scope.ok = function () {
          $uibModalInstance.close({name: $scope.name, overwrite: $scope.overwrite});
        };
        $scope.cancel = $uibModalInstance.dismiss;
      },
      templateUrl: 'app/deployments/exportDeployment.html',
      resolve: {
        deployment: function () {
          return deploymentToExport;
        }
      }
    }).result.then(function (data) {
      function save(blueprint) {
        return $vamp.await(function () {
          $vamp.put('/blueprints/' + data.name, JSON.stringify(blueprint));
        }).then(function () {
          $location.path('blueprints/view/' + data.name);
          toastr.success('\'' + blueprint.name + '\' has been successfully exported as \'' + data.name + '\'.');
        }).catch(function (response) {
          if (response) {
            toastr.error(response.data.message, 'Export of \'' + deploymentToExport.name + '\' failed.');
          } else {
            toastr.error('Server timeout.', 'Export of \'' + deploymentToExport.name + '\' failed.');
          }
        });
      }

      $vamp.await(function () {
        $vamp.peek('/deployments/' + deploymentToExport.name, '', {as_blueprint: true});
      }).then(function (blueprint) {
        blueprint.data.name = data.name;
        if (data.overwrite) {
          save(blueprint.data);
        } else {
          $vamp.await(function () {
            $vamp.peek('/blueprints/' + data.name);
          }).then(function () {
            toastr.error('Blueprint \'' + data.name + '\' already exists.');
          }).catch(function (response) {
            if (response) {
              save(blueprint.data);
            } else {
              toastr.error('Server timeout.', 'Export of \'' + deploymentToExport.name + '\' failed.');
            }
          });
        }
      });
    });
  };

  $ctrl.onDataResponse = function () {
    angular.forEach($ctrl.artifacts, function (ar) {
      ar.scale = $ctrl.getScale(ar);
      ar.status = $ctrl.getStatus(ar);
    });
  };

  $ctrl.onStreamEvent = function (response) {
    if (_.includes(response.data.tags, 'synchronization')) {
      $ctrl.peek();
    }
  };
}

/** @ngInject */
function DeploymentService($filter) {
  var $this = this;
  var scales = {};

  this.scale = function (deployment) {
    var cpu = 0;
    var memory = 0;
    var instances = 0;
    _.forEach(deployment.clusters, function (cluster) {
      _.forEach(cluster.services, function (service) {
        var scale = service.scale;
        instances += scale.instances;
        cpu += scale.instances * scale.cpu;
        memory += scale.instances * parseInt(scale.memory, 10);
      });
    });
    return {
      cpu: Number($filter('asNumber')(cpu, 2)),
      memory: Number($filter('asNumber')(memory, 2)),
      instances: instances
    };
  };

  this.peekScales = function (deployment) {
    return scales[deployment.name];
  };

  this.deploymentStatus = function (deployment) {
    var services = this.services(deployment);

    var deploying = false;
    var undeploying = true;

    for (var i = 0; i < services.length; i++) {
      var status = $this.serviceStatus(services[i]);
      if (status === 'failed') {
        return status;
      }
      deploying |= (status === 'updating' || status === 'deploying');
      undeploying &= status === 'undeploying';
    }

    if (undeploying) {
      return 'undeploying';
    }

    return deploying ? 'deploying' : 'deployed';
  };

  this.services = function (deployment) {
    return _.flatMap(deployment.clusters, function (cluster) {
      return cluster.services;
    });
  };

  this.serviceStatus = function (service) {
    var phase = service.status.phase.name.toLowerCase();
    if (phase === 'failed') {
      return 'failed';
    } else if (phase === 'initiated' || phase === 'updating') {
      return service.status.intention.toLowerCase() === 'deployment' ? 'updating' : 'undeploying';
    }
    return 'deployed';
  };
}
