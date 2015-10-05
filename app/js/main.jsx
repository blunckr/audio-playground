var React = require("react");
var TodoApp = require("./components/TodoApp.jsx");

React.render(<TodoApp />, document.getElementById("app"));

// var audio = new (AudioContext || webkitGetAudioContext)();
//
// function getUserMedia(options, success, error){
//   if(navigator.mediaDevices != undefined) {
//     navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
//   } else {
//     navigator.webkitGetUserMedia(options, success, error);
//   }
// }
//
// getUserMedia({audio: true}, (stream) => {
//     var source = audio.createMediaStreamSource(stream);
//     source.connect(audio.destination);
//   }, (err) => {
//     alert("You need to give permission to use your microphone and refresh the page");
//   }
// );
//
// React.render(<Index name="Ryker" />, document.getElementById("app"));
