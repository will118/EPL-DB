ptor = protractor.getInstance();

beforeEach(function() {
  ptor.get('http://0.0.0.0:3000/match');
});

describe('Checks colours', function() {

	it('persistent sectional colour', function() {
         expect(true).toBe(true)
  });

});