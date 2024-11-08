require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { loadSkinModel, loadDiseaseModel } = require('./controllers/loadModel');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // Load models
    const skinModel = await loadSkinModel();
    const diseaseModel = await loadDiseaseModel();

    server.app.skinModel = skinModel;
    server.app.diseaseModel = diseaseModel;

    // Add routes
    server.route(routes);
    await server.register(require('@hapi/inert'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
