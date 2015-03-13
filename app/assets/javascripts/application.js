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
                    $("#val"+index).text(data.cur[index]['charcode'] );
                    $("#cur"+index).text(data.cur[index]['value']+" руб.")
                        .append('<span class="glyphicon glyphicon-stats"></span>')
                        .data("id", data.cur[index]['id']);
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


    $('table').on('click','.glyphicon', function(){
        $.ajax({
            url: "/curr/stat",
            type: "GET",
            dataType: "json",
            data: { id: $(this).data("id")  }, // This goes to Controller in params hash, i.e. params[:file_name]
            //complete: function() {},
            success: function(data) {
                alert(data.stat[1]['value'])

            },
            error: function() {
                alert('fail')
            }
        });//$.ajax


    });//onclick glyphicon
});//$(document)