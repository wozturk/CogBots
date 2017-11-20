module.exports = [
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
	
]