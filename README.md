# Brique.js

Pimp your DOM nodes. This is a POC.

## API

### Class methods

`.register(name, description)` - register a brique.

`.initialize(rootElement)` - Instanciate briques, by default `rootElement` is
`document`.

`.use(strategy)` - Use a given strategy. A strategy must have a `parse` method.

### Instance methods

`#initialize` - Method that is called when the brique is initialized. By
default, it does nothing.

`#getInnerHTML` - Returns inner HTML of the Brique. By default, it returns an
empty string.

By default a brique does nothig. Override `#initialize` and `#getInnerHTML` to
pimp your DOM element.

## Usage

```html
<hello name="Tag"></hello>
<div data-brique-kind="hello" data-brique-name="Data"></div>

<script src="/lib/brique.js"></script>
<script src="/lib/strategy/data_strategy.js"></script>

<script>
  // Custom strategy to parse tag
  function TagStrategy() {}

  TagStrategy.prototype = {
    parse: function(kinds, parentElement) {
      var nodes = [];

      var elements = parentElement.querySelectorAll(kinds.join(','));
      for (var i = 0, l = elements.length; i < l; i += 1) {
        var el = elements[i];
        var options = { kind: el.tagName.toLowerCase() };
        for (var j = 0, m = el.attributes.length; j < m; j++) {
          var a = el.attributes[j];
          options[a.name] = a.value;
        }

        nodes.push([el, options]);
      }

      return nodes;
    }
  };

  Brique.register('hello', {
    initialize: function(options) {
      this.name = options.name || 'stranger';
    },

    getInnerHTML: function() {
      return '<h1>Hello ' + this.name + '!</h1>';
    }
  });

  Brique.use(new TagStrategy());
  Brique.use(new DataStrategy());

  Brique.initialize();
</script>
```

This renders:

```
<hello name="Tag">
  <h1>Hello Tag!</h1>
</hello>

<div data-brique-kind="hello" data-brique-name="Data">
  <h1>Hello Data!</h1>
</div>
```
