module.exports = [
(session, args, next) => {
	let postBack = session.message.text;
	session.send(`you said ${postBack}`);
  let reply = createEvent("openModal", postBack, session.message.address);
  session.endDialog(reply);
}

]