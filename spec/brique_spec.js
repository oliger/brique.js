describe('Brique', function() {
  describe('instantiation', function() {
    var el;
    var options;
    var Test;
    var brique;

    before(function() {
      el = document.createElement('div');
      options = { foo: 'bar' };

      Brique.register('hello', {
        initialize: sinon.spy(),
        content: function() { return 'hello ' + this.options.name; }
      });

      Test = Brique.extend({
        initialize: sinon.spy(),
        content: function() {
          return '<div data-brique-kind="hello" data-brique-name="Jimmy"></div>';
        }
      });

      brique = new Test(el, options);
    });

    after(function() {
      Brique.registery = {};
    });

    it('sets the element', function() {
      brique.el.should.equal(el);
    });

    it('sets the options', function() {
      brique.options.should.equal(options);
    });

    it('calls the "initialize" method with options', function() {
      brique.initialize.should.have.been.calledWith(options);
    });

    it('does not call the "initialize" method when element is "document"', function() {
      var Venus = Brique.extend({ initialize: sinon.spy() });
      (new Venus(document)).initialize.should.not.have.been.called;
    });

    it('sets the content', function() {
      brique.el.innerHTML.should.equal('<div data-brique-kind="hello" data-brique-name="Jimmy">hello Jimmy</div>');
    });

    it('initializes childs', function() {
      brique.childs[0].initialize.should.have.been.calledOnce;
      brique.childs[0].should.be.instanceOf(Brique.registery['hello']);
    });

    it('sets the child parent', function() {
      brique.childs[0].parent.should.equal(brique);
    });

    it('sets the child options', function() {
      brique.childs[0].options.should.deep.equal({ kind: 'hello', name: 'Jimmy' });
    });

    it('adds childs in the "childs" array', function() {
      brique.childs.should.have.length(1);
    });
  });

  describe('.extend', function() {
    var Foo;
    var Bar;

    before(function() {
      Foo = Brique.extend({
        prop: 'foo'
      });

      Bar = Foo.extend({
        prop: 'bar'
      });
    });

    it('returns a Brique subclass', function() {
      (new Bar(document.createElement('div'))).should.be.instanceOf(Brique);
    });

    it('overrides parent properties', function() {
      (new Bar(document.createElement('div'))).prop.should.equal('bar');
    });
  });

  describe('.register', function() {
    var object;
    var stubExtend;

    before(function() {
      object = { foo: 'bar' };
      stubExtend = sinon.stub(Brique, 'extend').returns('brique');
      Brique.register('test', object);
    });

    after(function() {
      Brique.extend.restore();
      Brique.registery = {};
    });

    it('calls the ".extend" method with the passed object', function() {
      stubExtend.should.have.been.calledWith(object);
    });

    it('adds the registered brique to the "registery" array', function() {
      Brique.registery['test'].should.equal('brique');
    });
  });

  describe('.initialize', function() {
    it('returns a new brique', function() {
      Brique.initialize().should.be.instanceOf(Brique);
    });

    it('uses the passed document as root element', function() {
      var el = document.createElement('div');
      Brique.initialize(el).el.should.equal(el);
    });

    it('uses document as root element when no element is passed', function() {
      Brique.initialize().el.should.equal(document);
    });
  });
});
