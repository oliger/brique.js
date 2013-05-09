# Brique

First, register your `Brique`.

```
Brique.register('hello', {
  initialiaze: function(options) {
    this.name = options.name || 'stranger';
  },

  content: function() {
    return '<h1>Hello ' + this.name + '</h1>.'
  }
});

Brique.initialiaze();
```

Then, profit.

```
<body>
  <div data-brique-kind="hello" data-brique-name="Jimmy"></div>
</body>
```
