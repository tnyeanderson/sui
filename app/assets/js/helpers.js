Handlebars.registerHelper('cleanurl', function(url) {
    var cleanurl = url.replace(/.*:\/\//,'').split(/[?#]/);
    return new Handlebars.SafeString(cleanurl)
});
