Handlebars.registerHelper('cleanurl', function(url) {
    var cleanurl = url.replace(/.*:\/\//,'').split(/[?#]/);
    return new Handlebars.SafeString(cleanurl)
});


Handlebars.registerHelper('uptimedisabled', function() {
    if (Config.uptime_indicator.enabled === false) {
        return "disabled"
    }
});
