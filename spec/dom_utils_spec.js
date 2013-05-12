function createElement(string) {
  var root = document.createElement('div');
  root.innerHTML = string;
  return root.firstChild;
}

describe('DOM utils', function() {
  describe('data()', function() {
    it('returns element data as an object', function() {
      var el = createElement('<div data-foo="bar"></div>');
      data(el).should.deep.equal({ foo: 'bar' });
    });

    it('removes namespace from data keys', function() {
      var el = createElement('<div data-foo-bar="baz"></div>');
      data(el, 'foo').should.deep.equal({ bar: 'baz' });
    });
  });
});
