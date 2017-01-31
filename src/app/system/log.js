angular.module('app').component('log', {
  templateUrl: 'app/system/templates/log.html',
  controller: LogController
});

function LogController($scope, $vamp, $element) {
  var $ctrl = this;

  $ctrl.logs = [];
  $ctrl.isLogOn = false;

  $ctrl.INFO = {
    name: 'INFO',
    active: true,
    priority: 1
  };
  $ctrl.ERROR = {
    name: 'ERROR',
    active: true,
    priority: 2
  };
  $ctrl.TRACE = {
    name: 'TRACE',
    active: false,
    priority: 3
  };
  $ctrl.selectedLevels = [
    $ctrl.INFO
  ];

  /* function currentMaxLevel() {
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

    var max = getMaxOfArray(_.map($ctrl.selectedLevels, 'priority'));
    return $ctrl.selectedLevels[_.findIndex($ctrl.selectedLevels, {'priority': max})];
  }*/

  $ctrl.toggleFollowOnOff = function () {
    $ctrl.scrollToBottom();
  };

  $ctrl.filterChange = function (level) {
    if (level.active) {
      $ctrl.selectedLevels.push(level);
    } else {
      var i = _.indexOf($ctrl.selectedLevels, level);
      $ctrl.selectedLevels.splice(i, 1);
    }

    // if ($ctrl.isLogOn && currentMaxLevel()) {
      // $ctrl.peek(currentMaxLevel().name);
    // }
  };

  $ctrl.scrollToBottom = function () {
    if ($ctrl.isLogOn) {
      var scrolledContainer = $($element).find('.panel-body');
      scrolledContainer.scrollTop(scrolledContainer.prop('scrollHeight'));
    }
  };

  $ctrl.containLevelsFilter = function (log) {
    return (_.findIndex($ctrl.selectedLevels, {name: log.level}) !== -1);
  };

  $scope.$on('$vamp:connection', function (event, connection) {
    if (connection === 'opened') {
      $ctrl.peek('TRACE');
    }
  });

  $scope.$on('/log', function (e, response) {
    if (response.content === 'JSON') {
      $ctrl.logs.push({
        timestamp: response.data.timestamp,
        level: response.data.level,
        logger: response.data.logger,
        message: response.data.message
      });
    }
  });

  $ctrl.peek = function (level) {
    $vamp.peek('/log', '', {logger: 'io.vamp', level: level});
  };

  $ctrl.peek('TRACE');
}