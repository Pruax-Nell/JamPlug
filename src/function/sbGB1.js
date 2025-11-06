

if ($('.skateboard-lessons-section').length) {
    let map;
    let currentInfoWindow = null;
    let circle = null; // Define circle variable

    async function initMap() {
        // Retrieve marker positions from the data attribute
        const mapElement = document.getElementById("map");
        const markerPositions = JSON.parse(mapElement.getAttribute("data-marker-positions"));

        // Set default center coordinates
        const defaultCenter = { lat: 54.0505571, lng: -2.7948636 }; // Change these values to set your desired default center

        // Calculate the center of the map based on the first marker position if available, otherwise use default center
        let center = defaultCenter;
        if (markerPositions && markerPositions.length > 0) {
            center = {
                lat: 54.0505571,
                lng: -2.7948636,
            };
        }

        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // The map, centered at the calculated center
        map = new Map(document.getElementById("map"), {
            zoom: 5,
            center: center,
            gestureHandling: "cooperative",
            mapId: "DEMO_MAP_ID",
        });

        // Add markers for each position
        markerPositions.forEach((markerPosition, index) => {
            const marker = new AdvancedMarkerElement({
                map: map,
                position: markerPosition,
                title: markerPosition.title, // Title for the marker
            });
            marker.link = markerPosition.link;
            // Create an info window with the post excerpt
            const contentString = `
            <div>
                <h3>${markerPosition.title}</h3>
                <p>${markerPosition.postExcerpt}</p>
                <p><a href="${marker.link}" target="_blank">Read More</a></p>
            </div>`;
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            // Add click event listener to open the info window when marker is clicked
            marker.addListener("click", () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close(); // Close the current info window if it exists
                }
                infowindow.open(map, marker);
                currentInfoWindow = infowindow;
            });
        });

        function removeCircle() {
          if (circle) {
              circle.setMap(null); // Remove the circle from the map
              $('.skateboard-lessons-section .lessons-part .post').show();
          }
        }
        // Add submit event listener to the search form
        $('#searchForm').submit(function (e) {
            e.preventDefault();
            // Get location name and radius from form fields
            var locationName = $("#location").val() + ' UK';
            var radius = parseInt($("#radius").val()) * 1000; // Convert radius from kilometers to meters
            // Call the function to get coordinates from location name
            // Check if location or radius is blank or invalid
            if (!locationName.trim() || isNaN(radius) || radius <= 0) {
                $('.map-ajax').show(); // Show all .map-ajax elements
                removeCircle(); // Remove the circle from the map
                return; // Exit the function
            }
            getCoordinatesFromLocationName(locationName, function (coordinates) {
                if (coordinates) {
                    var location = new google.maps.LatLng(coordinates.lat, coordinates.lng);
                    // Draw circle on the map and adjust bounds
                    drawCircle(location, radius);
                    // Find marker positions within the radius
                    findMarkersWithinRadius(location, radius, markerPositions);
                } else {
                    console.error("Unable to retrieve coordinates for the location:", locationName);
                }
            });
        });
        function getCoordinatesFromLocationName(locationName, callback) {
            // Initialize Geocoder
            var geocoder = new google.maps.Geocoder();
            // Geocode the location name
            geocoder.geocode({ address: locationName }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                    var coordinates = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    callback(coordinates);
                } else {
                    callback(null);
                }
            });
        }
        function smoothZoom(location, targetZoom) {
            var currentZoom = map.getZoom();
            var step = Math.abs(targetZoom - currentZoom) / 20; // Number of steps for smooth animation
            smoothZoomInterval = setInterval(function () {
                if (currentZoom < targetZoom) {
                    map.setZoom(currentZoom += step);
                    if (currentZoom >= targetZoom) {
                        clearInterval(smoothZoomInterval);
                    }
                } else {
                    map.setZoom(currentZoom -= step);
                    if (currentZoom <= targetZoom) {
                        clearInterval(smoothZoomInterval);
                    }
                }
            }, 80); // Adjust the animation duration (in milliseconds)
            map.panTo(location); // Pan to the location
        }

        function setMapBoundsForCircle(circle) {
            const bounds = circle.getBounds();
            map.fitBounds(bounds);
        }

        function drawCircle(location, radius) {
            // Clear existing circle
            if (circle) {
                circle.setMap(null);
            }
            // Add new circle
            circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: map,
                center: location,
                radius: radius, // Radius in meters
            });
            // Set map bounds to ensure the entire circle is visible
            setMapBoundsForCircle(circle);
        }
        function findMarkersWithinRadius(center, radius, markerPositions) {
          var markersWithinRadius = [];
          markerPositions.forEach(function (markerPosition) {
              var markerLocation = new google.maps.LatLng(markerPosition.lat, markerPosition.lng);
              var distance = google.maps.geometry.spherical.computeDistanceBetween(center, markerLocation);
              if (distance <= radius) {
                  markersWithinRadius.push(markerPosition);
              }
          });
          console.log("Markers within the radius:", markersWithinRadius);
          
          // Extract shop names from markersWithinRadius
          var shopNamesWithinRadius = markersWithinRadius
          .map(marker => {
              console.log("Marker:", marker); // Log the marker object
              return marker.title.trim(); // Access the title property instead of shop_name
          });
          
          // Get the values of location and radius inputs
          var locationValue = $('#location').val().trim();
          var radiusValue = $('#radius').val().trim();
          
          // Check if location input is empty or invalid
          if (locationValue === '' || isNaN(radiusValue)) {
              return; // Exit the function
          }
          
          // Retrieve coordinates only if location value is not empty
          geocodeLocation(locationValue, function(coordinates) {
              if (coordinates) {
                  // Proceed with showing/hiding .map-ajax elements based on shop name matches
                  showHideMapAjax(shopNamesWithinRadius);
              } else {
                  console.error("Unable to retrieve coordinates for the location:", locationValue);
              }
          });
        }

        // Function to geocode a location
        function geocodeLocation(location, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: location }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var coordinates = results[0].geometry.location;
                    callback(coordinates);
                } else {
                    callback(null); // Pass null if unable to retrieve coordinates
                }
            });
        }

        // Function to show/hide .map-ajax elements based on shop name matches
        function showHideMapAjax(shopNamesWithinRadius) {
            $('.skateboard-lessons-section .lessons-part .post .h4').each(function() {
                var ajaxText = $(this).text().trim();
                var found = shopNamesWithinRadius.some(function(shopName) {
                    return compareStrings(ajaxText, shopName);
                });
                console.log(ajaxText);
                console.log(shopNamesWithinRadius);
                if (found) {
                    $(this).parents('.post').show(); // Show if shop_name matches
                } else {
                    $(this).parents('.post').hide(); // Hide if not found
                }
            });
        }

        // Custom comparison function to handle special characters and case sensitivity
        function compareStrings(str1, str2) {
            // Normalize and remove special characters from both strings
            var normalizedStr1 = normalizeString(str1);
            var normalizedStr2 = normalizeString(str2);
            return normalizedStr1 === normalizedStr2;
        }

        // Function to normalize a string by decoding HTML entities and removing special characters
        function normalizeString(str) {
            // Decode HTML entities
            var tempElement = document.createElement("div");
            tempElement.innerHTML = str;
            var decodedString = tempElement.textContent || tempElement.innerText || "";

            // Remove special characters and convert to lowercase
            return decodedString.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
        }
    }

    function gradualZoom(targetZoom) {
        const currentZoom = map.getZoom();
        if (currentZoom !== targetZoom) {
            map.setZoom(currentZoom + (targetZoom > currentZoom ? 1 : -1));
            setTimeout(() => gradualZoom(targetZoom), 200); // Adjust the transition duration here (in milliseconds)
        }
    }

    initMap();
}


