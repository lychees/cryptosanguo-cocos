require('CityData');

var PlayerData = {
    cities: [],
    heroes: [],

    getTotalHeroPower: function()
    {
        var ret = 0;
        if (PlayerData.heroes != null)
        {
            for (var i = 0, len = PlayerData.heroes.length;i < len;++i)
            {
                ret += PlayerData.heroes[i].score;
            }
        }

        return ret;
    },
};

module.exports = PlayerData;
