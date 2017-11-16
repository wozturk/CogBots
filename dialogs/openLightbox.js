module.exports = [
(session, args, next) => {
	let postBack = session.message.text;
	session.send(`you said ${postBack}`);
	//$.featherlight(postBack);
	console.log(postBack);
}

]