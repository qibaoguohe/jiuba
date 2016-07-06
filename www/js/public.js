//经常用到的function
function sid(id){return document.querySelector(id)}   //获取ID 等于document.getElement
function I(id,html){id.innerHTML=html}                   //填充内容
function href(url){window.location.href=url}             //跳转页面
//function show(id){id.style.display='block'}
function hide(id){id.style.display='none'}              //隐藏
function show(id){id.style.display='block'}             //显示

var aj2 = {
    //获取url参数
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

    //class相关
    hasClass: function(id, cls) {
        return G(id).className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass: function(id, cls) {
        if(!this.hasClass(id, cls))
            G(id).className += ' ' + cls;
    },
    removeClass: function(id, cls) {
        if(this.hasClass(id, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            G(id).className = G(id).className.replace(reg, '');
        }
    },

    //ajax相关
    _createAjax: function(){
        if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
        return null;
    },
    _params: function(data) {
        var arr = [];
        for(var i in data){
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
        }
        return arr.join("&");
    },
    _ajax_callBack: function(xhr, dataType, done, fail) {
        if(xhr.status == 200){
            if(dataType == 'TEXT'){
                if(done){		//普通文本
                    done(xhr.responseText, xhr.messageText);
                }
            }else if(dataType == 'XML'){
                if(done != null){		//接收xml文档
                    done(xhr.responseXML);
                }
            }else if(dataType == 'JSON'){
                if(done != null){			//将json字符串转换为js对象
                    done(eval("("+xhr.responseText+")"));
                }
            }
        }else{
            if(fail) {
                fail(xhr.status, xhr.statusText);
            }
        }
    },
    ajax: function(conf){
        var self = this,
            type = conf.type? conf.type.toUpperCase(): 'GET',			//type参数,可选
            async = conf.async || true,
            url = conf.url,						//url参数，必填
            data = self._params(conf.data),			//data参数可选，只有在post请求时需要
            dataType = conf.dataType? conf.dataType.toUpperCase(): 'JSON',	//datatype参数可选
            success = conf.success,
            error = conf.error,
            xhr = self._createAjax();

        if(type === 'GET') {
            url += url.indexOf('?') < 0? '?'+data: '&'+data;
        }

        xhr.open(type, url, async);
        if(type == 'GET'){
            xhr.send(null);
        }
        else if(type == 'POST'){
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }

        if(async) {	//异步
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    self._ajax_callBack(xhr, dataType, success, error);
                }
            }
        }
        else {
            self._ajax_callBack(xhr, dataType, success, error);
        }
    }}


//var Cookies = {};
/** 设置Cookies */
//程序代码
function setCookie(name,value,time)
{
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str)
{
    //alert(str);
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s")
    {
        return str1*1000;
    }
    else if (str2=="h")
    {
        return str1*60*60*1000;
    }
    else if (str2=="d")
    {
        return str1*24*60*60*1000;
    }
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//示例
//setCookie("name","hayden","s20");

/** 读取Cookies */
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return 'hhh';
}
//使用示例
//alert(getCookie("name"));
/** 清除Cookies */
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


function pubuliu(l_class,l_img){
    var x=$(l_img);
    //console.log("123");
    var y=$(l_class);
    for(var i=0;i< y.length;i++){
        var width2=$(y[i]).width();
        $(y[i]).css('height',width2);
    }

    $(x).each(function (index, element) {
        var z=$(l_class).width();

        var img=new Image();
        img.src=$(element).attr('src');
        $(img).load(function(){
            var width =img.width;

            var height=img.height;
            if(width<z||height<z){
                $(element).css("position","absolute");
                $(element).css("width","100%");
                $(element).css("height",z);
                $(element).css("top","0");
                $(element).css("left","0");
            }
            else if(height<width){

                var bili=z/height;
                var left=(width-height)/2*bili;
                //console.log(left);
                $(element).css("position","absolute");
                $(element).css("width",width*bili);
                $(element).css("height",height*bili);
                $(element).css("top","0");
                $(element).css("left",-left);
                $(element).css("clip","rect(0px "+(z+left)+"px "+z+"px "+left+"px)");
            }

        });
    });
}
function getLocalTime(nS) {    //修改时间
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

$(document).ready(function(){
    $('#sr_btn').click(function(){
        var sr_val=$('#sr_val').val();
        console.log(sr_val);
        if(sr_val==''){
            return;
        }
        else{
            window.location.href='product_liebiao3.html?id='+sr_val;
        }
    });
    $('.public_refresh').click(function(){
        location.reload();
    })

});