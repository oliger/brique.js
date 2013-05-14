# Brique.js

Customize your DOM elements with data-attributes.

## Basic Usage

```html
<body>
  <div data-brique-kind="hello" data-brique-name="Jimmy"></div>

  <srcipt>
    Brique.register('hello', {
      initialiaze: function(options) {
        this.name = options.name || 'stranger';
      },

      getInnerHTML: function() {
        return '<h1>Hello ' + this.name + '!</h1>'
      }
    });

    Brique.initialiaze();
  </srcipt>
</body>
```

This changes the content of our `hello` brique to:

```html
<div data-brique-kind="hello" data-brique-name="Jimmy">
  <h1>Hello Jimmy!</h1>
</div>
```
