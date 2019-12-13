class Adjuzsdk {
    constructor(props) {
        // 游戏参数：gameid、gamename、gametype
        this.gameObj = this.getParams();
        // 广告平台id
        this.AdvertiserId = '';
        // 广告类型
        this.adType = '';
    }
    /*  原生交互  */
    // WebViewJavascriptBridge初始化
    init(callback) {
        // 安卓
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false);
        }
        // IOS
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        let wvjbIframe = document.createElement('iframe');
        wvjbIframe.style.display = 'none';
        wvjbIframe.src = 'https://__bridge_loaded__';
        document.body.appendChild(wvjbIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    // js调用原生
    callHandler(name, data, callback) {
        this.init(function(bridge) {
            bridge.callHandler(name, data, function(result) {
                callback(JSON.parse(result));
            });
        });
    }
    // 原生调用js
    registerHandler(bridge) {
        this.init(function(bridge) {
            bridge.registerHandler(name, data, function(result) {
                callback(JSON.parse(result));
            })
        })
    }
    // 初始化游戏账户桥
    initAccountBridge(callback) {
        this.callHandler('initAccount', callback);
    }
    // 打开游戏桥
    openGameCallbackBridge(obj, callback) {
        this.callHandler('OpenGameCallback', obj, callback);
    }
    // 开启广告桥
    openAdBridge(obj, callback) {
        this.callHandler('openAd', obj, callback);
    }
    // 退出游戏桥
    exitGameCallbackBridge(obj, callback) {
        this.callHandler('exitGameCallback', obj, callback);
    }

    /*  服务器交互  */
    // 调用接口获取有效广告平台
    getAdvertiserInfo(callback) {
        let data = {
            adType: this.adType
        };
        this.http({
            url: '/api/gamesdk/getAdvertiserInfo.html',
            data: data,
            type: 'POST',
            success: function(res) {
                console.log(res)
                callback(res)
            },
            error: function(res) {
                console.log(res)
                callback(res)
            }
        })
    }
    // 记录游戏入口点击
    opengame(data) {
        this.http({
            url: '/api/gamesdk/opengame.html',
            data: data,
            type: 'POST',
            success: function(res) {
                console.log(res)
            },
            error: function(res) {
                console.log(res)
            }
        })
    }
    // 记录入口点击
    clickad(data, callback) {
        let _this = this;
        this.getAdvertiserInfo(function(res1) {
            let resData = JSON.parse(res1)
            _this.AdvertiserId = resData.code === '00' ? resData.data.AdvertiserId : '';
            data.AdvertiserId = _this.AdvertiserId;
            _this.http({
                url: '/api/gamesdk/clickad.html',
                data: data,
                type: 'POST',
                success: function(res) {
                    console.log(res)
                },
                error: function(res) {
                    console.log(res)
                }
            })
            callback(resData)
        })
    }
    // 退出游戏日志记录
    exitgame(data) {
        // 记录入口点击
        this.http({
            url: '/api/gamesdk/exitgame.html',
            data: data,
            type: 'POST',
            success: function(res) {
                console.log(res)
            },
            error: function(res) {
                console.log(res)
            }
        })
    }

    /*  游戏交互  */
    // 初始化游戏账户
    jsInitAccount() {
        console.log(this.gameObj.gameid, this.gameObj.gamename, this.gameObj.gametype)
        this.initAccountBridge(function() {
            this.getData(res, 'initAccount')
        })
    }
    // 打开游戏
    jsOpenGame() {
        let data = {
            time: (new Date()).getTime(),
            gameId: this.gameObj.gameid,
            gameAccountId: this.gameAccountId
        };
        // 记录游戏入口点击
        this.opengame(data)
        // 播放参数
        let obj = {
            gameId: this.gameObj.gameid,
            gameName: this.gameObj.gamename,
            gameAccountid: this.gameAccountId,
            gameType: this.gameObj.gametype
        }
        this.openGameCallbackBridge(obj, function() {
            this.getData(res, 'openGame')
        })
    }
    // 开启广告
    jsOpenAD(adType) {
        this.adType = adType;
        let data = {
            time: (new Date()).getTime(),
            gameId: this.gameObj.gameid,
            gameAccountId: this.gameAccountId,
            adType: this.adType
        }
        let _this = this;
        // 记录广告入口点击
        this.clickad(data, function(res) {
            // 播放参数
            let obj = {
                gameId: _this.gameObj.gameid,
                gameName: _this.gameObj.gamename,
                gameAccountid: _this.gameAccountId,
                gameType: _this.gameObj.gametype,
                adType: _this.adType,
                AdvertiserId: _this.AdvertiserId
            }
            _this.openAdBridge(obj, function() {
                _this.getData(res, 'openAd')
            })
        })
    }
    // 退出游戏
    jsExitGame() {
        let data = {
            time: (new Date()).getTime(),
            gameId: this.gameObj.gameid,
            gameAccountId: this.gameAccountId,
        }
        // 记录推出数据
        this.exitgame(data)
        // 退出参数
        let obj = {
            gameId: this.gameObj.gameid,
            gameName: this.gameObj.gamename,
            gameAccountid: this.gameAccountId,
            gameType: this.gameObj.gametype
        }
        // 原生方法退出，埋入函数
        window.gameEnv = function() {
		    return true
		}
        this.exitGameCallbackBridge(obj, function() {
            this.getData(res, 'exitgame')
        })
    }
    // 返回游戏中心
    jsGohome() {
        let data = {
            time: (new Date()).getTime(),
            gameId: this.gameObj.gameid,
            gameAccountId: this.gameAccountId,
        }
        // 记录推出数据
        this.exitgame(data)
    }
    // 获取原生回传数据
    getData(data, name) {
        if (name === 'initAccount') {
            this.gameAccountId = data.accountId
        }
        console.log(data)
    }
    // 获取广告播放状态回传
    jsOpenAdCallback(data) {
        console.log(data)
    }

    /* 公共方法 */
    // xmlHttpRequest请求
    http(obj) {
        let xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        let urlData = this.formatParams(obj.data);
        let headers = obj.headers || { "Content-Type": "application/x-www-form-urlencoded" };
        // https://gamesdk.adjuz.net
        var url = 'http://gamesdk.adjuz.com' + obj.url;
        if (obj.type === 'GET') {
            xhr.open(obj.type, url + '?' + urlData, true);
            this.setHeaders(xhr, headers);
            xhr.send(null);
        } else {
            xhr.open(obj.type, url, true);
            this.setHeaders(xhr, headers);
            xhr.send(JSON.stringify(obj.data));
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                let status = xhr.status;
                if (status >= 200 && status < 300) {
                    let response = '';
                    let type = xhr.getResponseHeader('Content-Type');
                    if (type.indexOf('xml') !== -1 && xhr.responseXML) {
                        response = xhr.responseXML;
                    } else if (type.indexOf('application/json') !== -1) {
                        response = JSON.parse(xhr.responseText);
                    } else {
                        response = xhr.responseText;
                    }
                    obj.success && obj.success(response);
                } else {
                    obj.error && obj.error(status);
                }
            }
        }
    }
    //生成随机数
    random() {
        return Math.floor(Math.random() * 10000 + 500);
    }
    // 设置请求头
    setHeaders(xhr, headers) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    // 获取url参数
    getParams() {
        let paramList = null,
            paramObj = {};
        if (window.location.search) {
            paramList = window.location.search.split('&');
            for (let i = 0; i < paramList.length; i++) {
                let item = paramList[i].split('=');
                paramObj[item[0]] = item[1];
            }
        }
        return paramObj;
    }
    // 格式化get请求参数
    formatParams(data) {
        let arr = [];
        for (let key in data) {
            arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        // 添加随机数，防止缓存
        arr.push('v=' + this.random());
        return arr.join('&');
    }
}