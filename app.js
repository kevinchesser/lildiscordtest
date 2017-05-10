var Discordie = require("discordie");
var client = new Discordie();

var testChannel;
var state; //0 idle, 1 active

client.connect({
    token: ""
});

client.Dispatcher.on("GATEWAY_READY", e => {
        initBot();
        testChannel.sendMessage("The Kruelmonster is approaching!");
        console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
    if(e.message.channel.id == ""){
        if(e.message.content == "km attacks"){
            state = 1; //set bot to active state
            testChannel.sendMessage("pong");
        }
        console.log(e.message);
    }
});

function initBot(){
    testChannel = client.Channels.get("");
    state = 0; //set bot to idle state
}
