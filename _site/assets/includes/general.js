function stripHTML(dirtyString) {
    var container = document.createElement('div');
    container.innerHTML = dirtyString;
    return container.textContent || container.innerText;
}

$(document).ready(function() {

$('.closethiswindow').click(function(){
    $('.merch-sec').removeClass('slideup');
});

  $(".openarrival").click(function(e) {
    e.preventDefault();
    $("body").addClass("openbooking");
  });

$(".inline").colorbox({
		inline:true,
		width:"100%",
		rel:'inline',
		current: "{current} OF {total}"
	});
	
	
  $('#selectUl li:not(":first")').addClass('unselected');
  $('#selectUl').hover(
    function(){
    $(this).find('li').click(
      function(){
      $('.unselected').removeClass('unselected');
      $(this).addClass("bignumber");
      $(this).siblings('li').addClass('unselected');
      $(this).siblings('li').removeClass('bignumber');
      var index = $(this).index();
      $('select[name=size]')
      .find('option:eq(' + index + ')')
      .attr('selected',true);
    });
  },
  function(){
  });

  $(function() {
    var fixadent = $(".topnav"), 
    pos = fixadent.offset();

    if(fixadent.length) {
      $(window).scroll(function() {
        if($(this).scrollTop() > (pos.top + 10) && fixadent.css('position') == 'absolute') { 
          fixadent.addClass('fixed'); 
        } else if( $(this).scrollTop() <= pos.top && fixadent.hasClass('fixed') ) { 
          fixadent.removeClass('fixed'); 
        }
      })
    }    
  });

});


$(document).ready(function(){
    
    window.wasScrolled = false;
    $(window).scroll(function(){
        if (!window.wasScrolled){
            $('.merch-sec').addClass('slideup');
        }
        window.wasScrolled = true;
    });
    
    
  // Datepicker

	var new_date = new Date();
	var defaultformatteddate1 = $.datepicker.formatDate("yy-mm-dd", new_date);
	var defaultformatteddate2 = $.datepicker.formatDate("yy-mm-dd", new Date(new_date.setDate(new_date.getDate() + 1)));
	$("#arrival_dates").val(defaultformatteddate1);
	$("#departure_dates").val(defaultformatteddate2);
	
	$('.merch-copy .button1').attr('href','https://westhousehotelnewyork.reztrip.com/search?arrival_date='+defaultformatteddate1+'&departure_date='+defaultformatteddate2);

  $.datepicker._defaults.dateFormat = 'yy-mm-dd';
  
  $(".datepickerman").datepicker({
    minDate: 0,
    numberOfMonths: [1,1],
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dates").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dates").val());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dates").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dates").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);


      // if (!date1 || date2) {
      //   $("#arrival_dates").val(dateText);
      //   $("#departure_dates").val("");
      //   $("#departure_dates").trigger("input");
      //   $("#arrival_dates").trigger("input");
      //   $(this).datepicker();
      // } else if( selectedDate < date1 ) {
      //   $("#departure_dates").val($("#arrival_dates").val());
      //   $("#arrival_dates").val(dateText );
      //   $("#arrival_dates").trigger("input");
      //   $("#departure_dates").trigger("input");
      //   $(this).datepicker();
      // } else {
      //   $("#departure_dates").val(dateText);
      //   $("#departure_dates").trigger("input");
      //   $("#arrival_dates").trigger("input");
      //   $(this).datepicker();
      // }

      	var minDate = $(this).datepicker('getDate');
	    minDate.setDate(minDate.getDate()+1);
	    $(this).datepicker('option','defaultDate',minDate);
	    var newMin = $(this).datepicker('option','defaultDate');
	    var formattedDatee = $.datepicker.formatDate("yy-mm-dd", newMin);
	    // console.log(newMin);

        if( (selectedDate < newMin && newMin < date2) || selectedDate <= date2 ) {
        	$("#arrival_dates").val(dateText);
        	$("#departure_dates").val(formattedDatee);
        	$("#arrival_dates").trigger("input");
        	$("#departure_dates").trigger("input");
        	
        	$("#arrival_datess").val(dateText);
        	$("#departure_datess").val(formattedDatee);
        	$("#arrival_datess").trigger("input");
        	$("#departure_datess").trigger("input");
        } else {
			$("#departure_dates").val(dateText);
			$("#departure_dates").trigger("input");
			
			$("#departure_datess").val(dateText);
			$("#departure_datess").trigger("input");
            $(this).datepicker();
		}

    }
  });


  //bignav

