## endofline

Simple module that returns end of line base on the os.platform() in node.
When platform is windows it will return '\r\n' and in other case it will return '\n'

## instalation

```
npm install endofline
```

## usage

```javascript
var eol = require('endofline');
var fs = requrie('fs');

var hosts = fs.readFileSync('/etc/hosts', 'utf-8').split(eol);
```
