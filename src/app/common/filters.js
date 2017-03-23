angular.module('vamp-ui')
  .filter('encodeName', function () {
    return function (input) {
      return input ? input.replace(/\//g, '~2F') : '';
    };
  })
  .filter('decodeName', function () {
    return function (input) {
      return input ? input.replace(/~2F/g, '/') : '';
    };
  })
  .filter('isEmpty', function () {
    return function (obj) {
      return _.isEmpty(obj);
    };
  })
  .filter('countKeys', function () {
    return function (object) {
      return object ? _.size(object) : 0;
    };
  })
  .filter('orderByKeys', function () {
    return function (items) {
      var keys = _.map(items, function (v, n) {
        return n;
      }).sort();
      var result = {};
      _.forEach(keys, function (key) {
        result[key] = items[key];
      });
      return result;
    };
  })
  .filter('namify', function () {
    return function (object) {
      return _.map(object, function (value, key) {
        if (typeof value !== 'object') {
          value = {
            value: value,
            name: key
          };
        } else if (!value.name) {
          value.name = key;
        }
        return value;
      });
    };
  })
  .filter('trustUrl', ['$sce', function ($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  }])
  .filter('asNumber', function () {
    // because $filter('number') is strict, e.g. '64MB' is not a number.
    return function (input, fraction) {
      return parseFloat(input || '').toFixed(fraction === null || fraction === undefined ? 2 : fraction);
    };
  })
  .filter('capitalize', function () {
    return function (input) {
      return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  });
