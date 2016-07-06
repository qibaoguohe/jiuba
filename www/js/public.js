//�����õ���function
function sid(id){return document.querySelector(id)}   //��ȡID ����document.getElement
function I(id,html){id.innerHTML=html}                   //�������
function href(url){window.location.href=url}             //��תҳ��
//function show(id){id.style.display='block'}
function hide(id){id.style.display='none'}              //����
function show(id){id.style.display='block'}             //��ʾ

var aj2 = {
    //��ȡurl����
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

    //class���
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

    //ajax���
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
                if(done){		//��ͨ�ı�
                    done(xhr.responseText, xhr.messageText);
                }
            }else if(dataType == 'XML'){
                if(done != null){		//����xml�ĵ�
                    done(xhr.responseXML);
                }
            }else if(dataType == 'JSON'){
                if(done != null){			//��json�ַ���ת��Ϊjs����
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
            type = conf.type? conf.type.toUpperCase(): 'GET',			//type����,��ѡ
            async = conf.async || true,
            url = conf.url,						//url����������
            data = self._params(conf.data),			//data������ѡ��ֻ����post����ʱ��Ҫ
            dataType = conf.dataType? conf.dataType.toUpperCase(): 'JSON',	//datatype������ѡ
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

        if(async) {	//�첽
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
/** ����Cookies */
//�������
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
//�������趨����ʱ���ʹ��ʾ����
//s20�Ǵ���20��
//h��ָСʱ����12Сʱ���ǣ�h12
//d��������30����d30
//ʾ��
//setCookie("name","hayden","s20");

/** ��ȡCookies */
//��ȡcookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return 'hhh';
}
//ʹ��ʾ��
//alert(getCookie("name"));
/** ���Cookies */
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
function getLocalTime(nS) {    //�޸�ʱ��
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/��|��/g, "-").replace(/��/g, " ");
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