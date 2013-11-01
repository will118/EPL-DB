exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  
  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
};