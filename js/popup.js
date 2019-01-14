var host = ''
function getHost(url) {
    var result = ''
    var host = /https?:\/\/([^/]+)\//.exec(url);
    if (host && host.length > 1) {
        result = host[1];
        if (result.startsWith('www.')) {
            return result.slice(4);
        } else {
            return result;
        }
    }
    return '';
}
function $(id) {
    return document.getElementById(id);
}
function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function status_handler() { 
    var list = Setting.enabled_list;
    var idx = $('theme').selectedIndex;
    var theme = $('theme').options[idx].value;
    if (this.checked) {
        if (!list[host]) {
            list[host] = theme;
        }
    } else {
        if (list[host]) {
            list.remove(host);
        }
    }

    Setting.enabled_list = list;
    save_setting(function(hoge) { console.log(hoge);});
}

function theme_handler() {
    if (!$('status').checked) {
        return;
    }
    var idx = this.selectedIndex;
    var theme = this.options[idx].value;
    if (Setting.enabled_list[host]) {
        Setting.enabled_list[host] = theme;
    }
    save_setting();
}

function init() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
        var url = tabs[0].url;
        host = getHost(url);
        if (host) {
            load_setting(function() {
                if (Setting.enabled_list[host]) {
                    $('status').checked = true;
                    $('theme').value= Setting.enabled_list[host];
                }
            });

            $('status').addEventListener('click', status_handler);
            $('theme').addEventListener('change', theme_handler);
        } else {
            console.log((host)?"ok":"ng");
            $('setting').style.display = 'none';
            $('error').style.display = 'block';
        }
    });
    chrome.storage.onChanged.addListener(load_setting);
}

init();


