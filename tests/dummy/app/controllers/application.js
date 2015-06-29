import Ember from 'ember';

export default Ember.Controller.extend({
  dates: Ember.computed({
    get: function(){
      var that = this,
        markers = {};
      
      markers[moment().subtract(7, 'days').format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      markers[moment().subtract(10, 'days').format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      markers[moment().subtract(4, 'days').format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      markers[moment().subtract(15, 'days').format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      markers[moment().subtract(11, 'days').format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      markers[moment().format('YYYY-MM-DD')] = parseInt(Math.random() * (10 - 1) + 1);
      
      /* */
      console.log(
        "%c%s#dates markers: %O",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        that.toString(),
        markers
      );
      //*/
      
      return markers;
    }
  }),
  
  actions: {
    dateSelected: function() {
      var that = this;
      
      alert('You selected ' + that.get('example7'));
    }
  }
});
