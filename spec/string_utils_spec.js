describe('String utils', function() {
  describe('primitive()', function() {
    it('returns a "JSON.parsed" value of a string if possible', function() {
      primitive('{"foo": "bar"}').should.deep.equal({ foo: 'bar' });
    });

    it('returns the string if it is not "JSON.parsable"', function() {
      primitive('hey').should.equal('hey');
    });

    it('returns the argument if it is not a string', function() {
      var array = [1, 2, 3];
      primitive(array).should.equal(array);
    });
  });
});
