describe("Updating the UI with JSON data", function() {
  it("should populate the table with team data", function() {
    loadFixtures('secondscreen.html')

    expect($("#pltable tr").length).toBe(1);
  
		var table_data = getJSONFixture('table.json')

		    tableCallback(table_data);
    
    expect($("#pltable tr").length).toBe(12);
    expect($("#pltable td:first").text()).toBe('Arsenal');
  });

  it("should populate upcoming fixtures", function() {
    loadFixtures('secondscreen.html')

    expect($("#venue1").text()).toBe('');
  
		var fixture_data = getJSONFixture('fixtures.json')

		    fixturesCallback(fixture_data);
    
    expect($("#venue1").text()).toBe('Crystal Palace vs. Arsenal2013-10-26 12:45:00');
  });

  it("should populate recent form data", function() {
    loadFixtures('secondscreen.html')

    expect($("#hometeamform").text()).toBe('');
  
		var form_data = getJSONFixture('form.json')

		    formCallback(form_data);
    
    expect($("#hometeamform").text()).toBe('Arsenal W, W, W, W, W, D');
    expect($("#awayteamform").text()).toBe('Norwich L, W, L, L, W, L');
    
  });

  it("should display a slideshow of messages", function() {
    loadFixtures('secondscreen.html')

    expect($("#update").text()).toBe('');
	  expect($("#update").text().length).toBeLessThan(1);

		var prematch_data = getJSONFixture('prematch.json')

		    prematchCallback(prematch_data);
    
    expect($("#update").text().length).toBeGreaterThan(10);

    
  });
});


