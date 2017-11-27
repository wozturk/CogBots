module.exports = [

(session) => {

var msg = new builder.Message(session)
    .speak('This is the text that will be spoken.')
    .inputHint(builder.InputHint.acceptingInput);
session.send(msg).endDialog();

}
]