$(document).ready(function () {
    if ($('.skateshop-directory').length) {
        let map;
        let currentInfoWindow = null;
        let circle = null; // Define circle variable
        let smoothZoomInterval = null; // Define variable to store interval ID

        async function initMap(markerPositions) {
            // Set default center coordinates
            const defaultCenter = { lat: 54.0505571, lng: -2.7948636 }; // Change these values to set your desired default center

            // Request needed libraries.
            //@ts-ignore
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            // The map, centered at the calculated center
            map = new Map(document.getElementById("map"), {
                zoom: 5,
                center: defaultCenter,
                gestureHandling: "cooperative",
                mapId: "DEMO_MAP_ID",
            });

            // Add markers for each position
            markerPositions.forEach((markerPosition, index) => {
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: markerPosition,
                    title: markerPosition.title, // Title for the marker
                });
                marker.shopName = markerPosition.shop_name; // Additional: Shop name
                marker.shopLink = markerPosition.shop_link; // Additional: Shop link
                marker.shopAddress = markerPosition.shop_address; // Additional: Shop address
                // Add click event listener to show info window
                marker.addListener("click", () => {
                    if (currentInfoWindow) {
                        currentInfoWindow.close();
                    }
                    const contentString = `
                        <div>
                            <h3>${marker.shopName}</h3>
                            <p>Address: ${marker.shopAddress}</p>
                            <p><a href="${marker.shopLink}" target="_blank">Visit website</a></p>
                        </div>
                    `;
                    const infoWindow = new google.maps.InfoWindow({
                        content: contentString,
                    });
                    infoWindow.open(map, marker);
                    currentInfoWindow = infoWindow;
                });
            });

            // Add click event listener to '.skateshop-directory .map-ajax' elements
            $(document).on('click', '.skateshop-directory .map-ajax', function (e) {
                e.preventDefault();

                // Get latitude and longitude from data attributes of clicked element
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');

                var location = new google.maps.LatLng(lat, lng);

                // Remove the circle if it exists
                removeCircle();

                // Smoothly zoom to the location with zoom level 5
                smoothZoom(location, 15);
            });
            function removeCircle() {
                if (circle) {
                    circle.setMap(null); // Remove the circle from the map
                    $('.skateshop-directory .post-wrap .post').show();
                }
            }
            // Prevent form submission from reloading the page
            $('#searchForm').submit(function (e) {
                e.preventDefault();

                // Get location name and radius from form fields
                var locationName = $("#location").val() + ' UK';
                var radius = parseInt($("#radius").val()) * 1000; // Convert radius from kilometers to meters

                // Check if location or radius is blank or invalid
                if (!locationName.trim() || isNaN(radius) || radius <= 0) {
                    $('.map-ajax').show(); // Show all .map-ajax elements
                    removeCircle(); // Remove the circle from the map
                    return; // Exit the function
                }

                // Call the function to get coordinates from location name
                getCoordinatesFromLocationName(locationName, function (coordinates) {
                    if (coordinates) {
                        var location = new google.maps.LatLng(coordinates.lat, coordinates.lng);
                        // Draw circle on the map and adjust bounds
                        drawCircle(location, radius);
                        // Find marker positions within the radius
                        findMarkersWithinRadius(location, radius, markerPositions);
                    } else {
                        console.error("Unable to retrieve coordinates for the location:", locationName);
                    }
                });
            });
        }

        function smoothZoom(location, targetZoom) {
            var currentZoom = map.getZoom();
            var step = Math.abs(targetZoom - currentZoom) / 20; // Number of steps for smooth animation
            smoothZoomInterval = setInterval(function () {
                if (currentZoom < targetZoom) {
                    map.setZoom(currentZoom += step);
                    if (currentZoom >= targetZoom) {
                        clearInterval(smoothZoomInterval);
                    }
                } else {
                    map.setZoom(currentZoom -= step);
                    if (currentZoom <= targetZoom) {
                        clearInterval(smoothZoomInterval);
                    }
                }
            }, 80); // Adjust the animation duration (in milliseconds)
            map.panTo(location); // Pan to the location
        }

        function setMapBoundsForCircle(circle) {
            const bounds = circle.getBounds();
            map.fitBounds(bounds);
        }

        function drawCircle(location, radius) {
            // Clear existing circle
            if (circle) {
                circle.setMap(null);
            }
            // Add new circle
            circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: map,
                center: location,
                radius: radius, // Radius in meters
            });
            // Set map bounds to ensure the entire circle is visible
            setMapBoundsForCircle(circle);
        }

        function getCoordinatesFromLocationName(locationName, callback) {
            // Initialize Geocoder
            var geocoder = new google.maps.Geocoder();
            // Geocode the location name
            geocoder.geocode({ address: locationName }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                    var coordinates = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    callback(coordinates);
                } else {
                    callback(null);
                }
            });
        }

        function findMarkersWithinRadius(center, radius, markerPositions) {
            var markersWithinRadius = [];
            markerPositions.forEach(function (markerPosition) {
                var markerLocation = new google.maps.LatLng(markerPosition.lat, markerPosition.lng);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(center, markerLocation);
                if (distance <= radius) {
                    markersWithinRadius.push(markerPosition);
                }
            });
            console.log("Markers within the radius:", markersWithinRadius);
            
            // Extract shop names from markersWithinRadius
            var shopNamesWithinRadius = markersWithinRadius.map(function(marker) {
                return marker.shop_name.trim();
            });
            
            // Get the values of location and radius inputs
            var locationValue = $('#location').val().trim();
            var radiusValue = $('#radius').val().trim();
            
            // Check if location input is empty or invalid
            if (locationValue === '' || isNaN(radiusValue)) {
                return; // Exit the function
            }
            
            // Retrieve coordinates only if location value is not empty
            geocodeLocation(locationValue, function(coordinates) {
                if (coordinates) {
                    // Proceed with showing/hiding .map-ajax elements based on shop name matches
                    showHideMapAjax(shopNamesWithinRadius);
                } else {
                    console.error("Unable to retrieve coordinates for the location:", locationValue);
                }
            });
        }

        // Function to geocode a location
        function geocodeLocation(location, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: location }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var coordinates = results[0].geometry.location;
                    callback(coordinates);
                } else {
                    callback(null); // Pass null if unable to retrieve coordinates
                }
            });
        }

        // Function to show/hide .map-ajax elements based on shop name matches
        function showHideMapAjax(shopNamesWithinRadius) {
            $('.map-ajax').each(function() {
                var ajaxText = $(this).text().trim();
                // Normalize text by removing special characters and converting to lowercase
                ajaxText = ajaxText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                console.log("Normalized Text:", ajaxText);
                console.log("Shop Names Within Radius:", shopNamesWithinRadius);
                var found = shopNamesWithinRadius.some(function(name) {
                    // Normalize shop name similarly for comparison
                    var normalizedShopName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    return ajaxText.includes(normalizedShopName);
                });
                console.log("Found:", found);
                if (found) {
                    $(this).parents('.post').show(); // Show if shop_name matches
                } else {
                    $(this).parents('.post').hide(); // Hide if not found
                }
            });
        }




        // Fetch marker positions from the data attribute
        const mapElement = document.getElementById("map");
        const markerPositions = JSON.parse(mapElement.getAttribute("data-marker-positions"));

        // Initialize the map with marker positions
        initMap(markerPositions);
    }
});


