function switch_style ( css_title )
{
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      }
    }
    setStyleCookie(css_title);
  }
}

//Switches colors of site to another CSS file, decided by the dropdown menu "styleSwap"
function style_swap(){
    var style_type = document.getElementById('styleSwap').value;
    document.getElementById('styleSwap').name = style_type;
    switch_style(style_type);
    setStyleCookie(style_type);
    reloadChat();
 }

function setStyleCookie(styleName) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "style" + "=" + styleName + "; " + expires;
}

function getStyleCookie() {
    var name = "style" + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function set_style_from_cookie() {
    if(getStyleCookie() != null && getStyleCookie() != ""){
        var cstylename=getStyleCookie();
        switch_style(cstylename);
    }
}
