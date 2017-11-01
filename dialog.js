let builder  =  require('botbuilder');
let restify = require('restify');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
	console.log('%s listening to %s', server.name, server.url);
});


const connector = new builder.ChatConnector({

	  appId: 'aeeb7b31-fc4c-43f8-9e00-ff3a97f7a898',
    appPassword: 'v5siPE79fS94EXxOGcC2HR9'

});

server.post('/api/messages', connector.listen());


const bot = new builder.UniversalBot(connector, [
	//root dialog
	//we start here, if message by user doesn't match pattern, conversation will start here
	(session, args, next) => {
		session.send(`Hi there! Glad you are here.`);
		session.beginDialog('playGame');
	},
	(session, results, next) => {

		if(results.response) {
			
		}
	}



]);

bot.dialog('playGame', [

	(session, args, next) => {
		
	}
	]);