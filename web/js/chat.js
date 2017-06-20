/**
 * Created by DingYiwei on 2017/6/19.
 */
var currentUserId;

$(function () {
    $("[data-toggle='popover']").popover();
    //currentUserId = $.cookie("accountid");
    loadRecentMessageList(currentUserId);
    loadFriendList(currentUserId);
});

// MessageList
// friendId, friendNickname, friendPhoto, lastTime, lastMessage, messageNumber
function loadRecentMessageList(userId) {
    /*$.getJSON("MessageListServlet", {uid: userId}, function (messageList) {
     var messageDiv = $("#messageList");
     messageDiv.clear();
     for (var message in messageList) {
     var lastMessage = message["lastMessage"];
     if (lastMessage.length > 22) {
     lastMessage = lastMessage.substr(0, 20) + "...";
     }
     var nickname = message["friendNickname"];
     if (nickname.length > 18) {
     nickname.length = 18;
     nickname += message["lastTime"];
     }
     messageDiv.append("<li class='list-group-item'>" +
     "<div class='row'>" +
     "<div class='col-xs-3'>" +
     "<img src='" + message["friendPhoto"] + "' class='img-circle' style='height: 30px; width: 30px;'></div>" +
     "<div class='col-xs-6'>" + message["friendNickname"] + "<br>" + lastMessage + "</div></div></li>");
     }
     });*/
    var tempMessages = [];
    var tempMessage1 = {};
    tempMessage1.friendId = "1233";
    tempMessage1["friendNickname"] = "abc";
    tempMessage1["friendPhoto"] = "../img/photo1.jpg";
    tempMessage1["lastTime"] = "13:00";
    tempMessage1["lastMessage"] = "hello";
    tempMessage1.messageNumber = 2;
    var tempMessage2 = tempMessage1;
    tempMessages[0] = tempMessage1;
    tempMessage2.lastMessage = "what does the fox say? dinglinglingling";
    tempMessages[1] = tempMessage2;
    var messageDiv = $("#messageList");
    messageDiv.empty();
    for (var i = 0; i < tempMessages.length; ++i) {
        var message = tempMessages[i];
        var lastMessage = message["lastMessage"];
        if (lastMessage.length > 24) {
            lastMessage = lastMessage.substr(0, 22) + "...";
        }
        var nickname = message["friendNickname"];
        nickname += message["lastTime"];

        messageDiv.append("<li id='message" + message.friendId + "' onclick='chatTo(this.id)' class='list-group-item' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
            "<div class='row'>" +
            "<div class='col-xs-2'>" +
            "<img src='" + message["friendPhoto"] + "' class='img-circle' style='height: 40px; width: 40px;'></div>" +
            "<div class='col-xs-10'>" +
            "<div class='row'>" +
            "<div class='col-xs-10'>" + message.friendNickname +
            "<div class='col-xs-2 pull-right'>" + message.lastTime +
            "</div>" +
            "<div class='row' style='margin-left: 0'>" + lastMessage +
            "<span class='badge pull-right' style='background: #900000'>" + message.messageNumber +
            "</span></div></div></div></li>");
    }
}

