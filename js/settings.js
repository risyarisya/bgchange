var Setting = {
    version: 1,
    enabled_list: {},
}

var Theme = {
    default:{
        name : 'default',
        bg_color : '#fff',
        font_color: '#000'
    },
    dark:{
        name : 'dark',
        bg_color : '#666',
        font_color: '#fff'
    },
}

function load_setting(callback) { 
    chrome.storage.sync.get('setting', function(obj) {
        if (obj.setting) {
            Setting = obj['setting'];
        }
        callback && typeof callback === 'function' && callback();
    });
}

function save_setting(callback) {
    chrome.storage.sync.set({'setting': Setting }, callback); 
}

