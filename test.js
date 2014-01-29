var memoize = require("./")('./data-memoize');
var fixtures = require("./fixtures");

it('memoizes given async function', function(done){
  var now = memoize(fixtures.now, '500ms');
  var ref = Date.now();

  now(2, function (error, first) {
    if (error) return done(error);

    expect(first).to.be.above(ref);

    setTimeout(function () {
      now(2, function (error, second) {
        if (error) return done(error);
        expect(first).to.equal(second);

        now(1, function (error, different) {
          expect(different).to.be.above(second);
        });

        now(3, function (error, different) {
          expect(different).to.be.above(second);
        });

        setTimeout(function () {
          now(2, function (error, third) {
            if (error) return done(error);
            expect(first).to.not.equal(third);
            expect(third).to.be.above(second);

            done();
          });
        }, 500);

      });
    }, 200);
  });
});

it('would work with functions with no parameters', function(done){
  var now = memoize(fixtures.nnow, '500ms');
  var ref = Date.now();

  now(function (error, first) {
    if (error) return done(error);

    expect(first).to.not.below(ref);

    setTimeout(function () {
      now(function (error, second) {
        expect(second).to.equal(first);

        setTimeout(function () {
          now(function (error, third) {
            expect(third).to.be.above(first);
            done();
          });
        }, 500);

      });
    }, 200);
  });
});
