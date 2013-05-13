import data from 'brique/dom_utils';

/**
 * @constructor
 *
 * The `Brique` base class. Think to a `Brique` as a custom DOM element.
 *
 * @param {Element} el
 * @param {Object} options
 */
function Brique(el, options) {
  this.el = el;
  this.options = options || {};

  this.parent = null;

  if (el === document) {
    this._findAndInitializeChildren();
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
   * Returns the The inner HTML of the Brique. By default, it returns an empty
   * string.
   */
  getInnerHTML: function() { return ''; },

  /**
   * @private
   *
   * Replace the content of `el` DOM element, then it calls
   * `_findAndInitializeChildren`.
   */
  _insertContent: function() {
    this.el.innerHTML = this.getInnerHTML();
    this._findAndInitializeChildren();
  },

  /**
   * @private
   *
   * Resets `children` array, then finds and initializes children briques and adds
   * them to the `children` array.
   */
  _findAndInitializeChildren: function() {
    this.children = [];

    for (var i = 0, l = Brique.namespaces.length; i < l; i += 1) {
      var namespace = Brique.namespaces[i];
      var children = this.el.querySelectorAll('[data-' + namespace + '-kind]');

      for (var j = 0, m = children.length; j < m; j += 1) {
        var el = children[j];
        var options = data(el, namespace);
        var Constructor = Brique.registry[options.kind];
        if (Constructor === undefined) {
          throw new Error('Brique "' + options.kind + '" does not exist.');
        }
        var brique = new Constructor(el, options);

        brique.parent = this;
        this.children.push(brique);
      }
    }
  }
};

/**
 * Array of namespaces. They allow us to find briques in the DOM.
 *
 * @property namespaces
 * @type Array
 * @default ['brique']
 */
Brique.namespaces = ['brique'];

/**
 * A registry of briques.
 *
 * @property registry
 * @type Object
 * @default {}
 */
Brique.registry = {};

/**
 * Creates a subclass of `Brique`.
 *
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
 * Creates a subclass of `Brique` and adds it to the `registry`.
 *
 * @param {String} kind
 * @param {Object} object
 */
Brique.register = function(kind, object) {
  Brique.registry[kind] = Brique.extend(object);
};

/**
 * Finds and initializes briques in a given element.
 *
 * @param {Element} el the root element from where to start to search briques.
 *   If no element is passed, `document` is used.
 */
Brique.initialize = function(el) {
  return new Brique(el || document);
};

export Brique;
