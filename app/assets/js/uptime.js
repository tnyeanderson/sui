function uptimeDigest (apps) {
    if (Config.uptime_indicator.enabled === false) {
        return;
    }
    for (var i=0, len=apps.length; i<len; i++) {
        checkSiteStatus(apps[i]);
    }
}

const checkSiteStatus = async (app) => {
    fetch("http://localhost:8080/?url=" + app.url)
        .then(response => response.json())
        .then(function (result) {
            var status = (result.http_status == 200 || result.http_status == 401);
            updateUptimeStatus(app.name, status);
        })
        .catch(function (error) {
            // console.log("Error: " + error);
            updateUptimeStatus(app.name, false);
        });
}

function updateUptimeStatus (name, is_up) {
    for (const a of document.querySelectorAll("div.app-title")) {
        if (a.querySelector('.app-name').textContent.replace(String.fromCharCode(9679), '').toLowerCase() === name.toLowerCase()) {
            var uptime_indicator = a.querySelector('.app-uptime');
            
            uptime_indicator.classList.remove( (!is_up) ? "status-up" : "status-down");
            uptime_indicator.classList.add( (is_up) ? "status-up" : "status-down");
        }
    }
}

let uptimeDigestInterval = setInterval(function () {
    uptimeDigest(Config.data.apps);
}, Config.uptime_indicator.interval_secs * 1000);
