module.exports = () => {

	//botbuilder let's us run a bot locally.
	global.builder  =  require('botbuilder');


	 //not needed for global.
	const connector = new builder.ChatConnector({
		  appId: '69070849-e9fb-494f-9477-a4efa9ece047',
	    appPassword: 'hubmxZDS709%*(xrQRDN13?'
	});

	global.bot = new builder.UniversalBot(connector);
	bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));

	// Restify let's us use the bot in a framwork channel or emulator
	let restify = require('restify');

	//setup Restify Server 
	const server = restify.createServer();
	server.listen(process.env.port || process.env.PORT || 3978, () => {
		console.log('%s listening to %s', server.name, server.url);
	global.bot = new builder.UniversalBot(connector);
	});

	server.post('/api/messages', connector.listen());

	//serve static page.
	server.get(/.*/, restify.plugins.serveStatic({
		'directory': __dirname,
		'default': 'index.html'
	}));

}