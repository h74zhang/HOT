$('body').animate({ paddingTop : 25,paddingBottom:25});

var rows = [];
var search = document.getElementById('search');

rows.push({
    values: "",
    markup: '<div>' +
            ''+
            '</div>',
    active: true
});

var filterRows = function(rows) {
  var results = [];
  for(var i = 0, ii = rows.length; i < ii; i++) {
    if(rows[i].active) results.push(rows[i].markup)
  }
  return results;
}

/*
* Init clusterize.js
*/
var clusterize = new Clusterize({
  rows: filterRows(rows),
  scrollId: 'scrollArea',
  contentId: 'contentArea'
});

/*
* Multi-column search
*/

var construct_rows = function(local_array) {
    var my_local_rows = [];

    if(local_array.length > 0) {


        for(var i = 0; i < local_array.length; i++) {
            var suitable = true;
            var local_text_class = "c-black";
        
            if(local_array[i].toLowerCase().indexOf("err") > 0 || local_array[i].toLowerCase().indexOf("fatal") > 0) {
                local_text_class = "c-red";
            } else if (local_array[i].toLowerCase().indexOf("wrn") > 0) {
                local_text_class = "c-orange";
            } else {
                local_text_class = "c-black";
            }

            if(search.value != "") {
                if(local_array[i].toLowerCase().indexOf(search.value.toLowerCase()) > 0) {
                    suitable = true;
                } else {
                    suitable = false;
                }
            }

            my_local_rows.push({
                values: local_array[i],
                markup: '<div class="'+local_text_class+'">' +
                        local_array[i] +
                        '</div>',
                active: suitable
            });
        }
    }

    return my_local_rows;
}


var filter_rows = function(local_rows) {
    if(search.value != "") {
        for(var i = 0, ii = local_rows.length; i < ii; i++) {
            var suitable = false;

            if(local_rows[i].values.toLowerCase().indexOf(search.value.toLowerCase()) > 0)
                suitable = true;
            local_rows[i].active = suitable;
        }
    }
}

var onSearch = function() {
    if(search.value == "") {
        for(var i = 0, ii = rows.length; i < ii; i++) {
            rows[i].active = true;
        }
    } else {
        for(var i = 0, ii = rows.length; i < ii; i++) {
            var suitable = false;

            if(rows[i].values != "" && rows[i].values.toLowerCase().indexOf(search.value.toLowerCase()) > 0)
                suitable = true;
            rows[i].active = suitable;
        }
    }
    clusterize.update(filterRows(rows));
}

search.oninput = onSearch;

var now = new Date();
var new_line = "abcdefghijklmndfdfdfdfdfd [WRN]  "+now.toISOString();

var new_array = [new_line,];
for(var j = 0; j < 100; j ++) {
    if (j == 10) {
        new_array.push("abcdefghijklmndfdfdfdfdfd [ERR]  "+now.toISOString());
    }else if(j == 20) {
        new_array.push("abcdefghijklmndfdfdfdfdfd [WRN]  "+now.toISOString());
    } else {
        new_array.push("abcdefghijklmndfdfdfdfdfd [INFO]  "+now.toISOString());
    }
}

var new_rows = construct_rows(new_array);

for(var i = 0; i < new_rows.length; i++) {
    rows.push(new_rows[i]);
}
clusterize.append(filterRows(new_rows));
document.getElementById('scrollArea').scrollTop += 500;


var counter = 0;
setInterval(function() {
    var now = new Date();
    var new_line = "abcdefghijklmndfdfdfdfdfd [FATAL]  "+now.toISOString()+": "+counter;
    var new_array = [];

    console.log(document.getElementById('scrollArea').scrollTop,document.getElementById('scrollArea').scrollHeight);
    for(var j = 0; j < 100; j ++) {
        new_array.push(new_line);
    }

    var new_rows = construct_rows(new_array);

    for(var i = 0; i < new_rows.length; i++) {
        rows.push(new_rows[i]);
    }

    clusterize.append(filterRows(new_rows));
    counter++;
    document.getElementById('scrollArea').scrollTop = document.getElementById('scrollArea').scrollHeight;
}, 5000);