// FriendList
// id, nickname, photo, groupName
// TODO
function loadFriendList(userId) {
    $.getJSON("FriendListServlet", {uid: userId}, function (friendList) {
        var messageDiv = $("#messageList");
        messageDiv.clear();
        for (var friend in friendList) {
            messageDiv.append("<li class='list-group-item'>" +
                "<div class='row'>" +
                "<div class='col-xs-3'>" +
                "<img src='" + friend["photo"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
                "<div class='col-xs-6'>" + friend["nickname"] + "</div></div></li>");
        }
    });
    var messageDiv = $("#messageList");
    messageDiv.empty();
    var tempFriend = {};
    tempFriend.id = "123132";
    tempFriend.nickname = "alice";
    tempFriend.photo = "../img/photo1.jpg";
    var tempFriends = {};
    tempFriends["我的好友"] = [];
    tempFriends["我的好友"][0] = tempFriend;
    tempFriends["我的好友"][1] = tempFriend;
    tempFriends["我的好友"][2] = tempFriend;
    tempFriends["我的好友"][3] = tempFriend;
    tempFriends["我的好友"][4] = tempFriend;
    tempFriends["我的好友"][5] = tempFriend;
    tempFriends["不认识"] = [];
    tempFriends["不认识"][0] = tempFriend;
    tempFriends["不认识"][1] = tempFriend;
    tempFriends["不认识"][2] = tempFriend;
    tempFriends["同学"]=[];
    /*for (var friend in friendList) {
     messageDiv.append("<li class='list-group-item'>" +
     "<div class='row'>" +
     "<div class='col-xs-3'>" +
     "<img src='" + friend["photo"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
     "<div class='col-xs-6'>" + friend["nickname"] + "</div></div></li>");
     }*/
    var strToAppend = "";
    var groupCount = 0;
    for (var group in tempFriends) {
        strToAppend += "<div id='group'" + groupCount + " class='panel-group' style='margin: 0;'>" +
            "<div class='panel panel-default' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
            "<div class='panel-heading' style='background: transparent; color: white; border: none'>" +
            "<label data-toggle='collapse' data-parent='#group" + groupCount + "' href='#collapse" + groupCount + "'>" + group + "(" + tempFriends[group].length + ")</label>" +
            "</div>" +
            "<div id='collapse" + groupCount + "' class='panel-collapse collapse'>" +
            "<div class='panel-body' style='padding: 0; border: none;'>" +
            "<ul class='list-group' style='margin: 0'>";
        for (var i = 0; i < tempFriends[group].length; ++i) {
            var friend = tempFriends[group][i];
            strToAppend += "<li class='list-group-item' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
                "<div class='row'>" +
                "<div class='col-xs-3'>" +
                "<img src='" + friend.photo + "' class='img-circle' style='height: 30px; width: 30px;'>" +
                "</div>" +
                "<div class='col-xs-9'>" + friend.nickname +
                "</div>" +
                "</li>";
        }
        strToAppend += "</ul>" +
            "</div></div></div></div>";
        groupCount++;
    }
    messageDiv.append(strToAppend);
}

// FriendApply
// id, nickname, photo
function loadApplyList(userId) {
    $.getJSON("ApplyListServlet", {uid: userId}, function (applyList) {
        var messageDiv = $("#messageList");
        messageDiv.clear();
        for (var apply in applyList) {
            messageDiv.append("<li id='user" + apply["id"] + "' class='list-group-item' onclick='agree(this.id)'>" +
                "<div class='row' " +
                "<div class='col-xs-3'>" +
                "<img src='" + apply["photo"] + "' class='img-circle' style='height: 30px; width: 30px;'></div>" +
                "<div class='col-xs-6'>" + apply["nickname"] + "(" + apply["id"] + ")请求添加你为好友</div></li>");
        }
    });
}

function agree(applyUserId) {
    $.getJSON("AgreeServlet", {uid1: currentUserId, uid2: applyUserId}, function () {

    })
}

// Users
// photo, nickname, id
function searchUsers(searchContentId) {
    var userId = document.getElementById(searchContentId).value;
    $.getJSON("SearchUserServlet", {uid: userId}, function (userList) {
        var list = $("#searchList");
        list.clear();
        for (var user in userList) {
            list.append("<li class='list-group-item'>" +
                "<div class='row'>" +
                "<div class='col-xs-3'>" +
                "<img src='" + user["photo"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
                "<div class='col-xs-6'>" + user["nickname"] + "(" + user["id"] + ")" + "</div>" +
                "<span id='friend" + user["id"] + "' class='glyphicon glyphicon-send' onclick='addFriend(this.id)'></span>" +
                "</div></li>");
        }
    })
}

function addFriend(friendId) {
    var userId = friendId.substr("friend".length);
    $.getJSON("AddFriendServlet", {uid2: currentUserId, uid1: userId}, function () {
        var noticeBox = $("#notice.modal-body");
        noticeBox.clear();
        noticeBox.append("请求已发送");
        $("#notice").modal();
    });
}