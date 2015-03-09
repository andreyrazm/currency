// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//=require bootstrap-datepicker.js


$(document).ready(function () {
    function sendajax(){
        //alert($('.datepicker').val());
        $.ajax({
            url: "/",
            type: "GET",
            dataType: "json",
            data: { datap: $('.datepicker').val() }, // This goes to Controller in params hash, i.e. params[:file_name]
            //complete: function() {},
            success: function(data) {
                //alert(data.dat);
                $("#dat").text(data.dat);
                $("#val1").text(data.val1);
                $("#val2").text(data.val2);
                $("#cur1").text(data.cur1);
                $("#cur2").text(data.cur2);
            },
            error: function() {
                alert("Ajax error!")
            }
        });
    };
    $('.datepicker').datepicker({

        format: "dd/mm/yyyy"

    })
        .datepicker("setValue", $.now())
        .on('changeDate', function(){ sendajax()});


});