'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('isomorphic-relay');

var _IsomorphicRelayRouter = require('./IsomorphicRelayRouter');

var _IsomorphicRelayRouter2 = _interopRequireDefault(_IsomorphicRelayRouter);

var _IsomorphicRelayRouterContext = require('./IsomorphicRelayRouterContext');

var _IsomorphicRelayRouterContext2 = _interopRequireDefault(_IsomorphicRelayRouterContext);

var _prepareData = require('./prepareData');

var _prepareData2 = _interopRequireDefault(_prepareData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load before "react-relay" to prevent "self is not defined"
exports.default = {
    prepareData: _prepareData2.default,
    Router: _IsomorphicRelayRouter2.default,
    RouterContext: _IsomorphicRelayRouterContext2.default
};