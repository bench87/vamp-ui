/* global YAML*/
function updateBlueprintController(Api, $state, DataManager, $stateParams, $mixpanel) {
  var self = this;
  self.data = {};
  self.updatingBlueprint = false;
  self.blueprintId = $stateParams.id;
  self.update = update;

  self.canBeParsed = true;

  var blueprintsResource = DataManager.resource('blueprints');

  Api.read('blueprints', self.blueprintId).then(blueprintLoaded);

  $mixpanel.track('Update Blueprint button clicked');

  function update(blueprintData) {
    self.updatingBlueprint = true;
    blueprintsResource.update(self.blueprintId, blueprintData);
    $mixpanel.track('Blueprint updated');
    $state.go('readAllBlueprints');
  }

  function blueprintLoaded(response) {
    var data = response.data;
    self.sourceCode = YAML.stringify(data, 6);
  }
}

angular
  .module('app')
  .component('updateBlueprint', {
    templateUrl: 'app/updateBlueprint/updateBlueprint.html',
    controller: updateBlueprintController
  });

