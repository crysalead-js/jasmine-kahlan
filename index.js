if (typeof jasmine === 'undefined') {
  throw new Error("The `jasmine` global function is undefined, jasmine need to be included first.")
}

if (typeof context === 'undefined') {
  context = describe;
  fcontext = fdescribe;
  xcontext = xdescribe;
}

beforeEach(function() {
  jasmine.addMatchers(require('./src/kahlan'));
});