// Datepicker
		$.datepicker._defaults.dateFormat = 'yy-mm-dd';
		
		$(".datepickerly").datepicker({
			minDate: 0,
			numberOfMonths: [2,1],
			beforeShowDay: function(date) {
				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dater").val());
				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dater").val());
				return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
			},
			onSelect: function(dateText, inst) {
				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_dater").val());
				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_dater").val());
                var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

                
                if (!date1 || date2) {
					$("#arrival_dater").val(dateText);
					$("#departure_dater").val("");
                    $(this).datepicker();
                } else if( selectedDate < date1 ) {
                    $("#departure_dater").val( $("#arrival_dater").val() );
                    $("#arrival_dater").val( dateText );
                    $(this).datepicker();
                } else {
					$("#departure_dater").val(dateText);
                    $(this).datepicker();
				}
			}
		});



		$(".datepickerlyy").datepicker({
			minDate: 0,
			// numberOfMonths: [2,1],
			beforeShowDay: function(date) {
				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_daterr").val());
				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_daterr").val());
				return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
			},
			onSelect: function(dateText, inst) {
				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_daterr").val());
				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_daterr").val());
                var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

                
                if (!date1 || date2) {
					$("#arrival_daterr").val(dateText);
					$("#departure_daterr").val("");
                    $(this).datepicker();
                } else if( selectedDate < date1 ) {
                    $("#departure_dater").val( $("#arrival_daterr").val() );
                    $("#arrival_daterr").val( dateText );
                    $(this).datepicker();
                } else {
					$("#departure_daterr").val(dateText);
                    $(this).datepicker();
				}
			}
		});


  //smaller nav


  $.datepicker._defaults.dateFormat = 'yy-mm-dd';

  var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    // altField  : '#arve',
    altFormat : 'dd',
    minDate: new Date(),
    gotoCurrent: true,
    onSelect: function(event, ui) {
      var dayOfWeek = $(this).datepicker('getDate').getUTCDay();
      var selectedMonthName = months[$(this).datepicker('getDate').getMonth()];
      var selectednextMonthName = months[$(this).datepicker('getDate').getMonth()+1];
      // $('#arv').val(selectedMonthName);
      $("#arrival_date").val(event);
      $("#arrival_daterrr").val(event);

      var d = $(this).datepicker("getDate");
      var d2 =  (d.getDate() + 1);

      var getthedate = d.getDate();
      var getthemonth = d.getMonth()+1;
      var today = new Date();
      var LastDayOfMonth = new Date(d.getFullYear(),d.getMonth()+1, 0);
      var LastMonthOfYear = new Date(d.getFullYear(),0,0);
      var getdateLastDayOfMonth = LastDayOfMonth.getDate();
      var getdateLastMonthOfYear = LastMonthOfYear.getMonth()+1;
      var firstOfMonth = new Date(today.getFullYear(),today.getMonth(), 1);

      var d3 = firstOfMonth.getDate();

      // alert(testget);

      $(".departdatepicker").datepicker("option", "minDate", d);

      if( (getthedate == getdateLastDayOfMonth) && (getthemonth != getdateLastMonthOfYear) ) {

        var d1 =  d.getFullYear() + '-' + ('0' + (d.getMonth() + 2)).slice(-2) + '-' + ('0' + d3).slice(-2); // will add zero

        $('.departdatepicker').datepicker('setDate',d1);

        if(d3 > 10) {
          $("#depee").val('0'+d3);
        } else {
          $("#depee").val(d3);
        }

        $("#departure_date").val(d1);
        $("#departure_daterrr").val(d1);
        $('#dep').val(selectednextMonthName);

        $(".datepicker").addClass("super-ghost");
        $('.departdatepicker').css({"opacity" : 1, "visibility" : "visible"});
        $(".departdatepicker").removeClass("super-ghost");

      } else if( (getthedate == getdateLastDayOfMonth) && (getthemonth == getdateLastMonthOfYear) ) {

        var d1 =  (d.getFullYear()+1) + '-' + ('0'+'1').slice(-2) + '-' + ('0' + d3).slice(-2);

        $('.departdatepicker').datepicker('setDate',d1);

        if(d3 > 10) {
          $("#depee").val('0'+d3);
        } else {
          $("#depee").val(d3);
        }

        $("#departure_date").val(d1);
        $("#departure_daterrr").val(d1);
        $('#dep').val('January');

        $(".datepicker").addClass("super-ghost");
        $('.departdatepicker').css({"opacity" : 1, "visibility" : "visible"});
        $(".departdatepicker").removeClass("super-ghost");

      } else {

        var d1 =  d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ( '0' + (d.getDate() + 1)).slice(-2);

        $('.departdatepicker').datepicker('setDate',d1);

        if(d2 < 10) {
          $("#depee").val('0'+d2);
        } else {
          $("#depee").val(d2);
        }

        $("#departure_date").val(d1);
        $("#departure_daterrr").val(d1);
        $('#dep').val(selectedMonthName);

        $(".datepicker").addClass("super-ghost");
        $('.departdatepicker').css({"opacity" : 1, "visibility" : "visible"});
        $(".departdatepicker").removeClass("super-ghost");
      }

    }

  });

  $('.departdatepicker').datepicker({
    dateFormat: 'yy-mm-dd',
    altField  : '#depee',
    altFormat : 'dd',
    minDate: 1,
    gotoCurrent: true,
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_date").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_date").val());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(event, ui) {
      var dayOfWeek = $(this).datepicker('getDate').getUTCDay();
      var selectedMonthName = months[$(this).datepicker('getDate').getMonth()];
      $('#dep').val(selectedMonthName);
      $("#departure_date").val(event);
      $("#departure_daterrr").val(event);
      $('.departdatepicker').addClass("super-ghost");
      $('.shutdown').removeClass('alldown');

    }
  });

  $('.datepickerr').datepicker({
    dateFormat: 'yy-mm-dd',
    altField  : '#arve-1',
    altFormat : 'dd',
    minDate: new Date(),
    onSelect: function(event, ui) {

      var dayOfWeek = $(this).datepicker('getDate').getUTCDay();
      var selectedMonthName = months[$(this).datepicker('getDate').getMonth()];
      var selectednextMonthName = months[$(this).datepicker('getDate').getMonth()+1];
      $('#arv-1').val(selectedMonthName);
      $("#arrival_date-1").val(event);

      var d = $(this).datepicker("getDate");
      var d2 =  (d.getDate() + 1);

      var getthedate = d.getDate();
      var getthemonth = d.getMonth()+1;
      var today = new Date();
      var LastDayOfMonth = new Date(d.getFullYear(),d.getMonth()+1, 0);
      var LastMonthOfYear = new Date(d.getFullYear(),0,0);
      var getdateLastDayOfMonth = LastDayOfMonth.getDate();
      var getdateLastMonthOfYear = LastMonthOfYear.getMonth()+1;
      var firstOfMonth = new Date(today.getFullYear(),today.getMonth(), 1);

      // alert(getthemonth);

      var d3 = firstOfMonth.getDate();

      $(".departdatepickerr").datepicker("option", "minDate", d);

      if( (getthedate == getdateLastDayOfMonth) && (getthemonth != getdateLastMonthOfYear) ) {

        var d1 =  d.getFullYear() + '-' + (d.getMonth() + 2) + '-' + d3;

        $('.departdatepickerr').datepicker('setDate',d1);

        $("#depee-1").val(d3);
        $("#departure_date-1").val(d1);
        $('#dep-1').val(selectednextMonthName);

      } else if( (getthedate == getdateLastDayOfMonth) && (getthemonth == getdateLastMonthOfYear) ) {

        var d1 =  (d.getFullYear()+1) + '-' + '1' + '-' + d3;

        $('.departdatepickerr').datepicker('setDate',d1);

        $("#depee-1").val(d3);
        $("#departure_date-1").val(d1);
        $('#dep-1').val('January');

      } else {

        var d1 =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);

        $('.departdatepickerr').datepicker('setDate',d1);

        $("#depee-1").val(d2);
        $("#departure_date-1").val(d1);
        $('#dep-1').val(selectedMonthName);
      }

    }

  });

  $('.departdatepickerr').datepicker({
    dateFormat: 'yy-mm-dd',
    altField  : '#depee-1',
    altFormat : 'dd',
    minDate: 1,
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_date-1").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_date-1").val());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(event, ui) {
      var dayOfWeek = $(this).datepicker('getDate').getUTCDay();
      var selectedMonthName = months[$(this).datepicker('getDate').getMonth()];
      $('#dep-1').val(selectedMonthName);
      $("#departure_date-1").val(event);
    }
  });

  $(".datepicker-ressys").datepicker({
    minDate: 0,
    numberOfMonths: [2,1],
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_date-nav").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_date-nav").val());
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#arrival_date-nav").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#departure_date-nav").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);


      if (!date1 || date2) {
        $("#arrival_date-nav").val(dateText);
        $("#departure_date-nav").val("");
        $(this).datepicker();
      } else if( selectedDate < date1 ) {
        $("#departure_date-nav").val( $("#arrival_date-nav").val() );
        $("#arrival_date-nav").val( dateText );
        $(this).datepicker();
      } else {
        $("#departure_date-nav").val(dateText);
        $(this).datepicker();
      }
    }
  });




  var d=new Date();
  var month=new Array();
  month[0]="January";
  month[1]="February";
  month[2]="March";
  month[3]="April";
  month[4]="May";
  month[5]="June";
  month[6]="July";
  month[7]="August";
  month[8]="September";
  month[9]="October";
  month[10]="November";
  month[11]="December";
  var n = month[d.getMonth()];

  $("#arv-1").attr("placeholder", n);
  $("#dep-1").attr("placeholder", n);



  var todaytwo = new Date();
  var monthtwo = todaytwo.getMonth(),
  yeartwo = todaytwo.getFullYear();
  if (monthtwo < 0) {
    monthtwo = 11;
    yeartwo -= 1;
  }
  var tomorrow = new Date(yeartwo, monthtwo, todaytwo.getDate()+1);

  // $('#arrival_date').val($.datepicker.formatDate('yy-mm-dd', todaytwo));
  // $('#departure_date').val($.datepicker.formatDate('yy-mm-dd', tomorrow));

});


