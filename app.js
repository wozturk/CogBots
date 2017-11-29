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
	builder.Prompts.text(session, 'Voer de error code in');
},
(session, results) => {
	session.send(`Dit betekent dat de boiler oververhit is geraakt. Vaak helpt het door de boiler gedurende een korte periode uit te schakelen.`);

	session.dialogData.abort = 'ja, ik kan verder',
	session.dialogData.proceed = 'nee, graag ontvang ik extra hulp';

  builder.Prompts.choice(session,
		`Kun je nu verder of heb je extra hulp nodig?`,
		[session.dialogData.abort, session.dialogData.proceed],
		{
			listStyle: builder.ListStyle.button,
		  retryPrompt: 'Mompelaar! ...probeer opnieuw.'
		});
},
(session, results) => {
		console.log(session.message.text);
			if(results.response) {
				switch (results.response.entity) {
					case session.dialogData.abort:
						session.endDialog(`opgelost, goed teamwerk!`);
						break;
					case session.dialogData.proceed:
						session.beginDialog('nextStep');
						break;
				}
			} else {
				session.send(`Heb je al antwoord gegeven?`);
			}
		}
]);

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

bot.dialog('intro', [
	(session) => {
		builder.Prompts.text(session, 'Welkom. Dit is een geautomatiseerde zelfservice. Ik ben bot. wat is je naam?');
	},
	(session, result) => {
		session.send(`Hi ${result.response}, waarmee kan ik je helpen?`);
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
bot.dialog('speak', require('./dialogs/speak')).triggerAction({matches: /^speak/i});


bot.dialog('support', require('./dialogs/support')).triggerAction({
	matches: [/help/i, /support/i, /huh/i, /wat/i]
});

bot.dialog('backchat', [
	(session) => {
		session.send(`We gaan met de html babbelen via de bot, cool...`);
	},
	(session, result) => {
    let reply = createEvent("changeBackground", session.message.text, session.message.address);
    session.endDialog(reply);
	}
]).triggerAction({
	matches: /backchat/i
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
bot.on('error', event => {
    console.log('And error ocurred', event);
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

//Bot will listen to inbound backchannel events
bot.on('event', (event) => {
	let msg = new builder.Message().address(event.address);
	if(event.name === 'buttonClicked') {
		msg.text('You clicked a button');
	}
	bot.send(msg);
});

const createEvent = (eventName, value, address) => {
	let msg = new builder.Message().address(address);
	msg.data.type = 'event';
	msg.data.name = eventName;
	msg.data.value = value;
	return msg;
}