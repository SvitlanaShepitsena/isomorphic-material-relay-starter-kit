var os = require('os');
var eol = os.platform
  ? ('win32' == os.platform() ? '\r\n' : '\n')
  : '\n';

module.exports = eol;