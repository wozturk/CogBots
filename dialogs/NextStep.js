module.exports = [
	(session) => {

				let cards = getCardsAttachments();

		    let reply = new builder.Message(session)
		        .attachmentLayout(builder.AttachmentLayout.carousel)
		        .attachments(cards);

		    session.send(reply);
		    session.replaceDialog('/');



			function getCardsAttachments(session) {
			    return [
			        new builder.HeroCard(session)
			            .title('Stap 1')
			            .subtitle('')
			            .text('Hier zit de uitknop')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/1-unscrew.png')
			            ])
			            .buttons([
			                builder.CardAction.postBack(session, 'http://howcanihelp.azurewebsites.net/images/lightbox.png', 'meer details')
			            ]),
			        new builder.HeroCard(session)
			            .title('Stap 3')
			            .subtitle('')
			            .text('postback')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/2-plug.png')
			            ])
			            .buttons([
			                 builder.CardAction.postBack(session, 'http://howcanihelp.azurewebsites.net/images/lightbox.png', 'meer details')
			            ]),

			        new builder.HeroCard(session)
			            .title('Stap 2')
			            .subtitle('')
			            .text('en tas is een tas')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/3-meassure.png')
			            ])
			            .buttons([
			                builder.CardAction.postBack(session, 'http://howcanihelp.azurewebsites.net/images/lightbox.png', 'meer details')
			            ])
			    ];
			}
	},
	(session, result) => {
		session.send(`you said ${session.message.text}`);
		session.send(`you said ${result.response.entity}`);
		session.send(`you said ${result.response}`);
		}
]