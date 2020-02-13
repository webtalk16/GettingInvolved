QUnit.module('module test', {
  setUp: function () {
    
  },
  teardown: function () {

  }
});

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.module('module strictEqual');
QUnit.test( "strictEqual test", function( assert ) {
  assert.strictEqual( 1, 1, "1 and 1 have the same value and type" );
});

QUnit.module('module test change lang');

QUnit.test( "hello test lang", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  // assert.strictEquals($('body').length, 1);
  // QUnit.strictEquals($('#headerLang').length, 1);
  // QUnit.strictEquals($('#headerLang').text, 'Enlish');

  // function checkWho(then, expected) {
  //   assert.equal(testingFunctions(then), expected);
  //   assert.equal(testingFunctions(2), expected);
  // }
  // checkWho(1);
  // checkWho(2);
});

// function testingFunctions (num) {
//   retrun (num == 1 ? 'its me' : 'not me');
// }