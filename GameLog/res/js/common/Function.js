var global_NoLicense    = "noData",
global_LangCookie       = 'Lang_Cookie',
global_Domain = 'http://localhost:15694/Web_Admin/',
global_Error500         = "ERROR_500";

function LangSelect(a) {
    switch (a) {
        case "en":
            window.location.href = global_Domain + "Login.aspx";
            break;
        case "cn":
            window.location.href = global_Domain + "cn/Login.aspx";
            break;
        case "thai":
            window.location.href = global_Domain + "thai/Login.aspx";
            break;
        case "vie":
            window.location.href = global_Domain + "vie/Login.aspx";
            break;
        case "korea":
            window.location.href = global_Domain + "korea/Login.aspx";
            break;                                                
        default:
            //window.location.href = "http://localhost:15694/Web_Admin/" + a + "/Login.aspx";
            web_tips("coming soon...");
            break;
    }
}

var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息  
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad  
            webApp: u.indexOf('Safari') == -1//是否web应该程序，没有头部与底部  
        };
    } (),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function SelectLang(a,b) {    
    var _langValue;
    $.cookie(global_LangCookie, '', { expires: -1 });
    $.cookie(global_LangCookie, a, { expires: 7 });
    _langValue = $.cookie(global_LangCookie);
    CheckLang(_langValue);
    parent.location.href = b + rand();
}

//计算总页数,_total:总数量,_pageSize:每页多少
function numPages(_total, _pageSize) {
    return Math.ceil(_total / _pageSize);
}

//防止URL注入
function CheckURL_Injection() {
    var sUrl = window.location.search.toLowerCase();
    var sQuery = sUrl.substring(sUrl.indexOf("=") + 1);
    //alert(sUrl);
    re = /select|update|delete|truncate|join|union|exec|insert|drop|script|'|"|;|>|<|%/i;
    if (re.test(sQuery)) {
        window.location.href = sUrl.replace(sQuery, "");
    }
}

//防止SQL注入:txtName.Attributes.Add("onblur", "CheckInput_Injection(this)");//防止Sql脚本注入
// function CheckInput_Injection(oField)
// {
//     re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
//     if (re.test(oField.value))
//     {
//        //alert("请您不要在参数中输入特殊字符和SQL关键字！"); //注意中文乱码
//        oField.value = ";
//        oField.className="errInfo";
//        oField.focus();
//        return false;
//    }
// }

function onDeleteMonitorPlayer(obj, u, callback) {
    swal({
        title: "确定要删除?",
        text: u,
        type: "warning",
        showCancelButton: true,
        //confirmButtonColor: "#00a65a",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    },
function() {
    $.ajax({
        url: "../ashx/account/account.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: { "action": "DeleteMonitorPlayer", "userName": u, "CurDateTime": rand() },
        success: function(result) {
            if (result.success) {
                swal(result.msg, "", "success");
                callback();
            }
            else {
                swal(result.msg, "", "error");
            }
        }
    });
});
}


//检查当前语言
function CheckLang(_langValue) {    
    if (_langValue && typeof (_langValue) != "undefined" && _langValue != 0 && _langValue.length !== 0) {
        $.ajax({
            url: global_Domain + "ashx/lang/Lang.ashx",
            type: "post",
            dataType: "json",
            data: { "action": "SetLang_Cookie", "langValue": _langValue, "CurDateTime": rand() },
            success: function(result) {
            }
        });
    }  
}

var myDate = new Date();

//获取当前日期
function getCurrDate() {
    var str = myDate.format("yyyy-MM-dd");//myDate.toLocaleDateString();
    return str;
}

//本月第一天
function getFirstDay() {
    myDate.setDate(1);
    return (new XDate(myDate).toString('yyyy-MM-dd'));
}

//本月最后一天
function getLastDay() {
    var endDate = new Date(myDate);
    endDate.setMonth(myDate.getMonth() + 1);
    endDate.setDate(0);
    return (new XDate(endDate).toString('yyyy-MM-dd'));
}

//获取页面参数：name标识参数名
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//Dialog
function web_dialog(str_icon, str_title, str_content) 
{
    art.dialog({ icon: str_icon, title: str_title, time: 10, content: str_content, lock: true, fixed: true, drag: false });
    
}

function web_dialog(str_content) {    
    swal(str_content);
}

//Tips
function web_tips(str_message) {
    //art.dialog.tips(str_message, 3);
//    swal({
//    title: str_message,
//        text: "I will close in 3 seconds.",
//        timer: 3000,
//        showConfirmButton: false
    //    });
    swal(str_message);
}

//弹出窗口中嵌入其它页面
function web_open() {
    var url     = arguments[0];
    var _title = arguments[1] ? arguments[1] : 'GameLog';
    var _width = arguments[2] ? arguments[2] : 520;
    var _height = arguments[3] ? arguments[3] : 320;
    
    if (browser.versions.mobile) {
        if (!browser.versions.ios && browser.versions.android) {
            window.open(url, '', 'height=0,width=0,top=0,left=0,location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,titlebar=no,toolbar=no,directories=no');
        }
        else {
            art.dialog.open(url, { title: _title, width: _width, height: _height, fixed: true, lock: true, drag: true });
        }
    }
    else {
        art.dialog.open(url, { title: _title, width: _width, height: _height, fixed: true, lock: true, drag: true });
    }
}

//检查帐号
function checkUserName(a) {
    var b = /^([a-zA-Z0-9]{1}[a-zA-Z0-9_-]{6,16})+$/;
    return b.test(a);
}

//检查密码
function checkPassWord(a) {
    //var b = /^.{4,15}$/;
    //var b = /^[a-zA-Z0-9]{4,15}$/;
    //var b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,15}$/;
    var b = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])[0-9A-Za-z!)-_]{6,15}$/;
    return b.test(a);
}

