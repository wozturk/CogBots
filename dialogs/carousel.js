module.exports = [
	(session) => {

				var cards = getCardsAttachments();

		    var reply = new builder.Message(session)
		        .attachmentLayout(builder.AttachmentLayout.carousel)
		        .attachments(cards);
				session.send(`E60 betekent dat je boiler stuk is.`)
		    session.send(reply);

		    builder.Prompts.choice(session,
					`Was this helpful?`,
					['yes', 'no'],
					{
						listStyle: builder.ListStyle.button,
					  retryPrompt: 'Mumbler! ...try again.'
					});
		    


			function getCardsAttachments(session) {
			    return [
			        new builder.HeroCard(session)
			            .title('Step 1')
			            .subtitle('')
			            .text('katten houden je warm')
			            .images([
			                builder.CardImage.create(session, 'https://loremflickr.com/320/180/kitten')
			            ])
			            .buttons([
			                builder.CardAction.openUrl(session, 'https://loremflickr.com/320/180/kitten', 'click')
			            ]),
			        new builder.HeroCard(session)
			            .title('Step 3')
			            .subtitle('')
			            .text('duck duck goose')
			            .images([
			                builder.CardImage.create(session, 'https://loremflickr.com/320/180/duck')
			            ])
			            .buttons([
			                builder.CardAction.openUrl(session, 'https://loremflickr.com/320/180/goose', 'click')
			            ]),


			        new builder.HeroCard(session)
			            .title('Step 2')
			            .subtitle('')
			            .text('en tas is een tas')
			            .images([
			                builder.CardImage.create(session, 'https://loremflickr.com/320/180/puppy')
			            ])
			            .buttons([
			                builder.CardAction.openUrl(session, 'https://loremflickr.com/320/180/puppy', 'Leg uit')
			            ])
			    ];
			}
	},
	(session, results) => {
			if(results.response) {
				session.send(`you answered ${results.response.entity}`);
				switch (results.response.entity) {
					case 'yes':
						session.send(`great! I'm resetting now...`);
						session.reset();
						break;
					case 'no':
						session.beginDialog('./dialogs/startLiveHelp');
						break;
				}

			} else {
				session.send(`I  did not yet receive an answer. Have you decided yet?`);
			}
		}
]