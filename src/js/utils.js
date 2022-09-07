/* global Handlebars, dataSource */

const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function (htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};
utils.convertDataSourceToDbJson = function () {
  const songJson = [];
  for (let key in dataSource.songs) {
    songJson.push(Object.assign({ id: key }, dataSource.songs[key]));
  }

  console.log(JSON.stringify({ song: songJson }, null, '  '));
};
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('joinValues', function (input, options) {
  return Object.values(input).join(options.fn(this));
});

export default utils;