//检查输入的分数+-
function checkNum(a) {
    var b = /^[+-]?\d*\.?\d{1,2}$/;            
    return b.test(a);
}

//检查输入的分数+
function checkAddNum(a) {
    var b = /^[+]?\d*\.?\d{1,2}$/;
    return b.test(a);
}

//检查是否登录
function CheckLogin() {
    jQuery.ajax({
        url: "../ashx/common/CheckLogin.ashx",
        type: "post",
        dataType: "json",
        data: { "action": "CheckLogin", "CurDateTime": rand() },
        success: function(result) {
            if (!result.success) {
                parent.location.href = "../Login.aspx";
            }
        }
    });
}

function LogOut() {
    swal({
        title: "Are you sign out?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00a65a",
        confirmButtonText: "Yes!",
        closeOnConfirm: false
    },
function() {
    $.ajax({
        url: "../ashx/login/Login.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: { "action": "logout", "rand": rand() },
        success: function(result) {
            if (result.success) {
                parent.location.href = "../Login.aspx";
            }
            else {
                //web_dialog("warning", "Msg", result.msg);
                parent.location.href = "../Login.aspx";
            }
        }
    });
});
}

//退出网页工具
function loginOut() {
//    if (confirm("Sign Out?")) {
//        jQuery.ajax({
//            url: "../ashx/login/Login.ashx",
//            type: "post",
//            dataType: "json",
//            data: { "action": "logout", "CurDateTime": getCurrDate() },            
//            success: function(result) {
//                if (result.success) {
//                    parent.location.href = "../Login.aspx";
//                }
//                else {
//                    web_dialog("warning", "Msg", result.msg);
//                }
//            }
//        })
//    }
    art.dialog({
        title: 'Msg',
        content: "Are you sign out?",
        time: 10,
        ok: function() {
            $.ajax({
                url: "../ashx/login/Login.ashx",
                type: "post",
                dataType: "json",
                cache: false,
                data: { "action": "logout", "rand": rand() },
                success: function(result) {
                    if (result.success) {
                        parent.location.href = "../Login.aspx";
                    }
                    else {
                        //web_dialog("warning", "Msg", result.msg);
                        parent.location.href = "../Login.aspx";
                    }
                }
            });
        },
        okVal: "OK",
        cancelVal: 'Cancel',
        lock: true,
        fixed: false,
        cancel: true
    });
}

//删除
//function onDelete(obj, u) {
//    art.dialog({
//        title: 'Msg',
//        content: "确定要对帐号：" + u + " 执行此操作吗?",
//        time: 10,
//        ok: function() {
//            $.ajax({
//                url: "../../ashx/account/account.ashx",
//                type: "post",
//                dataType: "json",
//                cache: false,
//                data: { "action": "delete", "user": u, "rand": rand() },
//                success: function(result) {
//                    if (result.success) {
//                        $(obj).parents("tr").remove();
//                        web_tips(result.msg);
//                    }
//                    else {
//                        if (global_NoLicense == result.msg) {
//                            parent.location.href = "../../Login.aspx";
//                        }
//                        else {
//                            web_dialog('error', 'Msg', result.msg);
//                        }
//                    }
//                }
//            });
//        },
//        cancelVal: '取消',
//        lock: true,
//        fixed: false,
//        cancel: true
//    });
//}

