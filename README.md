# Brique.js

Pimp your DOM nodes. This is a POC.

## API

### Class methods

`.register(name, description)` - register a brique.

`.initialize(rootElement)` - Instanciate briques, by default `rootElement` is
`document`.

### Instance methods

`#initialize` - Method that is called when the brique is initialized. By
default, it does nothing.

`#getInnerHTML` - Returns inner HTML of the Brique. By default, it returns an
empty string.

By default a brique does nothig. Override `#initialize` and `#getInnerHTML` to
pimp your DOM element.

## Usage

```html
<div data-brique-kind="hello" data-brique-name="Data"></div>

<script src="/lib/brique.js"></script>

<script>
  Brique.register('hello', {
    initialize: function(options) {
      this.name = options.name || 'stranger';
    },

    getInnerHTML: function() {
      return '<h1>Hello ' + this.name + '!</h1>';
    }
  });

  Brique.initialize();
</script>
```

This renders:

```
<div data-brique-kind="hello" data-brique-name="Data">
  <h1>Hello Data!</h1>
</div>
```
