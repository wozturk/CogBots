global.builder  =  require('botbuilder');
let restify = require('restify');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
	console.log('%s listening to %s', server.name, server.url);
});
	server.get(/.*/, restify.plugins.serveStatic({
		'directory': __dirname,
		'default': 'index.html'
	}));

const connector = new builder.ChatConnector({

		  appId: '69070849-e9fb-494f-9477-a4efa9ece047',
	    appPassword: 'hubmxZDS709%*(xrQRDN13?'

});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector, [

	(session) => {
		session.send('Welkom. Ik ben een bot, waarmee kan ik je helpen. geef de errorcode op.');
		builder.Prompts.text(session, `geef je error code op`);
	},
	(session, results, next) => {
		if(results.response) {
			session.beginDialog('./dialogs/lookupInput');
		}
	}
]);

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

bot.dialog('carousel', require('./dialogs/carousel')).triggerAction({
 matches:[/E60/i, /hi/i]
});

bot.dialog('support', require('./dialogs/support')).triggerAction({
	matches: [/help/i, /support/i, /huh/i, /wat/i]
});

bot.dialog('reset', (session) => {
	session.reset();
}).triggerAction({
	matches: [/cancel/i, /stop/i, /reset/i]
});

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});

// initiating the root dialog
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});