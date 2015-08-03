var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
var ClusterSettingsBoxItem = require('./ClusterSettingsBoxItem.jsx');

var ClusterSettingsBox = React.createClass({

  getInitialState: function(){
    return {
      weights: {},
      dirty: false
    }
  },
  componentDidMount: function(){
    this.setWeights(this.props.services);
  },
  componentWillReceiveProps: function(nextProps){
    if(!this.props.activeCluster)
      this.setWeights(nextProps.services);
  },

  // Event handlers
  handleWeightSliderChange: function(e, name){
    if(e && !this.state.dirty)
      this.updateWeights(name, e.currentTarget.value);
  },

  // Helper methods
  setWeights: function(services){
    var _weightsObject = {};
    _.each(services, function(service,key){
      _weightsObject[service.breed.name] = service.routing.weight;
    }, this);
    this.setState({ weights: _weightsObject });
  },
  updateWeights: function(serviceName, value){
    this.setState({ dirty: true });

    var newWeights = this.state.weights,
        valueToDivide = 0,
        valuePerService = 0,
        valueRemainder = 0,
        totalWeight = 0;
    
    valueToDivide = newWeights[serviceName] - value ;
    valuePerService = valueToDivide / ( Object.keys(newWeights).length - 1 );
    valueRemainder = valuePerService % 1;
    valueRemainder == 0 ? valueRemainder == null : valueRemainder = valueRemainder;
    newWeights[serviceName] = parseInt(value);

    _.each(newWeights, function(value, service){
      if(service != serviceName){
        newWeights[service] += valuePerService;
        totalWeight += newWeights[service]
      }
    });

    console.log(totalWeight + newWeights[serviceName]);

    this.setState({ 
      weights: newWeights,
      dirty: false
    });
  },
  
  // Render
  render: function(){
    
    var services = this.props.services,
        servicesSettingList = [];

    _.each(services, function(service,key){
      _weight = this.state.weights[service.breed.name] ? this.state.weights[service.breed.name] : 0;
      servicesSettingList.push(<ClusterSettingsBoxItem key={key} serviceSettings={service} handleWeightSliderChange={this.handleWeightSliderChange} weight={_weight} />);
    }, this);

    // Dynamic classes
    var clusterOptionsClasses = classNames('cluster-options', {
      'active': this.props.editServiceActive && this.props.activeCluster
    });
    var clusterSettingsHeight = this.props.editServiceActive && this.props.activeCluster ? { height: this.props.services.length * 58 } : { height: 0 }

    return (
      <div className={clusterOptionsClasses} style={clusterSettingsHeight}>
        {servicesSettingList}
      </div>
  )}
});

module.exports = ClusterSettingsBox;