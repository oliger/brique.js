import primitive from 'brique/string_utils';

function data(el, namespace) {
  var options = {};
  var set = el.dataset;

  for (var key in set) {
    if (!set.hasOwnProperty(key)) { continue; }

    var k = key;
    if (namespace != null) {
      k = k.replace(new RegExp('^' + namespace), '');
      k = k.charAt(0).toLowerCase() + k.slice(1);
    }
    options[k] = primitive(set[key]);
  }

  return options;
}

export data;
