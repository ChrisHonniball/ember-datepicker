module.exports = {
  description: '',
  
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;
    
    return that.addBowerPackagesToProject([
      { name: 'jquery-ui', target: '1.11.3' },
      { name: 'moment' }
    ]);
  }
};