$(document).ready(function() {
    
  $("#header .nav a").click(function(e) {
    e.preventDefault();
    $("body").addClass("opennav");
  });

  $(".reserve a").click(function(e) {
    e.preventDefault();
    $("body").addClass("openbooking");
  });


  $(".cover").click(function(e) {
    e.preventDefault();
    $("body").removeClass("opennav");
    $("body").removeClass("openbooking");
  });


  $(".closerlink").click(function(e) {
    e.preventDefault();
    $("body").removeClass("opennav");
  });
  
  $(document).on("click", ".click-and-close", function(){
    $("body").removeClass("opennav");
  });

  $(".btn1").click(function(e) {
    e.preventDefault();
    $("body").removeClass("openbooking");
  });

  $(".calspacer span.arrv input").click(function() {

    $(".datepicker").removeClass("super-ghost").css({"opacity" : 1, "visibility" : "visible"});
    $(".shutdown").addClass("alldown");

  });


  $(".departdatepicker").click(function() {
    $(".datepicker").removeClass("super-ghost").css({"opacity" : 0, "visibility" : "hidden"});
    $(".departdatepicker").addlass("super-ghost").css({"opacity" : 0, "visibility" : "hidden"});
  });

  $(".calspacer span.dept").click(function() {

    $(".departdatepicker").css({"opacity" : 1, "visibility" : "visible"});

  });

  $(".shutdown").click(function(e) {
    e.preventDefault();
    $(".datepicker").addClass("super-ghost");
    $(".departdatepicker").addClass("super-ghost");
    $(this).removeClass("alldown");
  });

  $(".cls").click(function() {
    $(".datepicker").addClass("super-ghost");
    $(".departdatepicker").addClass("super-ghost");
    $(".shutdown").removeClass("alldown");
  });

  $( "#departure_date" ).focus(function() {
    $(".departdatepicker").removeClass("super-ghost");
    $(".shutdown").addClass("alldown");
  });


  $( "#arrival_date" ).focus(function() {
    $(".departdatepicker").addClass("super-ghost");

  });

    $( "#departure_date").focus(function() {
        $(".datepicker").css({"opacity" : 0, "visibility" : "hidden"});
    });



});



