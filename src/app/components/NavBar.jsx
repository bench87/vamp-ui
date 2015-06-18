var React = require('react/addons');
var Config = require('../config.js');

var NavBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    className: React.PropTypes.string,
    tabs: React.PropTypes.array.isRequired,
    activeTabId: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      className: ""
    };
  },
  getInitialState: function(){
    return({
      apiUrl: ''
    });
  },
  componentDidMount: function(){
    this.setState({
      apiUrl: Config.getApiHost()
    });
  },

  handleSubmit: function(e){
    e.preventDefault();
    Config.setApiHost(this.state.apiUrl);
  },
  handleChange: function(e){
    this.setState({apiUrl: e.target.value});
  },

  render: function () {

    var tabs = this.props.tabs.map(function (tab) {
      var path = this.context.router.getCurrentPathname();
      var params = this.context.router.getCurrentParams().id;
      
      if (params != undefined) 
        path = path.substring(0,(path.slice(1).indexOf('\/'))+1);

      var isActive = (path == tab.id);
      var className = isActive ? 'active' : '';

      return (
        <li key={tab.id} className="navigation-item"><a href={"#" + tab.id} className={className}>{tab.text}</a></li>
      );
    }, this);

    return (
      <nav className="main-navigation" role="navigation">
        <div className="branding">
          <a className="logo animated fadeInLeft" href="/#deployments">
            <img src='/images/vamp_logo_blue.svg' alt="VAMP logo" />
            <span className="alpha">alpha</span>
          </a>
        </div>

        <ul className="navigation-list">
          {tabs}
        </ul>

        <div className="navigation-options">
          <img src='/images/cog-thick.svg' alt="Options icon" width='20px' height='20px' />
        </div>

        <div className="options-pane">
          <form onSubmit={this.handleSubmit}>
            <input 
              type='text' 
              value={this.state.apiUrl} 
              onChange={this.handleChange} />
          </form>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;