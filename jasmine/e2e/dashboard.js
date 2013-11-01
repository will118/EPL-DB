ptor = protractor.getInstance();

beforeEach(function() {
  ptor.get('http://0.0.0.0:3000');
});

describe('Toggle checks', function() {

  it('has the three buttons', function() {
    nav = ptor.findElement(protractor.By.id('epl_navbar_nav'));
    expect(nav.getText()).toContain('Overview', 'Match Mode', 'Settings');
  });  
    
  it('clicking settings enables toggle bar', function() {
    ptor.findElement(protractor.By.id('settingsToggle')).click();
    nav = ptor.findElement(protractor.By.id('epl_navbar_nav'));
    expect(nav.getText()).toContain('League Table');
  });

      it('verifies toggles disable opponent form', function() {
        ptor.findElement(protractor.By.id('settingsToggle')).click();
        expect(ptor.isElementPresent(protractor.By.id('other-form-column'))).toBe(true)
        ptor.findElement(protractor.By.id('opformtog')).click();
        expect(ptor.isElementPresent(protractor.By.id('other-form-column'))).toBe(false)
      });
});

describe('Tables are populated', function() {

  it('premier league from remote api', function() {
    nav = ptor.findElement(protractor.By.id('dash-table-div'));
    text = nav.getText();
    expect(text).toContain('Arsenal', 'Chelsea', 'West Bromwich Albion', 'West Ham United', 'Norwich City');
  }, 10000);  
    
  it('premier league disabled on toggle bar', function() {
    ptor.findElement(protractor.By.id('settingsToggle')).click();
    ptor.findElement(protractor.By.id('leaguetog')).click();
    table = ptor.isElementPresent(protractor.By.id('dash-table-div'));
    expect(table).toBe(false);
  });
});

describe('Complete default element check', function() {

  it('verifies livescores', function() {
    livescores = ptor.findElement(protractor.By.className('livescores'));
    expect(livescores.getText()).toContain("Arsenal", "Fulham");
  });

  it('verifies top scorers', function() {
    scorers = ptor.findElement(protractor.By.id('scorers'));
    expect(scorers.getText()).toContain("Aaron Ramsey");
  });

  it('verifies next fixtures', function() {
    fixes = ptor.findElement(protractor.By.id('fixturestable'));
    expect(fixes.getText()).toContain("Arsenal");
  });
});

describe('Checks default colouring', function() {

  it('Arsenal navbar colour', function() {
    nav = ptor.findElement(protractor.By.id('topnavbarcol'));
    expect(nav.getCssValue('background-color')).toEqual("rgba(232, 0, 11, 1)");
  });

  it('team highlighted in the prem table', function() {
    tabrow = ptor.findElement(protractor.By.xpath("//span[2]/div/table//*[contains(text(),'Arsenal')]"));
    expect(tabrow.getCssValue('background-color')).toEqual("rgba(223, 240, 216, 1)");
  }, 10000);
});

describe('Routing', function() {

  it('can navigate to match mode', function() {    
    ptor.findElement(protractor.By.id('matchmode')).click();
    url = ptor.getCurrentUrl()
    expect(url).toContain("match");
  });

});