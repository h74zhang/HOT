/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var user_id = "test";
var env_id = "1234";

var win_title = [["VM-Journal","VM-AppLog","VM-CP","VM-UP","VM-MSGSeq","VM-Status"],
                ["RAP-BTSLOG","RAP-TTITRACE","RAP-CP","RAP-UP","RAP-MSGSeq","RAP-Status"]];

var win_available = [[true,false,false,false,false,false],
                    [false,false,false,false,false,false]];

var win_top = [60,170,280,390,500,610];
var win_left = 500;
var increment = 0;


$(document).ready(function() {

    $("#env_list").find(':button').each(function(btn) {
        var a = $(this);
        var column = a.attr("col");
        var row = a.attr("tabindex");

        if(win_available[row][column] == true) {
            a.removeClass("btn-default");
            a.addClass("btn-success");
        }
    });

    $("#env_list").find(':button').on('click', function(){
        var btn=$(this);
        if(btn.hasClass("btn-success")) {

            var column = btn.attr("col");
            var row = btn.attr("tabindex");

            var my_win = window.open("","",'location=no,status=no, toolbar=no, menubar=no, scrollbar=no, resizable=no, top=100,left=200,width=500, height=400');
            window.focus();

            my_win.document.write('<title>'+win_title[row][column]+'</title>');
            my_win.document.write('<script src="js/jquery-2.1.1.min.js"></script>');
            my_win.document.write('<script src="./js/clusterize.min.js"></script>');

            my_win.document.write('<link href="./css/clusterize.css" rel="stylesheet">');
            my_win.document.write('<link href="./vendors/bootgrid/jquery.bootgrid.min.css" rel="stylesheet">');
            my_win.document.write('<link href="./vendors/animate-css/animate.min.css" rel="stylesheet">');
            my_win.document.write('<link href="./vendors/sweet-alert/sweet-alert.min.css" rel="stylesheet">');
            my_win.document.write('<link href="./vendors/material-icons/material-design-iconic-font.min.css" rel="stylesheet">');
            my_win.document.write('<link href="./vendors/socicon/socicon.min.css" rel="stylesheet">');
            my_win.document.write('<link href="./css/app.min.1.css" rel="stylesheet">');
            my_win.document.write('<link href="./css/app.min.2.css" rel="stylesheet">');


            my_win.document.write('<div style="padding-bottom:auto;" class="container" user_id="'+user_id+'" env_id="'+env_id+'" col="'+column+'" row="'+row+'">');
            my_win.document.write('    <input type="text" style="margin-bottom:4px;" class="w-100" id="search" placeholder="Type to search"/>');
            my_win.document.write('    <div class="clusterize">');
            my_win.document.write('        <div id="scrollArea" class="clusterize-scroll">');
            my_win.document.write('            <div id="contentArea" style="font-family: Courier;font-size: 11px;" class="clusterize-content">');
            my_win.document.write('            </div>');
            my_win.document.write('        </div>');
            my_win.document.write('    </div>');
            my_win.document.write('</div>');

            my_win.document.write('<script src="./js/new_window_table.js"></script>');
            my_win.location = "#";
            /*
            my_win.onunload = function(){
                console.log("We are in unload cb",btn.attr("col"),btn.attr("tabindex"));
                btn.removeClass("btn-danger");
                btn.addClass("btn-success");
            */
        }
    });

});






