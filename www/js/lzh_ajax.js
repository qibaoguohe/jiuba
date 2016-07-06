function G(id) { return document.querySelector(id); }	//get
function GA(id){ return document.querySelectorAll(id); }
function T(obj, test) { obj.innerHTML = test; }		//test
function S(obj) { obj.style.display = 'block'; }		//show
function H(obj) { obj.style.display = 'none'; }		//hide
function J(href) { window.location.href = href; }		//jump
function A(obj, attr) { return obj.getAttribute(attr); }	//attr
function chuFa() { //html元素事件触发的函数
 //json=this.json;
    var res='';
    var rest='';
    var xmlhttp;
    var txt,x,i;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var data={
        'name':'祝丹'
    }
    var urlEncode = function (param, key, encode) {
        if(param==null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    };
    data=urlEncode(data);
    var   url= "http://py.cmshop.net/tPyshZuoweiController.do?getzuoweibyname"+data;//路径
////	var url = "http://61.28.112.242:8180/tvshop/article/search/tv.api";
    //console.log(url);
    xmlhttp.open("GET",url,true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
             rest = xmlhttp.responseText;
            res = eval("(" + rest + ")");
            console.log(res);
            //return res
        }
    }
return '123'
    //console.log(res);
}


function myAjax(type, url, data, callback1, callback2, isAsync) {
    var async = (typeof isAsync != 'undefined')? isAsync: true;
    aj2.ajax({
        async: async,
        type: type,
        url: url,
        data: data,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(json) {
            if(callback1 != '') { callback1(json); }
        },
        error: function(XMLHttpRequest,textStatus,errorThrown) {
            if(callback2 != '') { callback2(XMLHttpRequest,textStatus,errorThrown); }
        }
    });
}
//var rurl = 'http://py.cmshop.net/tPyshZuoweiController.do?getzuoweibyname';
//var rurl = 'http://61.28.112.242:8180/tvshop/';
//var rurl='http://zhq001.oicp.net:14729/Yigou/index.php';
//var rurl='http://wxt.mingrenyl.com/swagger.php';
//var rurl='http://wxt.mingrenyl.com/index.php';
//var rurl='http://gdsc.cmshop.net/xapi/index.php';
var rurl='http://gdsc.cmshop.net/xapi/index.php';

var furl='http://120.76.79.171/';
setCookie('furl',furl,'d30');
setCookie('rurl',rurl,'d30');
var goodsAPI = {
    getCategoryAPI: function(callback1, callback2, isAsync) {
        var url = rurl;
        var data={
            'name':'祝丹'
        }
        myAjax('GET', url, data, callback1, callback2, isAsync);
    }

}



var message={           //统计数据
    index: function(data, callback1, callback2, isAsync) {    //访问记录
        var url = 'http://10.50.17.3:8080/tvshop/customer/data.api';
        myAjax('GET', url, data, callback1, callback2, isAsync);
    },
    user: function(data, callback1, callback2, isAsync) {     //添加用户
        var url = 'http://10.50.17.3:8080/tvshop/customer/customer.api';
        myAjax('POST', url, data, callback1, callback2, isAsync);
    },
    search: function(data, callback1, callback2, isAsync) {     //查询是否有这个用户，以及根据日期查询访问用户
        var url = 'http://10.50.17.3:8080/tvshop/customer/search.api';
        myAjax('GET', url, data, callback1, callback2, isAsync);
    },
    usersearch: function(data, callback1, callback2, isAsync) {    //查询某个用户的访问记录
        var url = 'http://10.50.17.3:8080/tvshop/customer/data/search.api';
        myAjax('GET', url, data, callback1, callback2, isAsync);
    }
}
var ygwx={   //移购微信接口
    category: function(data, callback1, callback2, isAsync) {    //访问记录
        //var url = rurl+'yg/category/search.api';
        var url = rurl+'goods/category/search.api';
        myAjax('POST', url, data, callback1, callback2, isAsync);
    }
    //getCategoryAPI: function(data, callback1, callback2, isAsync) {
    //    var url = rurl+'goods/category/search.api';
    //    myAjax('GET', url, data, callback1, callback2, isAsync);
    //}
};

