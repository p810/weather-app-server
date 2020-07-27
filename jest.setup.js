const fetchPolyfill = require('whatwg-fetch');

global.fetch = fetchPolyfill.fetch;
