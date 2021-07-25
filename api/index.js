
const server = require('./src/server.js');
const { conn } = require('./src/db');

//SETTINGS
server.set('AppName','Server Express');
server.set('port',3001);


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    console.log('***DATA BASE IS CONECTED***');
    server.listen(server.get('port'), () => {
    console.log(`server on port ${server.get('port')}`); // eslint-disable-line no-console
    });
});