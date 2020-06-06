Handlebars.registerHelper('cleanurl', function(url) {
    var cleanurl = url.replace(/.*:\/\//,'').split(/[?#]/);
    return new Handlebars.SafeString(cleanurl)
});

Handlebars.registerHelper('addprotocol', function(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return new Handlebars.SafeString(url)
});

