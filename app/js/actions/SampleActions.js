import Dispatcher from '../Dispatcher';
import SampleConstants from '../constants/SampleConstants';

module.exports = {
  create() {
    Dispatcher.dispatch({
      actionType: SampleConstants.CREATE
    });
  },

  addAudioNode(id, audioNode) {
    Dispatcher.dispatch({
      actionType: SampleConstants.ADD_AUDIO_NODE,
      id, audioNode
    });
  },

  stopRecording() {
    Dispatcher.dispatch({
      actionType: SampleConstants.STOP_RECORDING
    });
  },

  toggleLooping(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.TOGGLE_LOOPING,
      id
    });
  },

  destroy(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.DESTROY,
      id
    });
  }


};
