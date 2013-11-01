ptor = protractor.getInstance();

beforeEach(function() {
  ptor.get('http://0.0.0.0:3000/match');
});

describe('Checks colours', function() {

	it('persistent table bg colour', function() {
		bg = ptor.findElement(protractor.By.className('table'))
  	expect(bg.getCssValue('background-color')).toEqual("rgba(101, 129, 108, 0.419608)")
  });

});

describe('Complete element check on team change', function() {
	
  it('verifies top scorers', function() {
	  ptor.findElement(protractor.By.input('team')).clear;
	  ptor.findElement(protractor.By.input('team')).sendKeys("Chelsea");
    expect(ptor.findElement(protractor.By.id('scorers')).getText()).toContain("Oscar");
  });

  // it('verifies next fixtures', function() {
  //   fixes = ptor.findElement(protractor.By.id('fixturestable'));
  //   expect(fixes.getText()).toContain("Arsenal");
  // });
});