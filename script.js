var restartBtn = document.getElementById('restart');
var screenEl = document.getElementById('screen');
var appEl = document.getElementById('app');

writeToScreen('Initial', 'primary');

var StateProps;
var Error;
var ErrorBoundary;
var App = window.createReactClass({
  getInitialState: function () {
    return { id: 1 };
  },

  update: function () {
    writeToScreen('Updating Props', 'primary');
    this.setState({ id: this.state.id + 1 });
  },

  unmount() {
    writeToScreen('Unmounting', 'primary');
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  },

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement('hr', null),
      React.createElement(StateProps, { bar: this.state.id }),
      '\xA0\xA0\xA0',
      React.createElement(
        'button',
        { type: 'button', className: 'btn btn-primary', onClick: this.update },
        'Update Props'
      ),
      React.createElement('hr', null),
      React.createElement(
        'button',
        { type: 'button', className: 'btn btn-danger', onClick: this.unmount },
        'Unmount'
      ),
      '\xA0\xA0\xA0',
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(Error, null)
      )
    );
  }
});

function createStateProps() {
  return window.createReactClass({
    getInitialState: function () {
      writeToScreen('constructor / getInitialState', 'info');
      return { foo: 1, error: false };
    },

    getDefaultProps: function () {
      writeToScreen('defaultProps / getDefaultProps', 'info');
      return { bar: 1 };
    },

    update: function () {
      writeToScreen('Updating State', 'primary');
      this.setState({ foo: this.state.foo + 1 });
    },

    componentWillMount: function () {
      writeToScreen('componentWillMount', 'warning');
    },

    componentDidMount: function () {
      writeToScreen('componentDidMount', 'warning');
    },

    shouldComponentUpdate: function () {
      writeToScreen('shouldComponentUpdate', 'info');
      return true;
    },

    componentWillReceiveProps: function (nextProps) {
      writeToScreen('componentWillRecieveProps', 'warning');
    },

    componentWillUpdate: function () {
      writeToScreen('componentWillUpdate', 'warning');
    },

    componentDidUpdate: function () {
      writeToScreen('componentDidUpdate', 'warning');
    },

    componentWillUnmount: function () {
      writeToScreen('componentWillUnmount', 'danger');
    },

    render: function () {
      writeToScreen('render', 'success');
      return React.createElement(
        'span',
        null,
        'This.state.foo: ',
        this.state.foo,
        '\xA0\xA0\xA0\xA0\xA0 This.props.bar: ',
        this.props.bar,
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'button',
          { className: 'btn btn-success', onClick: this.update },
          'Update State'
        )
      );
    }
  });
}

function createError() {
  return window.createReactClass({
    getInitialState: function () {
      return { error: false };
    },

    error: function () {
      writeToScreen('Throwing Error', 'primary');
      this.setState({ error: true });
    },

    render: function () {
      if (this.state.error) {
        throw new Error('error');
      }
      return React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          { className: 'btn btn-danger', onClick: this.error },
          'Throw Error'
        )
      );
    }
  });
}

function createErrorBoundary() {
  return window.createReactClass({
    getInitialState: function () {
      return { error: false };
    },

    componentDidCatch: function (error, info) {
      writeToScreen('componentDidCatch', 'danger');
      this.setState({ error: true });
    },

    render: function () {
      return this.props.children;
    }
  });
}

function domRender() {
  StateProps = createStateProps();
  Error = createError();
  ErrorBoundary = createErrorBoundary();
  ReactDOM.render(React.cloneElement(React.createElement(App, null)), document.getElementById('app'));
}

function restart() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  emptyApp();
  writeToScreen('Initial', 'primary');
  domRender();
}

function emptyApp() {
  screenEl.innerHTML = '';
  appEl.innerHTML = '';
}

function writeToScreen(msg, level) {
  screenEl.innerHTML += '<div class="log bg-' + level + '">' + '<span class="glyphicon glyphicon-ok"></span> &nbsp;&nbsp;' + msg + '</div>';
}

(this.reinit = function init() {
  restartBtn.addEventListener('click', restart);
  domRender();
})();
