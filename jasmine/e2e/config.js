exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  
  capabilities: {
    'browserName': 'chrome'
  },

  // specs: ['*.js'],
  specs: ['matchmode.js'],

  jasmineNodeOpts: {
    showColors: true, 
  }
};