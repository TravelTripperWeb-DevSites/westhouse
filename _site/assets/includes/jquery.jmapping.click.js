/*
 * jMapping v2.1.0 - jQuery plugin for creating Google Maps
 *
 * Copyright (c) 2009-2010 Brian Landau (Viget Labs)
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($){
  $.jMapping = function(map_elm, options){
    var settings, gmarkers, mapped, map, markerManager, places, bounds, jMapper, info_windows;
    map_elm = (typeof map_elm == "string") ? $(map_elm).get(0) : map_elm;
    
    if (!($(map_elm).data('jMapping'))){ // TODO: Should we use a different test here?
      settings = $.extend(true, {}, $.jMapping.defaults);
      $.extend(true, settings, options);
      gmarkers = {};
      info_windows = [];
      
      var init = function(doUpdate){
        var info_window_selector, min_zoom, zoom_level;

        info_window_selector = [
          settings.side_bar_selector, 
          settings.location_selector, 
          settings.info_window_selector
        ].join(' ');
        $(info_window_selector).hide();

        places = getPlaces();
        bounds = getBounds(doUpdate);

        if (doUpdate){
          gmarkers = {};
          info_windows = [];
          markerManager.clearMarkers();
          google.maps.event.trigger(map, 'resize');
          map.fitBounds(bounds);
          if (settings.force_zoom_level){
            map.setZoom(settings.force_zoom_level);
          }
        } else {
          map = createMap();
          markerManager = new MarkerManager(map);
        }

        places.each(function(){
          var marker = createMarker(this);
          if (!(settings.link_selector === false)){
            setupLink(this);
          }
          $(document).trigger('markerCreated.jMapping', [marker]);
        });
        
        if (doUpdate){
          updateMarkerManager();
        } else {
          google.maps.event.addListener(markerManager, 'loaded', function(){
            updateMarkerManager();
            if (settings.default_zoom_level){
              map.setZoom(settings.default_zoom_level);
            }
          }); 
        }

        if (!(settings.link_selector === false) && !doUpdate){
          attachMapsEventToLinks();
        }
      };
      
      var createMap = function(){
        if (settings.map_config){
          map = new google.maps.Map(map_elm, settings.map_config);
            var flightPlanCoordinates = [
					    // new google.maps.LatLng(39.044091, -94.582756),
					    // new google.maps.LatLng(38.6537065,-90.2477908),
					    // new google.maps.LatLng(37.9776374,-90.0474981),
					    // new google.maps.LatLng(32.2876927,-90.1600483),
					    // new google.maps.LatLng(29.940389, -90.1208695),
					    // new google.maps.LatLng(30.2836605, -97.7397091),
					    // new google.maps.LatLng(37.6770988, -113.0695544),
					    // new google.maps.LatLng(34.1108513, -118.5928551),
					    // new google.maps.LatLng(42.1964735, -122.7145171),
					    // new google.maps.LatLng(45.6791647, -111.0311471),
					    // new google.maps.LatLng(45.038787, -87.128531),
					    // new google.maps.LatLng(41.8921311, -87.6074725),
					    // new google.maps.LatLng(40.815665, -73.9480885),
					    // new google.maps.LatLng(42.349876, -73.284403),
					    // new google.maps.LatLng(43.374578, -80.969367),
					    // new google.maps.LatLng(36.134721, -86.764966),
					    // new google.maps.LatLng(38.1492127, -79.0706542)
					  ];
					  var flightPath = new google.maps.Polyline({
					    path: flightPlanCoordinates,
					    geodesic: true,
					    strokeColor: '#FF0000',
					    strokeOpacity: 1.0,
					    strokeWeight: 2
					  });
					
					  flightPath.setMap(map);
        } else {
          map = new google.maps.Map(map_elm, {
            navigationControlOptions: {
              style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 9
          });
        }
        map.fitBounds(bounds);
        if (settings.force_zoom_level){
          map.setZoom(settings.force_zoom_level);
        }
        return map;
      };
      
      var getPlaces = function(){
        return $(settings.side_bar_selector+' '+settings.location_selector);
      };
      
      var getPlacesData = function(doUpdate){
        return places.map(function(){
          if (doUpdate){
            $(this).data('metadata', false);
          }
          return $(this).metadata(settings.metadata_options);
        });
      };
      
      var getBounds = function(doUpdate){
        var places_data = getPlacesData(doUpdate),
            newBounds = null, point;

       for (var i=0, len = places_data.length; i<len; i++) {
          // if 'bounded' specified AND it's false, don't add it to the bounds
          if (places_data[i].bounded != false) {
            point = $.jMapping.makeGLatLng(places_data[i].point);
            if (newBounds == null) {
              newBounds = new google.maps.LatLngBounds(point, point);
            } else {
              newBounds.extend(point);
            }
          }
        }
        // if newBounds not set, just use the default_point from settings
        if (newBounds == null) {
          point = $.jMapping.makeGLatLng(settings.default_point);
          newBounds = new google.maps.LatLngBounds(point, point);
        }
        return newBounds;
      };
      
      var setupLink = function(place_elm){
        var $place_elm = $(place_elm),
            location_data = $place_elm.metadata(settings.metadata_options),
            link = $place_elm.find(settings.link_selector);

        link.attr('href', ("#" + location_data.id));
      };
      
      var chooseIconOptions = function(category){
        if (settings.category_icon_options){
          if ($.isFunction(settings.category_icon_options)){
            return settings.category_icon_options(category);
          } else {
            return settings.category_icon_options[category] || settings.category_icon_options['default'];
          }
        } else {
          return {};
        }
      };
      
      var createMarker = function(place_elm){
        var $place_elm = $(place_elm), place_data, point, marker, iconimage, iconimg, $info_window_elm,
          info_window;

        place_data = $place_elm.metadata(settings.metadata_options);
        point = $.jMapping.makeGLatLng(place_data.point);
        
        iconimgs = $place_elm.metadata(settings.iconimage);
        
        
        var image = new google.maps.MarkerImage("" + place_data.icon + "");
        
        
        if (settings.category_icon_options){
          icon_options = chooseIconOptions(place_data.category);
          if ((typeof icon_options === "string") || (icon_options instanceof google.maps.MarkerImage)){
            marker = new google.maps.Marker({
              icon: image,
              position: point,
              map: map,
            });
          } else {
            marker = new StyledMarker({
              styleIcon: new StyledIcon(StyledIconTypes.MARKER, icon_options),
              position: point,
              map: map
            });
          }
        } else {
          marker = new google.maps.Marker({
            position: point,
            map: map
          });
        }

        $info_window_elm = $place_elm.find(settings.info_window_selector);
       


        if ($info_window_elm.length > 0){
          info_window = new google.maps.InfoWindow({
              content: $info_window_elm.html(),
              maxWidth: settings.info_window_max_width 
          });
          info_windows.push(info_window);
          google.maps.event.addListener(marker, 'click', function() {
            $.each(info_windows, function(index, iwindow){
              if (info_window != iwindow){
                iwindow.close();
              }

              map.setCenter(marker.getPosition());
              
           	var bitsofit = $info_window_elm.find("span").html();
           	$(".infocontainer").removeClass("boooyah");
         	$("#" + bitsofit).addClass("boooyah");
          	
            });
            info_window.open(map, marker);
          });
        }

        gmarkers[parseInt(place_data.id, 10)] = marker;
        return marker;
      };
      
      var updateMarkerManager = function(){
        if (settings.always_show_markers === true) {
          min_zoom = 0;
        } else {
          zoom_level = map.getZoom();
          min_zoom = (zoom_level < 7) ? 0 : (zoom_level - 7);
        }
        markerManager.addMarkers(gmarkersArray(), min_zoom);
        markerManager.refresh();
        if (settings.force_zoom_level){
          map.setZoom(settings.force_zoom_level);
        }
      };
      
      var attachMapsEventToLinks = function(){
        var location_link_selector = [
          settings.side_bar_selector, 
          settings.location_selector, 
          settings.link_selector
        ].join(' ');
        
        $(location_link_selector).live('click', function(e){
          e.preventDefault();
          var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
          google.maps.event.trigger(gmarkers[marker_index], "hover"); 
          
        });
        
       
      };
      
      var gmarkersArray = function(){
        var marker_arr = [];
        $.each(gmarkers, function(key, value){
          marker_arr.push(value);
        });
        return marker_arr;
      };
      
      if ($(document).trigger('beforeMapping.jMapping', [settings]) != false){
        init();
        mapped = true;
      } else {
        mapped = false;
      }
      jMapper = {
        gmarkers: gmarkers,
        settings: settings,
        mapped: mapped,
        map: map,
        markerManager: markerManager,
        gmarkersArray: gmarkersArray,
        getBounds: getBounds,
        getPlacesData: getPlacesData,
        getPlaces: getPlaces,
        update: function(){
          if ($(document).trigger('beforeUpdate.jMapping', [this])  != false){
            
            init(true);
            this.map = map;
            this.gmarkers = gmarkers;
            this.markerManager = markerManager;
            $(document).trigger('afterUpdate.jMapping', [this]);
          }
        }
      };
      $(document).trigger('afterMapping.jMapping', [jMapper]);
      return jMapper;
    } else {
      return $(map_elm).data('jMapping');
    }
  };
  
  $.extend($.jMapping, {
    defaults: {
      side_bar_selector: '#map-side-bar:first',
      location_selector: '.map-location',
      link_selector: 'a.map-link',
      info_window_selector: '.info-box',
      iconimage: {type: 'attr', name: 'data-icon'},
      info_window_max_width: 425,
      default_point: {lat: 0.0, lng: 0.0},
      metadata_options: {type: 'attr', name: 'data-jmapping'}
    },
    makeGLatLng: function(place_point){
      return new google.maps.LatLng(place_point.lat, place_point.lng);
    }
  });
  
  $.fn.jMapping = function(options){
    if ((options == 'update') && $(this[0]).data('jMapping')){
      $(this[0]).data('jMapping').update();
    } else {
      if (options == 'update') options = {};
      $(this[0]).data('jMapping', $.jMapping(this[0], options));
    }
    return this;
  };
})(jQuery);