import React from 'react';
import Layout from './components/Layout.jsx';

React.render(<Layout />, document.getElementById("app"));

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


// audio.createScriptProcessor to create your own thing
