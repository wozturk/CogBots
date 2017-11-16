module.exports = [(session) => {

			session.send(`Je snapt 't niet, he?`);

},
(session, result) => {
	if (result.response === 'nee') {
		session.send(`Dat geeft niet, ik heb het antwoord op al je vragen ....`);
		session.endDialog(`42`);
	}
}

]