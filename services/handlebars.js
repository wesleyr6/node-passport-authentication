const exphbs = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', exphbs({
        extname: 'hbs',
        defaultLayout: 'unlogged/main.hbs'
    }));

    app.set('view engine', 'hbs');
}