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
		if(args) {
			session.dialogData.isReprompt = args.isReprompt;
		}
		//prompts a user 
		builder.Prompts.choice(session, 'Do you want to play a game?', ['yes', 'no'], {maxRetries: 3, retryPrompt: 'Mumbler! ...try again.'});
	},
	(session, results, next) => {
		let answer = results.response.entity;
		if(answer === 'yes') {
			session.beginDialog('startGame');
		} else if (answer === 'no') {
			session.send(`dan niet joh!`);
			session.endDialog();
		} else {
			session.send(`you fucked up. type much?`);
			session.endDialog();
		}
	}
]);

bot.dialog('startGame', [
	(session, args, next) => {
		session.send(`ik wil wat dingen van je weten`);
		builder.Prompts.choice(session, 'Wat is je naam?', ['Chris', 'Guido'], {maxRetries: 3, retryPrompt: 'Mumbler! ...try again.'});
	},
	(session,results, next) => {


	}
]);

bot.dialog('support', session => {
		session.send(`Je snapt 't niet, he?`);
		session.endDialog();
}).triggerAction({
	matches: [/help/i, /support/i, /huh/i]
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

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});
