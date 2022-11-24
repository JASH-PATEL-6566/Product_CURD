const state_controller = require('../controller/state_controller');

module.exports = (app) => {
    app.get('/', state_controller.fetch);
    app.post('/', state_controller.mutation);
}