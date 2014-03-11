/*
 * Copyright (C) 2014 Glyptodon LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * The controller for the page used to connect to a connection or balancing group.
 */
angular.module('home').controller('clientController', ['$scope', '$routeParams', 
        function clientController($scope, $routeParams) {
            
    var tunnel;

     // If WebSocket available, try to use it.
     if (window.WebSocket)
         tunnel = new Guacamole.ChainedTunnel(
             new Guacamole.WebSocketTunnel("websocket-tunnel"),
             new Guacamole.HTTPTunnel("tunnel")
         );

     // If no WebSocket, then use HTTP.
     else
         tunnel = new Guacamole.HTTPTunnel("tunnel")

     // Instantiate client
     var guac = new Guacamole.Client(tunnel);

     // Add client to UI
     guac.getDisplay().className = "software-cursor";
     GuacUI.Client.display.appendChild(guac.getDisplay());

     // Tie UI to client
     GuacUI.Client.attach(guac);

     try {

         // Calculate optimal width/height for display
         var pixel_density = window.devicePixelRatio || 1;
         var optimal_dpi = pixel_density * 96;
         var optimal_width = window.innerWidth * pixel_density;
         var optimal_height = window.innerHeight * pixel_density;

         // Scale width/height to be at least 600x600
         if (optimal_width < 600 || optimal_height < 600) {
             var scale = Math.max(600 / optimal_width, 600 / optimal_height);
             optimal_width = optimal_width * scale;
             optimal_height = optimal_height * scale;
         }

         // Get entire query string, and pass to connect().
         // Normally, only the "id" parameter is required, but
         // all parameters should be preserved and passed on for
         // the sake of authentication.

         var connect_string =
             "id="        + $routeParams.type
             + "/"        + $routeParams.id
             + "&width="  + Math.floor(optimal_width)
             + "&height=" + Math.floor(optimal_height)
             + "&dpi="    + Math.floor(optimal_dpi);

         // Add audio mimetypes to connect_string
         GuacUI.Audio.supported.forEach(function(mimetype) {
             connect_string += "&audio=" + encodeURIComponent(mimetype);
         });

         // Add video mimetypes to connect_string
         GuacUI.Video.supported.forEach(function(mimetype) {
             connect_string += "&video=" + encodeURIComponent(mimetype);
         });

         guac.connect(connect_string);

     }
     catch (e) {
         GuacUI.Client.showError("Cannot Connect", e.message);
     }

}]);
