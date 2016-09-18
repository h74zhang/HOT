/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var wingroup = new jsWindow.windowGroup($('#windows_div'), {
    shadow: true,
    keep_windows_on_page: { top: true, bottom: true, left: true, right: true }
});

var text_content = ["","","","","",""];

var WindowId = ["0","0","0","0","0","0"];


var win_title = ["CCP-VM","CELL-VM","UE1-VM","UE2-VM","OAM","RAP"];
var log_index = [0,0,0,0,0,0];
var win_top = [60,170,280,390,500,610];
var win_left = 500;

$(document).ready(function() {
    $("#env_list").find(':button').on('click', function(){
        var btn=$(this);
        if(btn.hasClass("btn-success")) {
            btn.removeClass("btn-success");
            btn.addClass("btn-danger");

            if (btn.attr("col") == 1) {
                var vm_id = btn.attr("tabindex");

                var temp_id = wingroup.appendWindow({
                    theme: "plain",
                    title: "Log: <b>"+win_title[vm_id]+"</b>",
                    content: text_content[vm_id],
                    top:win_top[vm_id], left:win_left, width:600, height:105
                });
                WindowId[vm_id] = temp_id;
            };
        } else {
            btn.removeClass("btn-danger");
            btn.addClass("btn-success");
            if (btn.attr("col") == 1) {
                var vm_id = btn.attr("tabindex");
                var temp_id = WindowId[vm_id];

                wingroup.remove_window(temp_id);
                WindowId[vm_id] = "0";
                text_content[vm_id] = "";
            };
        }
    });

    setInterval(function() {
        WindowId.forEach(function(my_win_id) {
            if(my_win_id != "0") {
                my_index = WindowId.indexOf(my_win_id);

                $.get("/journal", {vm_name: win_title[my_index], log_id:log_index[my_index]})
		.done(function(result){
                    console.log(result);
                    if(result.length != 0) {
                        log_index[my_index] += result.length;
                    }
                });
            }
        });
    }, 5000);
});






