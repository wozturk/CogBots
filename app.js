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
		// My First Bot - howcanihelp
	  appId: '69070849-e9fb-494f-9477-a4efa9ece047',
    appPassword: 'hubmxZDS709%*(xrQRDN13?'


});


server.post('/api/messages', connector.listen());

server.get(/.*/, restify.plugins.serveStatic({
	'directory': __dirname,
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