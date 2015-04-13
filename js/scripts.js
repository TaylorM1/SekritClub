$(document).ready(function(){
    $('.refresh').click(function(){
        $('ul').fadeTo('slow', 0);
        checkStreamerStatus();
        $('ul').fadeTo('slow', 1);
    });
    
    $('.slide-menu-left').jScrollPane();
});

//Setting up a multidimensional array of streamers and the corresponding url for use later.
var streamerURLs = [['Rellow', 'http://hitbox.tv/embed/rellow', 'non-twitch'],
    ['BrutalEarthworm', 'http://hitbox.tv/embed/Brutal-Earthworm', 'non-twitch'],
    ['JuniorTerra', 'http://hitbox.tv/embed/juniorterra', 'non-twitch'], 
    ['Thilink', 'http://hitbox.tv/embed/thilink', 'non-twitch'], 
    ['Handythehanser', 'http://hitbox.tv/embed/Handythehanser', 'non-twitch'],
    ['3xfighter', 'https://www.picarto.tv/live/playerpopout.php?popit=3xfighter&off=1&token=0', 'non-twitch'],
    ['BlazinRaisins', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=blazin_raisins&autoplay=1', 'blazin_raisins'],
    ['Vinny', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=vinesauce&autoplay=1', 'vinesauce'], 
    ['Limes', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=limealicious&autoplay=1', 'limealicious'], 
    ['Direboar', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=direboar&autoplay=1', 'direboar'], 
    ['Joel', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=vargskelethor&autoplay=1', 'vargskelethor'], 
    ['KY', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=livebyfoma&autoplay=1','livebyfoma'],
    ['Hootey', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=hootey&autoplay=1', 'hootey'],
    ['Darren', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=iwantapotato&autoplay=1', 'iwantapotato'],
    ['RevScarecrow', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=revscarecrow&autoplay=1', 'revscarecrow'],
    ['Imakuni', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=pelikuni&autoplay=1', 'pelikuni'],
    ['Fred', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=fredsauce&autoplay=1', 'fredsauce'],
    ['FearGingers', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=feargingers&autoplay=1', 'feargingers'],
    ['MentalJen', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=mentaljen&autoplay=1', 'mentaljen'],
    ['StudyGuy', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=study_guy&autoplay=1', 'study_guy'],
    ['SyncVideo', 'http://sync-video.com/r/rUdw3g4l', 'non-twitch'],
    ['DistantKingdom', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=distantkingdom&autoplay=1', 'distantkingdom'],
    ['AdaptChance', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=adaptchance&autoplay=1', 'adaptchance'],
    ['Mang0', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=mang0&autoplay=1', 'mang0']];
var streamStatuses = document.querySelectorAll('.streamerStatus');

//Switches the current embed to the corresponding URL of the streamer name the user clicked.
function instantEmbed(caller) {
    var i, streamer = caller.value;

    for(i = 0; i < streamerURLs.length; i++){
        if(streamerURLs[i][0] === streamer){
            document.getElementById('stream-embed').src = streamerURLs[i][1];
            document.getElementById('embedURL').value = streamerURLs[i][1]; 
            return;
        }
    }
    document.getElementById('stream-embed').src = './nostream.php';
    document.getElementById('embedURL').value = 'Something messed up. Go yell at Rellow until he fixes it.';
    return;
}

function getStreamerStatus(apimeth, curStreamer){
    Twitch.api({method: apimeth}, function(error, list) {
                    if(list.stream != null){
                        document.getElementById(curStreamer).textContent = 'Online';
                        document.getElementById(curStreamer).className = 'streamerStatusACTIVE';
                    }else{
                        document.getElementById(curStreamer).className = 'streamerStatus';
                    }
                });
}

function checkStreamerStatus(){
    console.log("Checking streamer statuses...");
    var apiMethod, currentStreamer;
    Twitch.init({clientId: 'o5s94jbl4vk4oygss8zv5qi0xsjwcgi'}, function(error, status) {
        for(i = 0; i < streamerURLs.length; i++){
            currentStreamer = streamerURLs[i][0];
            if(streamerURLs[i][2] != 'non-twitch'){
                apiMethod = '/streams/' + streamerURLs[i][2];
                getStreamerStatus(apiMethod, currentStreamer);
            }
        }
    });
}
checkStreamerStatus();

//Adjusts width of chat and embed
function changeWidth(newWidth){
    document.getElementById('playerContainer').style.width = newWidth + '%';
    document.getElementById('chatContainer').style.marginLeft = newWidth + '%';
    document.getElementById('chatContainer').style.width = 100 - newWidth + '%';
}

//Checks what type of chatango client is being requested, then loads the chatango client again.
function reloadChat(){
    if(document.getElementById('chatango-embed').name == 'flash'){
        document.getElementById('chatango-embed').src = './chats/' + document.getElementById('styleSwap').name + '/chatroom.html';
    }
    else if(document.getElementById('chatango-embed').name == 'html5'){
        document.getElementById('chatango-embed').src = './chats/' + document.getElementById('styleSwap').name + '/chatroom2.html';
    }
    else{
        document.getElementById('chatango-embed').src = './chats/' + document.getElementById('styleSwap').name + '/chatroom.html';
    }
}

function changeEmbed(){
    if(document.getElementById('embedURL').value === "" || document.getElementById('embedURL').value === " "){
        document.getElementById('stream-embed').src = './nostream.php';
    }else{
        document.getElementById('stream-embed').src = document.getElementById('embedURL').value;
    }
}

//A bunch of snippets assigned to buttons and such

//Takes the value of what is in the text box and enters it into the playerContainer when Enter is pressed
document.getElementById('embedURL').onkeydown = function() {
    if (event.keyCode == 13){
        changeEmbed();
    }
}

//Inserts a template URL into the embed URL box so the user can quickly and easily enter a twitch streamer's channel name to embed them
document.getElementById("easyTwitchEmbed").onclick = function() {
    document.getElementById('embedURL').value='http://www.twitch.tv/widgets/live_embed_player.swf?channel=[CHANNEL NAME HERE]&autoplay=1';
}
         
//Switches out Chatango for the backup IRC channel client
document.getElementById('IRC').onclick = function() {
    document.getElementById('chatango-embed').src = "http://lightirc.com/start/?host=irc.lightirc.com&autojoin=%23asekritclub&showNickSelection=true&showChannelHeader=false&showNavigation=false&showServerWindow=false&styleURL=css%2Fblack.css&nick=User_%25";
}

//Switches between HTML5 Chatango and legacy flash
document.getElementById('chatSwap').onclick = function() {
    if (document.getElementById('chatango-embed').name == 'flash'){
         document.getElementById('chatango-embed').src = './chats/' + 'default' + '/chatroom2.html';
         document.getElementById('chatango-embed').name = 'html5';
    } else {
         document.getElementById('chatango-embed').src = './chats/' + 'default' + '/chatroom.html';
         document.getElementById('chatango-embed').name = 'flash';
    }
}

/** Deprecated streamer list and links menu code
//Shows and hides the streamer list when the "showStreamerList" button is clicked
document.getElementById('showStreamerList').onclick = function() {
    if (document.getElementById('streamerList').style.visibility == 'hidden') {
         document.getElementById('streamerList').style.visibility = 'visible';
         document.getElementById('streamerList').style.width = '10%'
         document.getElementById('restOfSite').style.width = '90%';
         document.getElementById('restOfSite').style.marginLeft = '10%';
    } else {
         document.getElementById('streamerList').style.width = '0%'
         document.getElementById('streamerList').style.visibility = 'hidden';
         document.getElementById('restOfSite').style.width = '100%';
         document.getElementById('restOfSite').style.marginLeft = '0%';
    }
}

//Shows and hides the links section of the site when the "linksButton" is clicked
document.getElementById('linksButton').onclick = function() {
     if(document.getElementById('links').style.visibility == 'hidden'){
         document.getElementById('streamChat').style.height = '90%';
         document.getElementById('links').style.visibility = 'visible';
     }
     else {
         document.getElementById('streamChat').style.height = '95%';
         document.getElementById('links').style.visibility = 'hidden';
     }
}
**/
