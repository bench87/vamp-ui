var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
var Filterbox = require('./Filterbox.jsx');
var AddArtefactBox = require('./AddArtefactBox.jsx');
var EditDeploymentBox = require('./EditDeploymentBox.jsx');
var BreadCrumbsBar = require('../BreadCrumbsBar.jsx');

var ToolBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      toolbarState: '',
    };
  },

  setToolbar: function(newState){
    this.setState({ toolbarState: newState });
  },
  handleAdd: function(e){
    this.setState({ toolbarState: 'expanded' });
  },

  render: function() {

    var props = this.props,
        conditionalTools = [];

    // Set dynamic classes for elements
    var toolbarClasses = classNames('toolbar', this.state.toolbarState);
    var addButtonClasses = classNames({
      'button': true,
      'button-pink': true,
      'add-button': true,
      'hidden': this.props.addArtefactType == undefined ? true : false
    });
    var editButtonClasses = classNames({
      'button': true,
      'button-pink': true,
      'add-button': true,
      //'hidden': this.props.addArtefactType == undefined ? true : false
    });

    // Determine which tools to load
    if(this.props.onUserInput)
      conditionalTools.push(<Filterbox onUserInput={this.props.onUserInput} />);

    if(this.props.withBreadcrumbs)
      conditionalTools.push(<BreadCrumbsBar/>);

    if(this.props.handleAdd){
      conditionalTools.push(<button className={addButtonClasses} onClick={this.handleAdd}>Add new</button>)
      conditionalTools.push(<AddArtefactBox {...props} setToolbar={this.setToolbar} />);
    }

     if(this.props.editDeployment){
      conditionalTools.push(<button className={editButtonClasses} onClick={this.props.editDeployment}>Edit deployment</button>)
      conditionalTools.push(<EditDeploymentBox {...props} setToolbar={this.setToolbar} toolbarState={this.state.toolbarState} />);
    }


    return (
      <section id="toolbar" className={toolbarClasses}>
        {conditionalTools}
      </section>
  )}

});
 
module.exports = ToolBar;