/* global YAML*/
function updateBreedController(Api, $state, toastr, $stateParams, $mixpanel) {
  var self = this;
  self.data = {};
  self.updatingBreed = false;
  self.breedId = $stateParams.id;
  self.update = update;

  self.canBeParsed = true;

  Api.read('breeds', self.breedId).then(breedLoaded);

  $mixpanel.track('Update Breeds button clicked');


  function update(breedData) {
    self.updatingBreed = true;

    Api.update('breeds', self.breedId, breedData).then(breedUpdated, breedNotUpdated);
  }

  function breedLoaded(response) {
    var data = response.data;
    self.sourceCode = YAML.stringify(data, 6);
  }

  function breedUpdated() {
    self.updatingBreed = false;
    toastr.success(self.breedId, 'Updated Breed');
    $mixpanel.track('Breed updated');

    $state.go('readAllBreeds');
  }

  function breedNotUpdated(error) {
    toastr.error(error, 'Could not update Breed');
    self.updatingBreed = false;
  }
}

angular
  .module('app')
  .component('updateBreed', {
    templateUrl: 'app/updateBreed/updateBreed.html',
    controller: updateBreedController
  });

