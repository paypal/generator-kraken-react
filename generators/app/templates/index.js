'use strict';

require('continuation-local-storage');

const kraken = require('kraken-js');
const express = require('express');
const shush = require('shush');
const app = express();
const port = process.env.PORT || 8000;
const spec = () => {
  return {
    onconfig: function (config, next) {
      next(null, config);
    }
  };
};

app.use(kraken(spec()));

app.listen(port, function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('[%s] Listening on http://localhost:%d\nHit http://localhost:%d%s to taskify your life'
        , app.settings.env.toUpperCase(), port, port, require('./config/config.json').requestURI);
    }
});
