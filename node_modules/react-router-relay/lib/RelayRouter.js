'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RelayRouterContext = require('./RelayRouterContext');

var _RelayRouterContext2 = _interopRequireDefault(_RelayRouterContext);

var RelayRouter = (function (_React$Component) {
  _inherits(RelayRouter, _React$Component);

  function RelayRouter() {
    _classCallCheck(this, RelayRouter);

    _React$Component.apply(this, arguments);
  }

  RelayRouter.prototype.renderRouterContext = function renderRouterContext(props) {
    return _react2['default'].createElement(_RelayRouterContext2['default'], props);
  };

  RelayRouter.prototype.render = function render() {
    return _react2['default'].createElement(_reactRouter.Router, _extends({}, this.props, {
      render: this.renderRouterContext
    }));
  };

  _createClass(RelayRouter, null, [{
    key: 'displayName',
    value: 'RelayRouter',
    enumerable: true
  }]);

  return RelayRouter;
})(_react2['default'].Component);

exports['default'] = RelayRouter;
module.exports = exports['default'];