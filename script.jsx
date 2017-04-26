var restartBtn = document.getElementById('restart');
var screenEl = document.getElementById('screen');

writeToScreen('Initial', 'primary');

var Welcome = React.createClass({
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
    return (<div>
      This.state.foo: {this.state.foo} <br />
      This.state.bar: {this.props.bar}
      <br />
      <hr />
      <button className="btn btn-success"
        onClick={this.update}>
        Update State
      </button>
    </div>);
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

var App = React.createClass({
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
      <div>
        <hr />
        <Welcome bar={this.state.id} />
        <hr />
        <button type="button" className="btn btn-primary"
          onClick={this.update}>
          Update Props
        </button>
        <hr />
        <button type="button" className="btn btn-danger"
          onClick={this.unmount}>
          Unmount
        </button>
      </div>
    )
  }
});

function domRender() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}

function restart() {
  emptyScreen();
  writeToScreen('Initial', 'primary');
  domRender();
}

function emptyScreen() {
  screenEl.innerHTML = '';
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
