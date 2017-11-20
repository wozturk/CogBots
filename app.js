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
	
	(session, args, next) => {
		if(!session.userData.userName) {
			return session.beginDialog('intro');
		} else {
			session.send(`Hi ${session.userData.userName}`);
			next();
		}
	},
	(session, result) => {
		session.userData.userName = result.response;
		//session.send(`Hi ${session.userData.userName}`);
		session.beginDialog('errorHandle');
	},
	(session, result) => {

	}
]);

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

bot.dialog('intro', [
	(session) => {
		builder.Prompts.text(session, 'Welkom. Dit is een geautomatiseerde zelfservice. Ik ben bot, wat is je naam?');
	},
	(session, result) => {
		session.send(`Hi ${result.response}`);
		session.endDialogWithResult(result);

	}
]);

// bot.dialog('carousel', require('./dialogs/carousel')).triggerAction({
//  matches:[/hallo/i]
// });

bot.dialog('errorHandle', require('./dialogs/errorHandle')).cancelAction('cancelAction', 'Ok, ik annuleer deze actie.', {
    matches: /^laat maar$|^annuleer$|^nee$/i
});
bot.dialog('nextStep', require('./dialogs/nextStep')).cancelAction('cancelAction', 'Ok, ik annuleer deze actie.', {
    matches: /^laat maar$|^annuleer$|^nee$/i
}).triggerAction({
	matches: [/step/i]
});
bot.dialog('startLiveHelp', require('./dialogs/startLiveHelp')).cancelAction('cancelAction', 'Ok, ik annuleer deze actie.', {
    matches: /^laat maar$|^annuleer$|^nee$/i
});

bot.dialog('openLightbox', require('./dialogs/openLightbox')).triggerAction({matches: /^http/i});


bot.dialog('support', require('./dialogs/support')).triggerAction({
	matches: [/help/i, /support/i, /huh/i, /wat/i]
});

bot.dialog('reset', (session) => {
	session.reset();
	session.userData = {}; 
	session.privateConversationData = {};
	session.conversationData = {};
	session.dialogData = {};
}).triggerAction({
	matches: [/cancel/i, /stop/i, /reset/i, /^start opnieuw$/i]
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