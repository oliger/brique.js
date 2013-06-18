/*!
 * Brique 0.1.0
 * https://github.com/oliger/brique.js
 *
 * Copyright (c) 2013 Jimmy Oliger
 * Distributed under the MIT license
 */

(function(name, definition) {
  if (typeof module != 'undefined') {
    module.exports = definition();
  } else if (typeof define == 'function' && typeof define.amd == 'object') {
    define(definition);
  } else {
    this[name] = definition();
  }
}('DataStrategy', function() {
  function DataStrategy(options) {
    options = options || {};
    this.namespaces = options.namespaces || ['brique'];
  }

  DataStrategy.prototype = {
    parse: function(kinds, parentElement) {
      var nodes = [];

      for (var i = 0, l = this.namespaces.length; i < l; i += 1) {
        var namespace = this.namespaces[i];

        var elements = parentElement.querySelectorAll('[data-' + namespace + '-kind]');
        for (var j = 0, m = elements.length; j < m; j += 1) {
          var el = elements[j];
          var options = data(el, namespace);

          nodes.push([el, options]);
        }
      }

      return nodes;
    }
  };

  function primitive(string) {
    if (toString.call(string) !== '[object String]') return string;

    var value;
    try {
      value = JSON.parse(string);
    } catch(e) {
      value = string;
    }

    return value;
  }

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

  return DataStrategy;
}));
