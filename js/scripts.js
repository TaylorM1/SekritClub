//Setting up a multidimensional array of streamers and the corresponding url for use later.
var streamerURLs = [['Rellow', 'http://hitbox.tv/embed/rellow', 'non-twitch'],
    ['BrutalEarthworm', 'http://hitbox.tv/embed/Brutal-Earthworm', 'non-twitch'],
    ['BrutalEarthworm on Twitch', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=brutal_earthworm&autoplay=1', 'brutal_earthworm'],
    ['JuniorTerra', 'http://hitbox.tv/embed/juniorterra', 'non-twitch'], 
    ['Thilink', 'http://hitbox.tv/embed/thilink', 'non-twitch'],
    ['Thilink on Twitch', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=thilink&autoplay=1', 'thilink'],
    ['Handythehanser', 'http://hitbox.tv/embed/Handythehanser', 'non-twitch'],
    ['3xfighter', 'https://www.picarto.tv/live/playerpopout.php?popit=3xfighter&off=1&token=0', 'non-twitch'],
    ['BlazinRaisins', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=blazin_raisins&autoplay=1', 'blazin_raisins'],
    ['TripleSevens', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=triplesevens&autoplay=1', 'triplesevens'],
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
    ['Mang0', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=mang0&autoplay=1', 'mang0'],
    ["Vinny's Mike", 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=m6000w&autoplay=1', 'm6000w'],
    ['Bro Team Pill', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=broteam&autoplay=1', 'broteam'],
    ['Lab Zero', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=labzero&autoplay=1', 'labzero'],
    ['EightySixed', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=eightysixed&autoplay=1', 'eightysixed'],
    ['Mega 64', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=mega64podcast&autoplay=1', 'mega64podcast']];

var streamerlistitem;
var goneOnline = [];

    Twitch.init({clientId: 'o5s94jbl4vk4oygss8zv5qi0xsjwcgi'}, function(error, status) {

    });

$(document).ready(function(){
    $('.refresh').click(function(){
        checkStreamerStatus()
    });

    $('.notificationsX').click(hideNotifications);
    
    
    setInterval(checkStreamerStatus, 120000);
    
    $('.slide-menu-left').jScrollPane(
        {
            autoReinitialise: true,
            hideFocus: true,
            verticalGutter: 0
        });
    checkStreamerStatus();
});

var streamStatuses = document.querySelectorAll('.streamerStatus');

function rebuildStreamerList(){
    $('.streamerList li').remove();
    for (i = 0; i < streamerURLs.length; i++){
        if(i === 0) $('.streamerList').append('<li><h2 class="streamerListText">Sekrit Club</h2></li>');
        if(streamerURLs[i][0] === "Vinny") $('.streamerList').append('<li><h2 class="streamerListText">Vinesauce</h2></li>');
        if(streamerURLs[i][0] === "SyncVideo") $('.streamerList').append('<li><h2 class="streamerListText">Others</h2></li>');
        streamerlistitem = '<li><button class="streamerButton" onclick="instantEmbed(this)" value="' + streamerURLs[i][0] + '">' + streamerURLs[i][0];
        if(streamerURLs[i][2] !== 'non-twitch'){
            streamerlistitem += '</br><span class="streamerStatus" id="' + streamerURLs[i][0].replace(/\s|['"]|/g, "") + '">Offline</span>';
        }
        
        streamerlistitem += '</button></li>'
        $('.streamerList').append(streamerlistitem);
    }
}

function showNotifications(){
    var canDisplay = false;
    if(goneOnline !== null && goneOnline.length > 0 ){
        for(i = 0; i < goneOnline.length; i++){
            if(goneOnline[i][1] === 0)
                canDisplay = true;
        }
        if(canDisplay){
            $('.notifications').fadeIn('slow');
            $('.notifications').toggleClass('hidden');
            $('.notificationListElement').remove();
            for(i = 0; i < goneOnline.length; i++){
                if(goneOnline[i][1] === 0){
                    $('.notificationsList').append('<li class="notificationListElement">'+goneOnline[i][0]+ ' is now online!' + '</li>');
                }
            }
            setTimeout(hideNotifications, 10000);
        }
    }
}

function hideNotifications(){
    $('.notifications').fadeOut('slow');
    $('.notifications').toggleClass('hidden');
}

function updateGoneOnline(currentStreamer, liveStatus){
    if(liveStatus){
        for(i = 0; i < goneOnline.length; i++){
            if(currentStreamer === goneOnline[i][0]){
                goneOnline[i][1] = 1;
                return;
            }
        }
        goneOnline.push([currentStreamer, 0]);
        return;
    }else{
        for(i = 0; i < goneOnline.length; i++){
            if(currentStreamer === goneOnline[i][0]){
                goneOnline.splice(i, 1);
                return;
            }
        }
    }
}

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

function getStreamerStatus(apimeth, currentStreamer){
    Twitch.api({method: apimeth}, function(error, list) {
                    if(list.stream != null){
                        if(list.stream.game !== null){
                            document.getElementById(currentStreamer.replace(/\s|['"]|/g, "")).innerHTML = 'Online<br>' + '<span class="streamerStatusGame">'+list.stream.game+'</span>';
                        }else{
                            document.getElementById(currentStreamer.replace(/\s|['"]|/g, "")).innerHTML = 'Online';
                        }
                        document.getElementById(currentStreamer.replace(/\s|['"]|/g, "")).className = 'streamerStatusACTIVE';
                        updateGoneOnline(currentStreamer, 1);
                        showNotifications();
                    }else{
                        document.getElementById(currentStreamer.replace(/\s|['"]|/g, "")).className = 'streamerStatus';
                        updateGoneOnline(currentStreamer, 0);
                    }
                });
}

function checkStreamerStatus(){
    console.log("Checking streamer statuses...");
    $('.streamerList').fadeTo('fast', 0);
    rebuildStreamerList();
    var apiMethod, currentStreamer;
    for(i = 0; i < streamerURLs.length; i++){
        currentStreamer = streamerURLs[i][0];
        if(streamerURLs[i][2] != 'non-twitch'){
            apiMethod = '/streams/' + streamerURLs[i][2];
            getStreamerStatus(apiMethod, currentStreamer);
        }
    }
    $('.streamerList').delay(1000).fadeTo('slow', 1);
}

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
    document.getElementById('chatango-embed').src = "https://kiwiirc.com/client/irc.kiwiirc.com/?nick=Sekrit Clu|?&theme=mini#asekritclub";
    document.getElementById('chatango-embed').style = "border:0; width:100%; height:100%;margin-left:5px;";
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
    document.getElementById('chatango-embed').style = "";
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
