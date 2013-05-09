/**
 * @constructor
 *
 * @param {Element} el
 * @param {Object} options
 */
function Brique(el, options) {
  this.el = el;
  this.options = options || {};

  this.parent = null;

  if (el === document) {
    this._findAndInitializeChilds();
  } else {
    this.initialize.call(this, options);
    this._insertContent();
  }
}

Brique.prototype = {
  /**
   * Called when Brique is instantiated. By default, it does nothing.
   */
  initialize: function() {},

  /**
   * Returns the The HTML content of the Brique. By default, it returns an
   * empty string.
   */
  content: function() { return ''; },

  /**
   * @private
   */
  _insertContent: function() {
    this.el.innerHTML = this.content();
    this._findAndInitializeChilds();
  },

  /**
   * @private
   */
  _findAndInitializeChilds: function() {
    this.childs = [];

    for (var i = 0, l = Brique.namespaces.length; i < l; i += 1) {
      var namespace = Brique.namespaces[i];
      var childs = this.el.querySelectorAll('[data-' + namespace + '-kind]');

      for (var j = 0, m = childs.length; j < m; j += 1) {
        var el = childs[j];
        var options = getElementOptions(el, namespace);
        var Constructor = Brique.registery[options.kind];
        var brique = new Constructor(el, options);

        brique.parent = this;
        this.childs.push(brique);
      }
    }
  }
};

/**
 * @property namespaces
 * @type Array
 * @default ['brique']
 */
Brique.namespaces = ['brique'];

/**
 * @property registery
 * @type Object
 * @default {}
 */
Brique.registery = {};

/**
 * @param {Object} object
 * @return {Brique} brique
 */
Brique.extend = function extend(object) {
  var constructor = this;

  function Klass() {
    constructor.apply(this, arguments);
  }
  Klass.prototype = Object.create(this.prototype);

  for (var prop in object) {
    Klass.prototype[prop] = object[prop];
  }

  Klass.extend = extend;

  return Klass;
};

/**
 * @param {String} kind
 * @param {Object} object
 */
Brique.register = function(kind, object) {
  Brique.registery[kind] = Brique.extend(object);
};

/**
 * @param {Element} el the root element from where to start to search briques.
 *   If no element is passed, `document` is used.
 */
Brique.initialize = function(el) {
  return new Brique(el || document);
};

/**
 * @private
 *
 * @param {Element} el
 * @param {String} namespace
 * @return {Object} the brique options
 */
function getElementOptions(el, namespace) {
  var options = {};
  var data = el.dataset;

  for (var o in data) {
    var key = o.replace(new RegExp('^' + namespace), '');
    key = key.charAt(0).toLowerCase() + key.slice(1);

    var value;
    try {
      value =
        data[o] === 'true' ? true :
        data[o] === 'false' ? false :
        data[o] === 'null' ? null :
        +data[o] + '' === data[o] ? +data[o] :
        /(?:\{[\s\S]*\}|\[[\s\S]*\])$/.test(data[o]) ? JSON.parse(data[o]) :
        data[o];
    } catch(e) {}

    options[key] = value;
  }

  return options;
}

export Brique;
