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
}('Brique', function() {
  /**
   * @constructor
   *
   * The `Brique` base class.
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
      this.initialize.call(this, options, el.innerHTML);
      this._insertContent();
    }
  }

  Brique.prototype = {
    /**
     * Called when Brique is instantiated. By default, it does nothing.
     */
    initialize: function() {},

    /**
     * Returns the inner HTML of the Brique. By default, it returns an empty
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

      var nodes = [];
      for (var i = 0, l = Brique._strategies.length; i < l; i++) {
        var kinds = Brique.getKinds();
        nodes = nodes.concat(Brique._strategies[i].parse(kinds, this.el));
      }

      for (var j = 0, m = nodes.length; j < m; j += 1) {
        var el = nodes[j][0];
        var options = nodes[j][1];

        var Constructor = Brique.registry[options.kind];
        if (Constructor === undefined) {
          throw new Error('Brique "' + options.kind + '" does not exist.');
        }
        var brique = new Constructor(el, options);

        brique.parent = this;
        this.children.push(brique);
      }
    }
  };

  /**
   * A registry of briques.
   *
   * @property registry
   * @type Object
   * @default {}
   */
  Brique.registry = {};

  /**
   * Returns an array brique kinds.
   *
   * @return {Array} kinds
   */
  Brique.getKinds = function() {
    if (Object.keys) {
      return Object.keys(Brique.registry);
    } else {
      var kinds = [];
      for (var kind in brique.registry) {
        if (brique.registry.hasownproperty(kind)) { kinds.push(kind); }
      }
      return kinds;
    }
  };

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
      if (!object.hasOwnProperty(prop)) { continue; }
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
   * @private
   *
   * An array of parsing strategies.
   *
   * @property registry
   * @type Object
   * @default {}
   */
  Brique._strategies = [];

  /**
   * Use a given strategy. A strategy must have a `parse` method.
   */
  Brique.use = function(strategy) {
    if (toString.call(strategy.parse) === '[object Function]') {
      throw new Error('Strategies must have a "parse" method');
    } else {
      Brique._strategies.push(strategy);
    }
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

  return Brique;
}));
