var upload = require('../controllers/upload.server.controller');

module.exports=function(app) {

	app.get('/upload/:filename', upload.read);

	app.post('/upload', upload.create);

};