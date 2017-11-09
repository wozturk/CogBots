global.builder  =  require('botbuilder');
let restify = require('restify');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
	console.log('%s listening to %s', server.name, server.url);
});


const connector = new builder.ChatConnector({

		  appId: '69070849-e9fb-494f-9477-a4efa9ece047',
	    appPassword: 'hubmxZDS709%*(xrQRDN13?'

});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector, [
	//root dialog
	//we start here, if message by user doesn't match pattern, conversation will start here
	(session, args, next) => {
		builder.Prompts.text(session, `Please enter the error code`);
	},
	(session, results, next) => {
		if(results.response) {
			session.beginDialog('./dialogs/lookupInput');
		}
	}
]);

bot.dialog('carousel', require('./dialogs/carousel')).triggerAction({
 matches:[/E60/i, /hi/i]
});

bot.dialog('chooseNextStep', [
		session => {
			builder.Prompts.choice(session,
				`Was this helpful?`,
				['yes', 'no'],
				{listStyle: builder.listStyle.button });
		},
		(session,results) => {

		}
	]);

bot.dialog('support', require('./dialogs/support')).triggerAction({
	matches: [/help/i, /support/i, /huh/i]
});
// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});