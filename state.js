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

let userName = 'guest',
		cityKey = 'Amsterdam',
		welcomeText = 'So now I have your name, we can continue \n * Would you like to speak to me? type \' speak \'';


const bot = new builder.UniversalBot(connector, session => {

	if (!session.conversationData[cityKey]) {
		session.conversationData[cityKey] = 'Amsterdam';
	} else {
		session.send(`Ik heb ${session.conversationData[cityKey]} in gedachte`);
	}

	if(!session.userData[userName]) {
		return session.beginDialog('intro');
	}

	if(!session.privateConversationData[userWelcomed] {
		session.privateConversationData[userWelcomed] = true;
	}

	session.beginDialog('randomRamble');

});



//enable conversation persistence
bot.set('persistConversationData', true); //i think this is default already

bot.dialog('intro', [
	(session) => {
		builder.Prompts.text(session, 'Hi, what is your name?');
	},
	(session, results) => {
		let session.userData[userName] = results.response,
				session.conversationData[userWelcomed] = true;
		session.endDialog(`Welkom ${session.userData[userName]}`);
		
	}
]);

bot.dialog('randomRamble', [
		(session) => {
			
		},
		(session, results) => {

		}
	])

bot.dialog('speak', session => {
		session.send(`I'm listening....`);
		session.endDialog();
}).triggerAction({ matches: /^speak/i });



// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});