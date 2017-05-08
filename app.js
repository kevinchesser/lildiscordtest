var Discordordie = require("discordie");
var client = new Discordie();

client.connect({
    token: ""
});

client.Dispatcher.on("GATEWAY_READY", e => {
        console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
    if(e.message.content == "ping")
        e.message.channel.sendMessage("pong");
});