function onQuiteGame(obj, u)
{
web_tips("System maintenance...");
}

//踢出游戏
//function onQuiteGame2(obj, u) {
//    swal({
//        title: "Are you sure?",
//        text: u + " quite game",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#00a65a",
//        confirmButtonText: "Yes!",
//        closeOnConfirm: false
//    },
//function() {
//    $.ajax({
//        url: "../ashx/account/account.ashx",
//        type: "post",
//        dataType: "json",
//        cache: false,
//        data: { "action": "quiteGame", "user": u, "rand": rand() },
//        success: function(result) {
//            if (result.success) {
//                $(obj).text('quit game');
//                //web_tips(result.msg);
//                swal("Successful.", "", "success");
//            }
//            else {
//                $(obj).text('quit game');
//                if (global_NoLicense == result.msg) {
//                    parent.location.href = "../../Login.aspx";
//                }
//                else {
//                    //web_dialog('error', 'Msg', result.msg);
//                    //web_dialog(result.msg);
//                    swal(result.msg, "", "info");
//                }
//            }
//        },
//        beforeSend: function() {
//            $(obj).attr("disabled", "disabled").text("Waiting");
//        },
//        complete: function() {
//            $(obj).removeAttr("disabled");
//        }
//    });
//});
//}

//踢出游戏
function onQuiteGame1(obj, u) {
    art.dialog({
        title: u + ' quite game',
        content: "Are you sure?",
        time: 10,
        ok: function() {
            $.ajax({
                url: "../ashx/account/account.ashx",
                type: "post",
                dataType: "json",
                cache: false,
                data: { "action": "quiteGame", "user": u, "rand": rand() },
                success: function(result) {
                if (result.success) {
                        $(obj).text('quit game');                       
                        web_tips(result.msg);
                    }
                    else {
                        $(obj).text('quit game');
                        if (global_NoLicense == result.msg) {
                            parent.location.href = "../../Login.aspx";
                        }
                        else {
                            //web_dialog('error', 'Msg', result.msg);
                            web_dialog(result.msg);
                        }
                    }
                },
                beforeSend: function() {
                    $(obj).attr("disabled", "disabled").text("Waiting");
                },
                complete: function() {
                    $(obj).removeAttr("disabled");
                }
            });
        },
        okVal: "OK",
        cancelVal: 'Cancel',
        lock: true,
        fixed: false,        
        cancel: true
    });
}


//曲线
function onChat(obj, u,t) {
    window.location.href = "com_Chart.aspx?sid="+u+"&action="+t;
}

//统计
function onTotal(obj, u) {
    //web_tips("System maintenance.");
    var url = 'com_OnTotal.aspx?sid='+u;

    if (browser.versions.mobile) {
        if (!browser.versions.ios && browser.versions.android) {
            window.open(url, '', 'height=0,width=0,top=0,left=0,location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,titlebar=no,toolbar=no,directories=no');
        }
        else {
            art.dialog.open(url, { title: u+' account total', width: 300, height: 120, fixed: true, lock: true, drag: true });
        }
    }
    else {
        art.dialog.open(url, { title: u+' account total', width: 300, height: 120, fixed: true, lock: true, drag: true });
    }
}

//现场限额设定
function onSetLimitMoney(obj, u) {
    window.location.href = "../gameSetting/LiveGame_SettingLimitMoney.aspx?sid="+u;
}


//查账
function onReport(obj, u,t) {
    window.location.href = "com_QueryReport.aspx?sid="+u+"&action="+t;
}

//编辑帐号信息
function onEdit(obj, u) {
    window.location.href = "com_EditUser.aspx?sid="+u;
}

//上分记录
function onScoreLog(obj, u) {
    window.location.href = "com_SetScoreLog.aspx?sid="+u;
}


//查询玩家游戏记录
function onGameLog(obj, u) {
    window.location.href = "com_Log_PlayerBetLog.aspx?sid="+u;
    //web_tips("System under maintenance.");
}

//查询彩金记录
function onBonusLog(obj, u) {
    window.location.href = "com_BonusLog.aspx?sid="+u;
    //web_tips("System maintenance.");
}

//分数控制
function onScore(obj, u,t) {
    window.location.href = "com_SetScore.aspx?sid="+u+"&action="+t;
}

//解禁全部
function onEnableAll(obj, u, t) {
    var re = $(obj).text();
    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00a65a",
        confirmButtonText: "Yes!",
        closeOnConfirm: false
    },
