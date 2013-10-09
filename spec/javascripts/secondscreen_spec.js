var table_data = getJSONFixture('table.json')


describe("Updating the UI with JSON data", function() {
  it("should populate the table with team data", function() {
    
    expect($("#pltable tr").length).toBe(0);
  
    tableCallback(table_data)
    
    expect($("#pltable tr").length).toBe(1);
    expect($("#pltable tr:first td:first").text()).toBe('Arsenal');
  });
});

