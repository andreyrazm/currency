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
                    $.each( data.cur, function( index ){
                    $("#val"+index).text(data.val[index] );
                    $("#cur"+index).text(data.cur[index]+" руб." );
                });
            },
            error: function() {
                alert("Ajax error!")
            }
        });//$.ajax
    }//sendajax

    $('.datepicker').datepicker({
        format: "dd/mm/yyyy"
    })
        .datepicker("setValue", $.now())
        .on('changeDate', function(){ sendajax()});

});//$(document)