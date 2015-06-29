import Ember from 'ember';
import layout from '../templates/components/ember-datepicker';

export default Ember.Component.extend({
  layout: layout,
  
  attributeBindings: ["value", "disabled:disabled", "placeholder"],
  classNames: ["ember-datepicker"],
  classNameBindings: ['inline:ember-datepicker-inline:'],
  
  
  ////////////////
  //! Variables //
  ////////////////
  
  inline: true,
  action: null,
  value: null,
  dateMarkers: {},
  
  ///////////////
  //! Computed //
  ///////////////
  
  tagName: Ember.computed('tagName', {
    get: function(){
      return (this.get('inline')) ? "div" : "input";
    }
  }),
  
  /**
  * jQuery UI Datepicker Widget options
  * Reference: http://api.jqueryui.com/datepicker/
  */

  dateFormat: "yy-mm-dd",
  changeMonth: false,
  changeYear: false,
  
  dateWithEventsClass: 'date-with-events',
  dateNoEventsClass: 'date-no-events',

  minDate: null,
  maxDate: null,

  markerTooltipPrefix: "",
  markerTooltipSuffix: " events",
  daysWithoutEventsSelectable: true,
 
  updateTracker: Ember.observer('minDate', 'maxDate', 'value', 'disabled', 'changeYear', 'changeMonth',
    function(){
      var that = this;
      
      Ember.run.once(that, 'refreshPicker');
    }
  ),
  
  refreshPicker: function(){
    var that = this,
      newOpts = {
        "disabled": that.get('disabled'),
        "changeYear": (that.get('disabled')) ? false : that.get('changeYear'),
        "changeMonth": (that.get('disabled')) ? false : that.get('changeMonth'),
      };
    
    if(that.get('minDate')) {
      if(moment(that.get('minDate')).isValid()) {
        newOpts.minDate = moment(that.get('minDate')).format('YYYY-MM-DD');
      } else {
        newOpts.minDate = that.get('minDate');
      }
    }
    if(that.get('maxDate')) {
      if(moment(that.get('maxDate')).isValid()) {
        newOpts.maxDate = moment(that.get('maxDate')).format('YYYY-MM-DD');
      } else {
        newOpts.maxDate = that.get('maxDate');
      }
    }
    
    that.$().datepicker("option", newOpts);
    that.$().datepicker("setDate", that.get('value'));
  },
  
  didInsertElement: function(){
    var that = this,
      settings = that.getProperties(
        'dateFormat',
        'changeMonth',
        'changeYear',
        'disabled'
      );
    
    if(that.get('disabled')){
      settings.changeYear = false;
      settings.changeMonth = false;
    }
    
    if(that.get('minDate')) {
      if(moment(that.get('minDate')).isValid()) {
        settings.minDate = moment(that.get('minDate')).format('YYYY-MM-DD');
      } else {
        settings.minDate = that.get('minDate');
      }
    }
    if(that.get('maxDate')) {
      if(moment(that.get('maxDate')).isValid()) {
        settings.maxDate = moment(that.get('maxDate')).format('YYYY-MM-DD');
      } else {
        settings.maxDate = that.get('maxDate');
      }
    }
    
    settings.onSelect = Ember.$.proxy(that.selectDate, that);
    
    if( that.get('dateMarkers') ){
      settings.beforeShowDay = Ember.$.proxy(that.beforeShowDay, that);
    }
    
    if( that.get('tagName') === 'div' ){
      that.$().datepicker(settings).datepicker("setDate", that.get('value'));
    } else {
      that.$().datepicker(settings);
    }
    
  },
  
  willDestroyElement: function(){
    var that = this;
    that.$().datepicker('destroy');
  },
  
  beforeShowDay: function(date){
    var that = this,
      datetime = moment(date).format('YYYY-MM-DD'),
      markers = that.get('dateMarkers'),
      dateReturn;
    
    if( that.get('daysWithoutEventsSelectable') ){
      // Days without events CAN be selected
      dateReturn = [
        true,
        (markers[datetime]) ? that.get('dateWithEventsClass') : that.get('dateNoEventsClass'), // CSS added to day
        (markers[datetime]) ? that.get('markerTooltipPrefix') + markers[datetime] + that.get('markerTooltipSuffix') : '' // tooltip
      ];
    } else {
      // Days without event CAN NOT be selected
      dateReturn = [
        (markers[datetime]) ? true : false,
        (markers[datetime]) ? that.get('dateWithEventsClass') : that.get('dateNoEventsClass'), // CSS added to day
        (markers[datetime]) ? that.get('markerTooltipPrefix') + markers[datetime] + that.get('markerTooltipSuffix') : '' // tooltip
      ];
    }
    
    /*  /
    console.log(
      "%c%s#beforeShowDay %s: %O, marker: %s",
      "color: purple", // http://www.w3schools.com/html/html_colornames.asp
      that.toString(),
      date,
      dateReturn,
      markers[datetime]
    );
    //*/
    
    return dateReturn;
  },
  
  selectDate: function(date){
    var that = this;
    
    that.set('value', date);
    
    if( that.get('action') ){
      that.sendAction();
    }
  }
});
