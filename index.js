/* jshint node: true */
'use strict';

var funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-datepicker',
  
  included: function(app) {
    this._super.included(app);
    
    var settings = app.project.config()['ember-datepicker'];
    
    if(!settings) {
      settings = {
        theme: 'flick'
      };
    }
    
    if(!settings.theme) {
      settings.theme = 'flick';
    }
    
    // Import the javascript.
    app.import(app.bowerDirectory + '/jquery-ui/jquery-ui.js');
    app.import(app.bowerDirectory + '/moment/moment.js');
    
    app.import(app.bowerDirectory + '/jquery-ui/themes/' + settings.theme + '/jquery-ui.css');
    app.import(app.bowerDirectory + '/jquery-ui/themes/' + settings.theme + '/theme.css');
  },
  
  treeForPublic: function(treeName) {
    var tree;
    
    var settings = this.app.project.config()['ember-datepicker'];
    
    if(!settings) {
      settings = {
        theme: 'flick'
      };
    }
    
    if(!settings.theme) {
      settings.theme = 'flick';
    }

    tree = funnel(this.app.bowerDirectory + '/jquery-ui/themes/' + settings.theme + '/images', {
      include: ['*.png'],
      destDir: '/assets/images'
    });

    return tree;
  } 
};