function() {
    $.ajax({
        url: "../ashx/account/account.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: { "action": "EnableAll", "agent": u, "type": t, "rand": rand() },
        success: function(result) {
            if (result.success) {
                $(obj).text(re);
                if (1 == result.type) {
                    $("#tb_server tbody tr").find("button:eq(5)").removeClass().addClass("btn btn-danger btn-xs").text('enable');
                }
                if (2 == result.type) {
                    $("#tb_server tbody tr").find("button:eq(5)").removeClass().addClass("btn btn-warning btn-xs").text('disable');
                }
                //web_tips(result.msg);
                swal("Successful.", "", "success");
            }
            else {
                $(obj).text(re);
                if (global_NoLicense == result.msg) {
                    parent.location.href = "../Login.aspx";
                }
                else {
                    //web_dialog('error', 'Msg', result.msg);
                    //web_dialog(result.msg);
                    swal(result.msg, "", "info");
                }
            }
        },
        beforeSend: function() {
            $(obj).attr("disabled", "disabled").text("Waiting");
        },
        complete: function() {
            $(obj).removeAttr("disabled");
        }
    });
});
}

//解禁全部
function onEnableAll_1(obj, u, t) {
    var re = $(obj).text();
    art.dialog({
        title: 'Msg',
        content: "Are you sure?",
        time: 10,
        ok: function() {
            $.ajax({
                url: "../ashx/account/account.ashx",
                type: "post",
                dataType: "json",
                cache: false,
                data: { "action": "EnableAll", "agent": u,"type":t,"rand": rand() },
                success: function(result) {
                if (result.success) {
                        $(obj).text(re);
                        if (1 == result.type) {
                            $("#tb_server tbody tr").find("button:eq(6)").removeClass().addClass("btn btn-danger btn-xs").text('enable');                              
                        }
                        if (2 == result.type) {
                            $("#tb_server tbody tr").find("button:eq(6)").removeClass().addClass("btn btn-warning btn-xs").text('disable');                               
                        }
                        web_tips(result.msg);
                    }
                    else {
                        $(obj).text(re);
                        if (global_NoLicense == result.msg) {
                            parent.location.href = "../Login.aspx";
                        }
                        else {
                            //web_dialog('error', 'Msg', result.msg);
                            web_dialog(result.msg);
                        }
                    }
                },
                beforeSend: function() {
                    $(obj).attr("disabled", "disabled").text("Waiting");
                },
                complete: function() {
                    $(obj).removeAttr("disabled");
                }
            });
        },
        okVal: "OK",
        cancelVal: 'Cancel',
        lock: true,
        fixed: false,
        cancel: true
    });
}

//禁用帐号
function onDisable(obj, u) {
    var rem_text = $(obj).text();
    swal({
        title: "Are you sure?",
        text: rem_text + " " + u,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00a65a",
        confirmButtonText: "Yes!",
        closeOnConfirm: false
    },
function() {
    $.ajax({
        url: "../ashx/account/account.ashx",
        type: "post",
        dataType: "json",
        cache: false,
        data: { "action": "disable", "user": u, "rand": rand() },
        success: function(result) {
            if (result.success) {
                if (1 == result.type) {
                    $(obj).removeClass().addClass("btn btn-danger btn-xs").text('enable');
                }
                if (2 == result.type) {
                    $(obj).removeClass().addClass("btn btn-warning btn-xs").text('disable');
                }
                //web_tips(result.msg);
                swal("Successful.", "", "success");
            }
            else {
                if (global_NoLicense == result.msg) {
                    parent.location.href = "../Login.aspx";
                }
                else {
                    //web_dialog('error', 'Msg', result.msg);
                    //web_dialog(result.msg);
                    swal(result.msg, "", "info");
                }
            }
        },
        beforeSend: function() {
            web_tips("Please waiting .....");
            $(obj).attr("disabled", "disabled").text("Waiting");
        },
        complete: function() {
            $(obj).removeAttr("disabled");
        }
    });
});
}

//禁用帐号
function onDisable_1(obj, u) {
    var rem_text = $(obj).text();
    art.dialog({
        title: rem_text + ' ' + u,
        content: "Are you sure?",
        time: 10,
        ok: function() {
            $.ajax({
                url: "../ashx/account/account.ashx",
                type: "post",
                dataType: "json",
                cache: false,
                data: { "action": "disable", "user": u, "rand": rand() },
                success: function(result) {
                    if (result.success) {
                        if (1 == result.type) {
                            $(obj).removeClass().addClass("btn btn-danger btn-xs").text('enable');                            
                        }
                        if (2 == result.type) {
                            $(obj).removeClass().addClass("btn btn-warning btn-xs").text('disable');                            
                        }
                        web_tips(result.msg);
                    }
                    else {
                        if (global_NoLicense == result.msg) {
                            parent.location.href = "../Login.aspx";
                        }
                        else {
                            //web_dialog('error', 'Msg', result.msg);
                            web_dialog(result.msg);
                        }
                    }
                },
                beforeSend: function() {
                    $(obj).attr("disabled", "disabled").text("Waiting");
                },
                complete: function() {
                    $(obj).removeAttr("disabled");
                }
            });
        },
        okVal: "OK",
        cancelVal: 'Cancel',
        lock: true,
        fixed: false,
        cancel: true
    });
}

