var restartBtn = document.getElementById('restart');
var screenEl = document.getElementById('screen');
var appEl = document.getElementById('app');

writeToScreen('Initial', 'primary');

var Welcome;
var App = React.createClass({displayName: "App",
  getInitialState: function () {
    return {id: 1};
  },

  update: function () {
    writeToScreen('Updating Props', 'primary');
    this.setState({id: this.state.id + 1});
  },

  unmount() {
    writeToScreen('Unmounting', 'primary');
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  },

  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("hr", null), 
        React.createElement(Welcome, {bar: this.state.id}), 
        React.createElement("hr", null), 
        React.createElement("button", {type: "button", className: "btn btn-primary", 
          onClick: this.update}, 
          "Update Props"
        ), 
        React.createElement("hr", null), 
        React.createElement("button", {type: "button", className: "btn btn-danger", 
          onClick: this.unmount}, 
          "Unmount"
        )
      )
    )
  }
});

function domRender() {
  Welcome = createWelcome();
  ReactDOM.render(
    React.cloneElement(React.createElement(App, null)),
    document.getElementById('app')
  );
}

function createWelcome() {
  return React.createClass({
    getInitialState: function () {
      writeToScreen('GetInitialState', 'info');
      return {foo: 1};
    },

    getDefaultProps: function () {
      writeToScreen('GetDefaultProps', 'info');
      return {bar: 1};
    },

    update: function () {
      writeToScreen('Updating State', 'primary');
      this.setState({foo: this.state.foo + 1});
    },

    render: function () {
      writeToScreen('Render', 'success');
      return (React.createElement("div", null, 
        "This.state.foo: ", this.state.foo, " ", React.createElement("br", null), 
        "This.state.bar: ", this.props.bar, 
        React.createElement("br", null), 
        React.createElement("hr", null), 
        React.createElement("button", {className: "btn btn-success", 
          onClick: this.update}, 
          "Update State"
        )
      ));
    },

    componentWillMount: function () {
      writeToScreen('ComponentWillMount', 'warning');
    },

    componentDidMount: function () {
      writeToScreen('ComponentDidMount', 'warning');
    },

    shouldComponentUpdate: function () {
      writeToScreen('ShouldComponentUpdate', 'info');
      return true;
    },

    componentWillReceiveProps: function (nextProps) {
      writeToScreen('ComponentWillRecieveProps', 'warning');
    },

    componentWillUpdate: function () {
      writeToScreen('ComponentWillUpdate', 'warning');
    },

    componentDidUpdate: function () {
      writeToScreen('ComponentDidUpdate', 'warning');
    },

    componentWillUnmount: function () {
      writeToScreen('componentWillUnmount', 'danger');
    }
  });
}

function restart() {
  emptyApp();
  writeToScreen('Initial', 'primary');
  domRender();
}

function emptyApp() {
  screenEl.innerHTML = '';
  appEl.innerHTML = '';
}

function writeToScreen(msg, level) {
  screenEl.innerHTML += '<div class="log bg-' + level + '">' +
    '<span class="glyphicon glyphicon-ok"></span> &nbsp;&nbsp;' +
    msg +
    '</div>';
}

(this.reinit = function init() {
  restartBtn.addEventListener('click', restart);
  domRender();
})();
