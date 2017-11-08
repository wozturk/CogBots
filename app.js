//botbuilder let's us run a bot locally.
let builder  =  require('botbuilder');
// Restify let's us use the bot in a framwork channel or emulator
let restify = require('restify');

//setup Restify Server 
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
	console.log('%s listening to %s', server.name, server.url);
});


//we start a listener. without restify we use 'new builder.ConsoleConnector().listen();'
//with restiy , the listener is added below
let connector = new builder.ChatConnector({
		// you can use the framework service in the emulator without MS App credentials
	  appId: 'aeeb7b31-fc4c-43f8-9e00-ff3a97f7a898',
    appPassword: 'v5siPE79fS94EXxOGcC2HR9'

});


server.post('/api/messages', connector.listen());

server.get(/.*/, restify.plugins.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

//and it wil execute this function on enter. and console.log what we typed. very handy for nothing

//the UniversalBot is the brains of the app.manages all conversation.
let bot = new builder.UniversalBot(connector, session => {
		let msg = session.message;
		if(msg.attachments && msg.attachments.length > 0) {
			let attach = msg.attachments[0];
			session.send({
				text: "You sent: ",
				attachments: [
					{
						contentUrl: attach.contentUrl,
						name: attach.name
					}
				]
			});
		} else {
			session.send("You said: %s", session.message.text);
		}	
});