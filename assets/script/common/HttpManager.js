var HttpManager = {
    baseUrl: "http://api.bitbuluo.com/sanguo/",
    cookie:"",

    postEntry: function(api, data, handler) {
        var tarUrl = this.baseUrl + api + "/";
        this.sendPost(tarUrl, data, handler);
    },

    getEntry: function(api, data, handler) {
        var tarUrl = this.baseUrl + api + "/";
        this.sendGet(tarUrl, data, handler);
    },

    testPost: function(api, data, handler) {
        var tarUrl = "http://httpbin.org/post";
        this.sendPost(tarUrl, data, handler);
    },

    sendPost: function(url, data, handler) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                if (xhr.status >= 200 && xhr.status < 400)
                {
                    cc.log(xhr.responseText);
                    var response = JSON.parse(xhr.responseText);
                    var set_cookie = xhr.getResponseHeader('Content-Type');
                    if (set_cookie != null)
                    {
                        HttpManager.cookie = set_cookie;
                    }
                    handler(response);
                }
                else
                {
                    cc.log(xhr.status);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        xhr.send(data);
    },

    sendGet: function(url, data, handler) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                if (xhr.status >= 200 && xhr.status < 400)
                {
                    var response = JSON.parse(xhr.responseText);
                    var set_cookie = xhr.getResponseHeader('Content-Type');
                    if (set_cookie != null)
                    {
                        HttpManager.cookie = set_cookie;
                    }
                    handler(response);
                }
                else
                {
                    cc.log(xhr.status);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        xhr.send(data);
    }
};

module.exports = HttpManager;