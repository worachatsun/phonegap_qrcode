/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var resultDiv;
document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}
function startScan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
            // window.open('https://www.google.co.th/#q='+result.text, '_system')
            // $.ajax({
            //   type: "GET",
            //   dataType: "json",
            //   url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+result.text,
            //   success: function() {
            //       navigator.notification.alert("Success!");
            //   },
            //   error: function(jqXHR, textStatus, errorThrown) {
            //       console.log('error');
            //   }
            // });
            $.ajax({url: "http://boszer.me/5fe57832fa2da80dc3543a3e893e589d/"+result.text, success: function(result){
                console.log(result)
            }});
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}