var yg={
    register:function(data, callback1, callback2, isAsync) {    //注册
        var url = rurl+'/User/register';
        myAjax('POST', url, data, callback1, callback2, isAsync);
    },
    Category:function(data, callback1, callback2, isAsync) {    //分类列表

        var url = rurl+'/Category/queryCategoryList';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    findAllGoods:function(data, callback1, callback2, isAsync) {    //查询一级分类下的所有商品
        var url = rurl+'/Category/findGoods';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    Categorylist:function(data, callback1, callback2, isAsync) {    //二级分类列表
        var url = rurl+'/Category/findCategoryGoods';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    goods_xq:function(data, callback1, callback2, isAsync) {    //商品详情
        var url = rurl+'/Goods/queryId';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    goods_list:function(data, callback1, callback2, isAsync) {    //商品列表
        var url = rurl+'/Goods/queryCategory';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    goods_gl:function(data, callback1, callback2, isAsync) {    //相关产品
        var url = rurl+'/Goods/findGoodsLink';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
   order_list:function(data, callback1, callback2, isAsync) {    //订单列表
            var url = rurl+'/Order/queryUserOrderList';
            myAjax('get', url, data, callback1, callback2, isAsync);
     },
    addCart:function(data, callback1, callback2, isAsync) {    //添加商品到购物车
    var url = rurl+'/Cart/addCart';
    myAjax('get', url, data, callback1, callback2, isAsync);
       },
    queryCart:function(data, callback1, callback2, isAsync) {    //查询购物车
    var url = rurl+'/Cart/queryCart';
    myAjax('get', url, data, callback1, callback2, isAsync);
    },
     deleteGoods:function(data, callback1, callback2, isAsync) {    //删除购物车内商品
    var url = rurl+'/Cart/deleteGoods';
    myAjax('get', url, data, callback1, callback2, isAsync);
    },
    homePage:function(data, callback1, callback2, isAsync) {    //首页广告轮播图
    var url = rurl+'/Ad/homePage';
    myAjax('get', url, data, callback1, callback2, isAsync);
    },

    homePagePostionOne:function(data, callback1, callback2, isAsync) {    //首页广告图
    var url = rurl+'/Ad/homePagePostionOne';
    myAjax('get', url, data, callback1, callback2, isAsync);
},
    findSec:function(data, callback1, callback2, isAsync) {    //秒抢
        var url = rurl+'/Topic/findSec';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
   findFood:function(data, callback1, callback2, isAsync) {    //品牌食品
    var url = rurl+'/Topic/findSec';
    myAjax('get', url, data, callback1, callback2, isAsync);
  },
    findHaigou:function(data, callback1, callback2, isAsync) {    //国际海购
        var url = rurl+'/Topic/findHaigou';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    findTeam:function(data, callback1, callback2, isAsync) {    //国际团购
        var url = rurl+'/Topic/findTeam';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    findactive:function(data, callback1, callback2, isAsync) {    //优惠活动
        var url = rurl+'/Topic/findSale';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
    findSale:function(data, callback1, callback2, isAsync) {    //所有食品
    var url = rurl+'/Topic/findFood';
    myAjax('get', url, data, callback1, callback2, isAsync);
   },
  addAddress:function(data, callback1, callback2, isAsync) {    //添加收货地址
    var url = rurl+'/User/addAddress';
    myAjax('post', url, data, callback1, callback2, isAsync);
  },
   getAddress:function(data, callback1, callback2, isAsync) {    //获取收货地址
    var url = rurl+'/User/getAddress';
    myAjax('get', url, data, callback1, callback2, isAsync);
 },
  updateAddress:function(data, callback1, callback2, isAsync) {    //更新收货地址
    var url = rurl+'/User/updateAddress';
    myAjax('post', url, data, callback1, callback2, isAsync);
},
  deleteAddress:function(data, callback1, callback2, isAsync) {    //更新收货地址
    var url = rurl+'/User/deleteAddress';
    myAjax('get', url, data, callback1, callback2, isAsync);
},
    createOrder:function(data, callback1, callback2, isAsync) {    //创建订单
    var url = rurl+'/Order/createOrder';
    myAjax('post', url, data, callback1, callback2, isAsync);
  },
   queryHotKeyword:function(data, callback1, callback2, isAsync) {    //热门搜索关键词
    var url = rurl+'/Goods/queryHotKeyword';
    myAjax('get', url, data, callback1, callback2, isAsync);
   },
  queryKeyword:function(data, callback1, callback2, isAsync) {    //根据关键字搜索
    var url = rurl+'/Goods/queryKeyword';
    myAjax('get', url, data, callback1, callback2, isAsync);
  },
   queryUserOrderList:function(data, callback1, callback2, isAsync) {    //获取订单列表
    var url = rurl+'/Order/queryUserOrderList';
    myAjax('get', url, data, callback1, callback2, isAsync);
  },
   queryOrderSn:function(data, callback1, callback2, isAsync) {    //根据订单号码sn获取订单详情
        var url = rurl+'/Order/queryOrderSn';
        myAjax('get', url, data, callback1, callback2, isAsync);
    },
  findBeautiful:function(data, callback1, callback2, isAsync) {    //美容养生
    var url = rurl+'/Topic/findBeautiful';
    myAjax('get', url, data, callback1, callback2, isAsync);
  },
  findToday:function(data, callback1, callback2, isAsync) {    //美容养生
    var url = rurl+'/Topic/findToday';
    myAjax('get', url, data, callback1, callback2, isAsync);
}
}
