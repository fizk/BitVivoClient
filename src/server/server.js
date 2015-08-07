import express from "express";
import React from "react";
import Router from "react-router";
import Swig from "swig";
const app = express();

app.engine('html', Swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/../../views');
app.set('view cache', false);
Swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.

import routes from "../shared/routes";

app.get('/*', function (req, res) {
    Router.run(routes, req.url, Handler => {
        let content = React.renderToString(<Handler />);
        res.render('index', { content: content });
    });
});

var server = app.listen(3000, function () {
    console.log(
        'Server listening at http://%s:%s',
        server.address().address,
        server.address().port
    );
});
