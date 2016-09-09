$(document).ready(function(){
    //Welcome Message (not for login page)
    function notify(message, type){
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    };

    $(':button').on('click', function(){
        var btn=$(this);
        console.log(btn.attr());
        if(btn.attr('class')=='btn btn-success btn-icon'){
             btn.removeClass('btn btn-success btn-icon').addClass('btn-danger');
        }
        else{
            btn.removeClass('btn-danger').addClass('btn btn-success btn-icon');
        }

    })

    $.get("/username", function(result){
        $('#Active_User span').text(result);
        if (!$('.login-content')[0]) {
            notify('Welcome back '+result, 'inverse');
        }
    });
});