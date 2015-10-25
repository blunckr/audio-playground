module.exports = {
  AudioContext: new (AudioContext || webkitGetAudioContext)(),

  getUserMedia(options, success, error){
    if(navigator.mediaDevices !== undefined) {
      navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
    } else {
      navigator.webkitGetUserMedia(options, success, error);
    }
  }
}
