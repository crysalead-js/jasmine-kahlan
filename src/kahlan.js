function AnyError() {
  var temp = Error.apply(this, arguments);
  this.message = temp.message;
}
AnyError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: AnyError,
    writable: true,
    configurable: true
  }
});

function toBeA(util) {
  return {
    compare: function(actual, expected) {
      if (expected === 'bool') {
        expected = 'boolean';
      }
      if (expected === 'int') {
        expected = 'integer';
      }
      if (expected === 'float') {
        expected = 'double';
      }

      function getType(value) {
        if (typeof value === 'object') {
          if (value === null) {
            return 'null';
          }
          if (Array.isArray(value)) {
            return 'array';
          }
          return 'object';
        }
        if (typeof value === 'string') {
          return 'string';
        }
        if (typeof value === 'boolean') {
          return 'boolean';
        }
        if (typeof value === 'number') {
          return value % 1 === 0 ? 'integer' : 'double';
        }
      }

      return {
        pass: getType(actual) === expected
      };
    }
  }
}

function toBeAnInstanceOf(util) {
  return {
    compare: function(actual, expected) {
      return {
        pass: actual instanceof expected
      };
    }
  }
}

function toContainKey(util) {
  return {
    compare: function (actual, expected) {
      var pass = true;

      var keys = {};
      var key;

      for (key in actual) {
        keys[key] = actual[key];
      }

      if (arguments.length > 2) {
        expected = Array.prototype.slice.call(arguments);
        expected.shift();
      }

      for (var i = 0, length = expected.length; i < length; ++i) {
        key = expected[i];
        if (keys[key] === undefined) {
          pass = false;
          break;
        }
      }

      return {
        pass: pass
      };
    }
  }
}

function toHaveLength(util) {
  return {
    compare: function(actual, expected) {
      if(!actual.hasOwnProperty || !actual.hasOwnProperty('length')) {
        throw new Error('Actual must have length property');
      }
      return {
        pass: actual.length === expected
      };
    }
  }
}

function toMatch(util) {
  return {
    compare: function(actual, expected) {
      var pass = typeof expected === 'function' ? expected(actual) : actual.match(new RegExp(expected));
      return {
        pass: pass
      };
    }
  }
}

function toThrow(util) {
  return {
    compare: function(actual, expected) {
      var result = { pass: false }, original, thrown;

      if (typeof actual != 'function') {
        throw new Error('Actual is not a Function');
      }

      original = expected;

      if (expected === undefined || typeof expected === 'string' || expected instanceof RegExp) {
        expected = new AnyError(expected);
      }

      try {
        actual();
      } catch (err) {
        thrown = err;
      }

      if (!thrown) {
        result.message = 'Expected function to throw an exception.';
        return result;
      }

      var sameException;

      if (expected instanceof AnyError) {
        sameException = true;
      } else {
        if (expected.constructor === thrown.constructor) {
          sameException = expected.constructor.name === thrown.name;
        } else {
          sameException = thrown instanceof expected.constructor;
        }
      }

      var sameMessage = original instanceof RegExp ? original.test(thrown.message) : thrown.message === expected.message;

      if (sameException && (sameMessage || !expected.message)) {
        result.pass = true;
        result.message = function() { return 'Expected function not to throw ' + jasmine.pp(expected) + '.'; };
      } else {
        result.message = function() { return 'Expected function to throw ' + jasmine.pp(expected) + ', but it threw ' +  jasmine.pp(thrown) + '.'; };
      }

      return result;
    }
  };
}

module.exports = {
  toBeAnInstanceOf: toBeAnInstanceOf,
  toBeA: toBeA,
  toBeAn: toBeA,
  toContainKey: toContainKey,
  toContainKeys: toContainKey,
  toHaveLength: toHaveLength,
  toMatch: toMatch,
  toThrow: toThrow
};