//清除字串中的所有空格
function ClearAllSpace(str) {    
    var a = str.replace(/[ ]/g, "");
    return a;
}

rnd.today = new Date();
rnd.seed = rnd.today.getTime();
function rnd() {
    rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
    return rnd.seed / (233280.0);
}

//随机数
function rand() {
    return Math.ceil(rnd() * 10000000);
}



//绘制游戏曲线 - line
function drawChart_Line(data, num) {
    //曲线高度
    var chart_H = 400;
    var myData = data;
    var myChart = new JSChart('graph', 'line');
    myChart.setDataArray(myData);
    myChart.setTitle('GameBet Total ReportChart');
    myChart.setTitleColor('#383838');
    myChart.setTitleFontSize(14);
    myChart.setAxisNameX('');
    myChart.setAxisNameY('');
    myChart.setAxisColor('#38a4d9');
    myChart.setGridColor('#38a4d9');
    myChart.setAxisValuesColor('#38a4d9');
    myChart.setAxisPaddingLeft(60);
    myChart.setAxisPaddingRight(20);
    myChart.setAxisPaddingTop(60);
    myChart.setAxisPaddingBottom(20);
    myChart.setAxisValuesNumberX(num);
    myChart.setAxisValuesNumberY(10);
    myChart.setTextPaddingBottom(12);
    myChart.setTextPaddingLeft(200);
    myChart.setGraphExtend(false);
    myChart.setLineWidth(2);
    myChart.setLineColor('#C71112');
    myChart.setAxisValuesDecimals(0);
    //myChart.setSize(1500, chart_H);

    if (num > 1 && num <= 10) {
        myChart.setSize(500, chart_H);
    }

    if (num > 10 && num <= 20) {
        myChart.setSize(800, chart_H);
    }

    if (num > 20 && num <= 31) {
        myChart.setSize(1000, chart_H);
    }
       
    myChart.draw();
}

////绘制游戏曲线 - Bar
function drawChart_Bar() {
    //曲线高度
    var chart_H = 600;
    //var myData = data;
    //var _title = title;
    //var _showValue = showValue;
    
    var myData  = arguments[0];
    var num     = arguments[1];
    var _title  = arguments[2] ? arguments[2] : 'GameBet Total ReportChart';
    var _showValue = arguments[3] ? arguments[3] : false;
    
    var myChart = new JSChart('graph', 'bar');
    myChart.setDataArray(myData);
    myChart.setTitle(_title);
    myChart.setTitleColor('#383838');
    myChart.setTitleFontSize(14);
    myChart.setBarColor('#FF7F00');
    myChart.setBarOpacity(0.8);
    myChart.setBarBorderColor('#D9EDF7');
    myChart.setBarValues(_showValue);
    myChart.setAxisNameFontSize(14);
    myChart.setAxisWidth(1);
    myChart.setTextPaddingLeft(2);
    myChart.setBarBorderWidth(0);
    myChart.setAxisColor('#777E81');
    myChart.setAxisValuesColor('#777E81');
    myChart.setAxisValuesNumberY(15);    
    myChart.setAxisNameX('');
    myChart.setAxisNameY('');
    myChart.setAxisPaddingBottom(20);
    myChart.setTextPaddingBottom(12);
    myChart.setAxisPaddingRight(20);
    myChart.setAxisValuesNumberX(num);
    myChart.setAxisPaddingLeft(80);
    myChart.setAxisValuesDecimals(0); //Y轴值保留的小数位数，比如：0 - 不保留小数位，2 - 保留两位小数

    if (num > 1 && num <= 50) {
        myChart.setSize(1350, chart_H);
    }

    if (num > 50 && num <= 70) {
        myChart.setSize(1600, chart_H);
    }

    if (num > 70 && num <= 90) {
        myChart.setSize(2200, chart_H);
    }

    if (num > 90) {
        myChart.setSize(5000, chart_H);
    }    
    myChart.draw();
}
