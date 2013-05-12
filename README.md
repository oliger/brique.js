# Brique.js

Think to a `Brique` as a custom DOM element.

## Basic Usage

```html
<body>
  <div data-brique-kind="hello" data-brique-name="Jimmy"></div>

  <srcipt>
    Brique.register('hello', {
      initialiaze: function(options) {
        this.name = options.name || 'stranger';
      },

      content: function() {
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
