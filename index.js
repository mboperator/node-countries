'use strict';

var _ = require('lodash');

var countries = require('./data/countries.json');

var toExport = {
  JSON: countries
};

/**
 * Find the country object of the given country name
 *
 * @param {String}  name              country name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} country           country object
 */
function getCountryByName(name, useAlias) {
  if (!_.isString(name)) return undefined;

  return _.find(countries, function (country) {
    if (useAlias) {
      return country.name.toUpperCase() === name.toUpperCase() || _.find(country.alias, function (alias) {
        return alias.toUpperCase() === name.toUpperCase();
      });
    }
    return country.name.toUpperCase() === name.toUpperCase();
  });
}

toExport.getCountryByName = getCountryByName;
toExport.findCountryByName = getCountryByName;

/**
 * Find the province object of the given province name
 *
 * @param {String}  name              english province name
 * @param {Boolean} [useAlias]        use alias flag, default `false`
 * @return {Object} province          province object
 */
function getProvinceByName(name, useAlias) {
  if (!_.isString(name) || !_.isArray(this.provinces)) return undefined;

  return _.find(this.provinces, function (province) {
    if (useAlias) {
      return province.name.toUpperCase() === name.toUpperCase() || _.find(province.alias, function (alias) {
        return alias.toUpperCase() === name.toUpperCase();
      });
    }
    return province.name.toUpperCase() === name.toUpperCase();
  });
}

/**
 * 
 * Add search function to each country and map each country by alpha2
 */
var listCountries = _.keyBy(_.cloneDeep(countries), 'alpha2');
_.forEach(listCountries, function (country, key) {
  country.getProvinceByName = _.bind(getProvinceByName, country);
  country.findProvinceByName = _.bind(getProvinceByName, country);
  toExport[key] = country;
});

module.exports = toExport;