$(window).on('load', function(){
  $('#status').fadeOut();
  $(".wrapper").removeClass("preload");
  $('#preloader').delay(0).fadeOut('slow');
});


function thirty_pc() {
  var height = $(window).height();
  var thirtypc = (95 * height) / 100;
  var fully = (100 * height) / 100;
  var float = (100 * height) / 100 - 100;
  var sixty = (70 * height) / 100;
  var seventypcd = (85 * height) / 100;
  var fifty = (50 * height) / 100;
  var seventypc = (88 * height) / 100;
  var forty = (15 * height) / 100;
  thirtypc = parseInt(thirtypc) + 'px';
  $("#featured").css('minHeight',seventypc);
  $(".tabs-wrapper .tab-content").css('maxHeight',sixty);
  //	$(".topwithbanneracross").css('marginTop',fully);
  //	$(".dl-menuwrapper").css('minHeight',fifty);
  //	$(".dl-menuwrapper").css('maxHeight',fifty);
}

$(document).ready(function() {
  thirty_pc();
  $(window).bind('resize', thirty_pc);
});



$(document).ready(function(){

  $(".tab-content").css({'maxHeight':($(".navcontainer").height() - 171 + 'px')});

  var $document = $(document),
  $element = $('body'),
  className = 'hasScrolled';

  $document.scroll(function() {
    if ($document.scrollTop() >= 300) {
      // user scrolled 50 pixels or more;
      // do stuff
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  });




  // TABS FUNCTION //
  
  if(window.location.href.indexOf("/offers/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(2)").addClass("active").show(); //Activate offers tab
		$(this).find(".tab-content:nth-child(2)").show(); //Show offers tab content
	});
  } else if(window.location.href.indexOf("/westhouse-hotel-amenities-nyc/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(3)").addClass("active").show(); //Activate amenities tab
		$(this).find(".tab-content:nth-child(3)").show(); //Show amenities tab content
	});
  } else if(window.location.href.indexOf("/westhouse-hotel-new-york-dining/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(4)").addClass("active").show(); //Activate dining tab
		$(this).find(".tab-content:nth-child(4)").show(); //Show dining tab content
	});
  } else if(window.location.href.indexOf("/photo-album/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(5)").addClass("active").show(); //Activate gallery tab
		$(this).find(".tab-content:nth-child(5)").show(); //Show gallery tab content
	});
  } else if((window.location.href.indexOf("/things-to-do-in-nyc/") > -1) || (window.location.href.indexOf("/events-in-nyc/") > -1)) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(6)").addClass("active").show(); //Activate area tab
		$(this).find(".tab-content:nth-child(6)").show(); //Show area tab content
	});
  } else if(window.location.href.indexOf("/westhouse-hotel-new-york-partners/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(7)").addClass("active").show(); //Activate partners tab
		$(this).find(".tab-content:nth-child(7)").show(); //Show partners tab content
	});
  } else if(window.location.href.indexOf("/blog/") > -1) {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:nth-child(8)").addClass("active").show(); //Activate blog tab
		$(this).find(".tab-content:nth-child(8)").show(); //Show blog tab content
	});
  } else {
	$('.tabs-wrapper').each(function() {
		$(this).find(".tab-content").hide(); //Hide all content
		$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(this).find(".tab-content:first").show(); //Show first tab content
	});
  }
  
  $("ul.tabs li").click(function(e) {
    $(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(this).parents('.tabs-wrapper').find(".tab-content").hide(); //Hide all tab content

    var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
    $("li.tab-item:first-child").css("background", "none" );
    $(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
    e.preventDefault();
  });
  
  $("ul.tabs li a:not(.connect)").click(function(e) {
    e.preventDefault();
  })

  $("li.tab-item:last-child").addClass('last-item');


  // ACCORDION FUNCTION //
  $('.ac-btn').click(function() {

    $('.ac-btn').removeClass('on');
    $('.ac-selected').slideUp('normal');
    $('.ac-content').removeClass('ac-selected');
    $('.ac-content').slideUp('normal');
    if($(this).next().is(':hidden') == true) {
      $(this).addClass('on');
      $(this).next().slideDown('normal');
    }
  });
  $('.ac-btn').mouseover(function() {
    $(this).addClass('over');
  }).mouseout(function() {
    $(this).removeClass('over');
  });
  $('.ac-content').hide();

  // TOGGLE FUNCTION //
  $('#toggle-view li').click(function () {
    var text = $(this).children('div.panel');
    if (text.is(':hidden')) {
      text.slideDown('200');
      $(this).children('span').addClass('toggle-minus');
      $(this).addClass('activated');
    } else {
      text.slideUp('200');
      $(this).children('span').removeClass('toggle-minus');
      $(this).children('span').addClass('toggle-plus');
      $(this).removeClass('activated');
    }

  });



  //$("#arrival_date").datepicker({
  //	numberOfMonths: 1,
  //	minDate: 0,
  //	altField  : '#arv',
  //	altFormat : 'yymmdd',
  //	format    : 'mm-dd-yy',
  //	minDate: new Date(2014, 00, 15),
  //	onSelect: function(selected) {
  //		$("#departure_date").datepicker("option","minDate", selected)
  //	}
  //});

  //$("#departure_date").datepicker({
  //	numberOfMonths: 1,
  //	minDate: 0,
  //	altField  : '#dep',
  //	altFormat : 'yymmdd',
  //	format    : 'mm-dd-yy',
  //	minDate: new Date(2014, 00, 15),
  //	onSelect: function(selected) {
  //		$("#arrival_date").datepicker("option","maxDate", selected)
  //	}
  //});

  $( ".roomdatepicker" ).datepicker({
    showOtherMonths: true,
    selectOtherMonths: true
  });

  $('.hotelslider').flexslider({
    animation: "slide"
  });

  $('.roomsslider').flexslider({
    animation: "slide"
  });

  $('.tripslider').flexslider({
    animation: "slide"
  });

  $('.diningslider').flexslider({
    animation: "slide"
  });

  // TABPUSHER

  var spann = $('.tabpusher span');

  $('.tabpusher').click(function() {

    if (spann.hasClass('fa-angle-left')) {
      $(this).addClass('activate');
      spann.removeClass('fa-angle-left');
      spann.addClass('fa-angle-right');

      $('ul.tabs').addClass('activate');
      $('.navcontainer').addClass('activate');

    } else {
      $(this).removeClass('activate');
      spann.removeClass('fa-angle-right');
      spann.addClass('fa-angle-left');

      $('ul.tabs').removeClass('activate');
      $('.navcontainer').removeClass('activate');
    }
  });

  $('ul.tabs a').click(function() {
      $('.tabpusher').addClass('activate');
      spann.removeClass('fa-angle-left');
      spann.addClass('fa-angle-right');
      
      var windowsize = $('body').width()
      if (windowsize > 767) {
          $('ul.tabs').addClass('activate');
          $('.navcontainer').addClass('activate');
      }
  });

  $(window).resize(function() {
    var windowsize = $('body').width();

    
    
    if (windowsize > 767) {
      $('.tabpusher').removeClass('activate');
      spann.removeClass('fa-angle-right');
	  spann.addClass('fa-angle-left');

      $('ul.tabs').removeClass('activate');
      $('.navcontainer').removeClass('activate');
    }
  });
  
  
  // nmapcon
  
    $('.nmapcon *:not(.nmapcontent)').click(function() {
    	if ($('.nmapcon').hasClass('disabled')) {
    		$('.nmapcon').removeClass('disabled');
    		$('.nmapcon span:first').text('Click to Enable');
    	} else {
    		$('.nmapcon').addClass('disabled');
    		$('.nmapcon span:first').text('Disable');
    	}
    });
  
  // subnavmobile
  
    $('.subclose').click(function() {
    	var textstore = $('.subclose span').text();
    	
    	if($('.subclose i').hasClass('fa-bars')) {
    		$('.subclose i').removeClass('fa-bars');
    		$('.subclose i').addClass('fa-times');
    		
    		$('.subnavmobile ul').slideDown();
    		$('.subclose span').text('Close');
    		storeage = textstore;
    	} else {
    		$('.subclose i').removeClass('fa-times');
    		$('.subclose i').addClass('fa-bars');	
    		
    		$('.subnavmobile ul').slideUp();
    		$('.subclose span').text(storeage);
    	}
    });

});

