var Discordie = require("discordie");
var client = new Discordie();

var testChannel;
var state; //0 idle, 1 active
var messages;
var channelString = "";
var botId =  "";
var specialUser = "";
var hp;

client.connect({
    token: ""
});

client.Dispatcher.on("GATEWAY_READY", e => {
        initBot();
        testChannel.sendMessage("The Kruelmonster is approaching!");
        console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
    if(e.message.channel.id == channelString){
        if(state == 0){ //Idle state
            if(e.message.content == "km attacks"){
                state = 1; //set bot to active state
                clearMessages();
                testChannel.sendMessage("Kruelmonster HP: " + hp + "%");
            } else{
                if(e.message.author.id == botId || e.message.author.id == specialUser){
                //if it is anyone but the special user or bot
                } else{
                    client.Messages.deleteMessage(e.message).then((something) => {
                    });
                }
            }
        } else{ //Active state
           if(/[k]{1}[m]{1}\s{1}\d+/.test(e.message.content)){
             var numberPattern = /\d+/g;
             var newhp = e.message.content.match(numberPattern).join([]);
             newhp = Number.parseInt(newhp);
             if(newhp <= hp && newhp >= 0){
                hp = newhp;
             }
            clearMessages();
             if(hp == 0){
                state = 0; //set bot to idle
                hp = 100; //reset hp
                testChannel.sendMessage("The Kruelmonster is approaching!");
             } else{
                testChannel.sendMessage("Kruelmonster HP: " + hp + "%");
             }
           } else if(e.message.content == "km dead"){
            clearMessages();
             state = 0; //set bot to idle
             hp = 100; //reset hp
             testChannel.sendMessage("The Kruelmonster is approaching!");
           } else{
             if(e.message.author.id == botId || e.message.author.id == specialUser){}
             //If it is anyone but the special user or bot
             else{
                clearMessages();
                testChannel.sendMessage("Kruelmonster HP: " + hp + "%");
             }
           }
        }
    }
});

function initBot(){
    hp = 100;
    testChannel = client.Channels.get(channelString);
    state = 0; //set bot to idle state
}

function clearMessages(){ //Clear messages from the channel
    messages = client.Messages.forChannel(channelString);
    client.Messages.deleteMessages(messages).then((promise) => {
        console.log(promise);
    });
}
