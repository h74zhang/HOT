/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var wingroup = new jsWindow.windowGroup($('#windows_div'), {
    shadow: true,
    keep_windows_on_page: { top: true, bottom: true, left: true, right: true }
});

var text_content = ""
var WindowId = [];
var increment = 20;
var win_top = 100;
var win_left = 200;


var ENV_2046_CCP_VM_Journal_status = 0;
var ENV_2046_CELL_VM_Journal_status = 0;
var ENV_2046_UE_VM_Journal_status = 0;
var ENV_2046_OAM_VM_Journal_status = 0;

var ENV_2046_CCP_VM_Journal_id = 0;
var ENV_2046_CELL_VM_Journal_id = 0;
var ENV_2046_UE_VM_Journal_id = 0;
var ENV_2046_OAM_VM_Journal_id = 0;

$(document).ready(function() {
    /*
    $("#updateme").click( function() {
        if(WindowId) {
            new_line = "<p>abcdefghijklmn</p>"
            wingroup.update_text(WindowId,new_line);
        }
    });
    */
    $("#ENV_2046_CCP_VM_Journal").click( function() {
        if(ENV_2046_CCP_VM_Journal_status == 0) {
            ENV_2046_CCP_VM_Journal_status = 1;

            ENV_2046_CCP_VM_Journal_id = wingroup.appendWindow({
                theme: "mac",
                title: "Log: <b>CCP-VM</b>",
                content: text_content,
                top:win_top, left:win_left, width:500, height:300
            });
            WindowId.push(ENV_2046_CCP_VM_Journal_id);

        }else {
            ENV_2046_CCP_VM_Journal_status = 0;
            wingroup.remove_window(ENV_2046_CCP_VM_Journal_id);
            ENV_2046_CCP_VM_Journal_id = 0;
        }
    });
    $("#closeme").click( function() {
        temp_array = WindowId;
        WindowId = [];
        win_top = 100;
        win_left = 200;
        temp_array.forEach(function(my_win_id) {
            wingroup.remove_window(my_win_id);
        });
    });

    setInterval(function() {
        WindowId.forEach(function(my_win_id) {
            var now = new Date();
            var new_line = "abcdefghijklmndfdfdfdfdfd  "+now.toISOString();
            wingroup.update_text(my_win_id,new_line);
        });
    }, 500);
});


