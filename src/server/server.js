import express from "express";
import React from "react";
import Router from "react-router";
import Swig from "swig";
const app = express();

// This is where all the magic happens!
app.engine('html', Swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/../../views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
Swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

import routes from "../shared/routes";

app.get('/*', function (req, res) {
    Router.run(routes, req.url, Handler => {
        let content = React.renderToString(<Handler />);
        res.render('index', { content: content });
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
