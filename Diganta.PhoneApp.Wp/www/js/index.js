var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var app = {
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function () {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        //app.report('deviceready');
        app.deviceinformation();
        app.accelerometer();
        app.geolocation();

        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;

    },
    deviceinformation: function () {
        var element = document.getElementById('deviceProperties');

        element.innerHTML = 'Device Name: ' + device.name + '<br />' +
                            'Device Cordova: ' + device.cordova + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: ' + device.uuid + '<br />' +
                            'Device Version: ' + device.version + '<br />';
    },
    accelerometer: function () {
        var element = document.getElementById('accelerometer');
        //navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
        navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 1000 });

        function onSuccess(acceleration) {
            element.innerHTML =
                        'Acceleration X: ' + acceleration.x + '<br />' +
                          'Acceleration Y: ' + acceleration.y + '<br />' +
                          'Acceleration Z: ' + acceleration.z + '<br />' +
                          'Timestamp: ' + acceleration.timestamp + '<br />';
        }

        function onError() {
            alert('onError!');
        }
    },
    capturePhoto: function () {

        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 50,
            destinationType: destinationType.DATA_URL
        });

    },
    getPhoto: function (source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source
        });
    },
    capturePhotoEdit: function () {

        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
        navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 20, allowEdit: true,
            destinationType: destinationType.DATA_URL
        });

    },
    onPhotoDataSuccess: function (imageData) {
        // Uncomment to view the base64 encoded image data
        // console.log(imageData);

        // Get image handle
        //
        var smallImage = document.getElementById('smallImage');

        // Unhide image elements
        //
        smallImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    onPhotoURISuccess: function (imageUri) {
        // Uncomment to view the image file URI 
        // console.log(imageURI);

        // Get image handle
        //
        var largeImage = document.getElementById('largeImage');

        // Unhide image elements
        //
        largeImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        largeImage.src = imageUri;
    },
    geolocation: function () {
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 1000 });
        function onSuccess(position) {
            var element = document.getElementById('geolocation');
            element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />' +
                            'Altitude: ' + position.coords.altitude + '<br />' +
                            'Accuracy: ' + position.coords.accuracy + '<br />' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                            'Heading: ' + position.coords.heading + '<br />' +
                            'Speed: ' + position.coords.speed + '<br />' +
                            'Timestamp: ' + position.timestamp + '<br />';
        }
        function onError(error) {
            alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
        }
    },
    report: function (id) {
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
    onFail: function () {
        alert('Failed because: ' + message);
    }
};
