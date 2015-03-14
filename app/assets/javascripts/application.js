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
            data: { id: $(this).parent().data("id"),  date: $('.datepicker').val()  }, // This goes to Controller in params hash, i.e. params[:file_name]
            //complete: function() {},
            success: function(data) {
                makeChart(data.stat);
            },
            error: function() {
                alert('fail')
            }
        });//$.ajax


    });//onclick glyphicon

    function makeChart(data) {
        Highcharts.setOptions({
            lang: {
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
            }
        });
        // create the chart
        $('#container').highcharts('StockChart', {


            title: {
                text: 'Курсы'
            },

            xAxis: {
                gapGridLineWidth: 0
            },

            rangeSelector : {
                enabled: false,
                buttons : [ {
                    type : 'all',
                    count : 1,
                    text : 'All'
                }],
                selected : 1,
                inputEnabled : false
            },

            series : [{
                name : 'Курс',
                type: 'area',
                data : data,

                gapSize: 5,
                tooltip: {
                    valueDecimals: 4,
                    xDateFormat: '%B %e'
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },

                threshold: null
            }]
        });
    }//make chart
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
                        .append('<span class="glyphicon glyphicon-stats" data-toggle="modal" data-target="#myModal"></span>')
                        .data("id", data.cur[index]['id']);
                });
            },
            error: function() {
                alert("Ajax error!")
            }
        });//$.ajax
    }//sendajax
});//$(document)