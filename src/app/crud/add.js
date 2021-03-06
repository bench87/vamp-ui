angular.module('vamp-ui').controller('addController',

  function ($scope, $state, $stateParams, $timeout, $element, $vamp, artifact, toastr, alert) {
    var $ctrl = this;

    $ctrl.kind = $scope.$resolve.model;
    // naive singularization
    $ctrl.singular = $stateParams.kind.substring(0, $stateParams.kind.length - 1);
    $ctrl.title = 'New ' + $ctrl.singular;

    var path = '/' + $ctrl.kind;

    $ctrl.errorClass = '';
    $ctrl.errorMessage = '';
    $ctrl.restOfMessage = '';
    $ctrl.expandError = false;
    $ctrl.editor = artifact.editor;

    $ctrl.source = $stateParams.importData || null;

    $ctrl.valid = true;
    $ctrl.inEdit = true;
    var validation = true;
    var ignoreChange = false;

    function init() {
      if ($ctrl.source) {
        $ctrl.validate();
      }
      $timeout(function () {
        $($element).find('#editor textarea').focus();
      });
    }

    function transformErrorMessage(message) {
      $ctrl.errorMessage = message;

      var newLineIndex = message.indexOf('\n');
      if (newLineIndex !== -1) {
        $ctrl.errorMessage = message.substring(0, newLineIndex);
        $ctrl.restOfMessage = message.substring(newLineIndex + 1);
        $ctrl.expandError = false;
      }
    }

    $scope.$on('$stateChangeStart', function (event, toState, toParams) {
      if (!ignoreChange && $ctrl.isModified()) {
        event.preventDefault();
        alert.show('Warning', 'If you proceed, all changes will be lost.', 'Proceed', 'Cancel', function () {
          $ctrl.base = $ctrl.source = null;
          $state.go(toState, toParams);
        });
      }
    });

    this.validate = function () {
      if (validation) {
        artifact.validate(path, $ctrl.source,
          function () {
            $ctrl.valid = true;
            $ctrl.errorClass = '';
            $ctrl.errorMessage = '';
            $ctrl.restOfMessage = '';
            $ctrl.expandError = false;
          },
          function (response) {
            $ctrl.valid = false;
            $ctrl.errorClass = 'error';
            transformErrorMessage(response.data.message);
            $ctrl.expandError = false;
          });
      }
    };

    this.isModified = function () {
      return $ctrl.source !== null && $ctrl.source !== '';
    };

    this.cancel = function () {
      if ($ctrl.isModified()) {
        alert.show('Warning', 'If you proceed, all changes will be lost.', 'Proceed', 'Cancel', goBack);
      } else {
        goBack();
      }
    };

    this.save = function () {
      validation = false;
      ignoreChange = true;

      $vamp.post(path, $ctrl.source, {}, 'JSON')
        .then(function () {
          goBack();
          toastr.success('New ' + $ctrl.singular + ' has been successfully created.');
        })
        .catch(function (response) {
          validation = true;
          ignoreChange = false;
          if (response && response.data) {
            toastr.error(response.data.message, 'Creation failed.');
          } else {
            toastr.error('Server timeout.', 'Creation failed.');
          }
        });
    };

    this.isBlueprint = function () {
      return this.kind === 'blueprints';
    };

    function goBack() {
      validation = false;
      ignoreChange = true;
      $state.go('artifacts', {kind: $stateParams.kind});
    }

    init();
  });
