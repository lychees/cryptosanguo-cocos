var HttpManager = require('HttpManager');

var HttpAction = {
    login: function(addr, handler)
    {
        var data = 'address=' + addr;
        HttpManager.postEntry('login', data, handler);
    },

    get_my_hero: function(handler)
    {
        var data = "";
        HttpManager.postEntry('get_my_hero', data, handler);
    },

    refreshInfo: function(handler)
    {
        var data = "";
        HttpManager.getEntry('map_info', data, handler);
    },

    attack: function(fromCity, tarCity, soldier, handler)
    {
        var data = "";
        data += "city_id=" + fromCity + "&";
        data += "target_city_id=" + tarCity + "&";
        data += "soldier=" + soldier;
        HttpManager.postEntry('attack', data, handler);
    },
}

module.exports = HttpAction;