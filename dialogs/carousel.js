module.exports = [
	(session) => {

				var cards = getCardsAttachments();

		    var reply = new builder.Message(session)
		        .attachmentLayout(builder.AttachmentLayout.carousel)
		        .attachments(cards);
				session.send(`E60 betekent dat er iets mis is met de boiler.`)
		    session.send(reply);
				session.send(`Heb je geprobeerd de ketel uit en aan te zetten?`)
		    builder.Prompts.choice(session,
					`Heeft dit geholpen?`,
					['ja', 'nee'],
					{
						listStyle: builder.ListStyle.button,
					  retryPrompt: 'Mompelaar! ...probeer opnieuw.'
					});
		    


			function getCardsAttachments(session) {
			    return [
			        new builder.HeroCard(session)
			            .title('Step 1')
			            .subtitle('')
			            .text('katten houden je warm')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/1-unscrew.png')
			            ])
			            .buttons([
			                builder.CardAction.openUrl(session, 'https://loremflickr.com/320/180/kitten', 'click')
			            ]),
			        new builder.HeroCard(session)
			            .title('Step 3')
			            .subtitle('')
			            .text('duck duck goose')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/2-plug.png')
			            ])
			            .buttons([
			                builder.CardAction.openUrl(session, 'https://loremflickr.com/320/180/goose', 'click')
			                .image('http://howcanihelp.azurewebsites.net/svg/warning.svg')
			            ]),


			        new builder.HeroCard(session)
			            .title('Step 2')
			            .subtitle('')
			            .text('en tas is een tas')
			            .images([
			                builder.CardImage.create(session, 'http://howcanihelp.azurewebsites.net/images/3-meassure.png')
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
					case 'ja':
						session.send(`opgelost, goed teamwerk!`);
						session.reset();
						break;
					case 'new':
						session.beginDialog('./dialogs/startLiveHelp');
						break;
				}

			} else {
				session.send(`Heb je al antwoord gegeven?`);
			}
		}
]