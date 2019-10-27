import constants from '../constants.js';

export default {
  bleState (state, value) {
    state.bleState = value;
  },

  peripheral (state, value) {
    state.peripheral = value;
  },

  service (state, services) {
    state.service = services[0];
  },

  characteristic (state, characteristics) {
    state.characteristic = characteristics[0];
  },

  disconnect (state) {
    state.peripheral.disconnect();
  },

  subscribeConnection (state) {
    state.peripheral.once('connect', () => {
      state.connectState = true;
    });

    state.peripheral.once('disconnect', () => {
      state.connectState = false;
    });
  },

  togglePort (state, id) {
    state.ports.find((item) => {
      if(item.id === id) {
        item.isActive = !item.isActive;
      }
    });
  },

  incrementPortValue (state, {id, getters}) {
    state.ports.find((item) => {
      if(item.id === id) {
        if (item.value >= constants.MAX_PORT_VALUE) {
          return;
        }

        item.value = item.value + 10;
        state.characteristic.write(getters.characteristicMessage(id, item.value), false);
      }
    });
  },

  resetPortValue (state, {id, getters}) {
    state.ports.find((item) => {
      if(item.id === id) {
        item.value = 0;
        state.characteristic.write(getters.characteristicMessage(id, item.value), false);
      }
    });
  },

  decrementPortValue (state, {id, getters}) {
    state.ports.find((item) => {
      if(item.id === id) {
        if (item.value <= constants.MIN_PORT_VALUE) {
          return;
        }

        item.value = item.value - 10;
        state.characteristic.write(getters.characteristicMessage(id, item.value), false);
      }
    });
  },

  setPortValue (state, {data, getters}) {
    state.ports.find((item) => {
      if(item.id === data.id) {
        if (item.value < constants.MIN_PORT_VALUE || item.value > constants.MAX_PORT_VALUE) {
          return;
        }

        item.value = data.value;
        state.characteristic.write(getters.characteristicMessage(data.id, item.value), false);
      }
    });
  },

  enableMode (state, modeIndex) {
    state.modes.map((item, index) => {
      item.isActive = index === modeIndex;
    });
  },

  addTimeLineItem (state, data) {
    data.id = state.timeLine.length + 1;
    state.timeLine.push(data);
  },

  updateTimeLine (state, data) {
    state.timeLine = data;
  },

  play (state, isPlay) {
    state.player.isPlay = isPlay;
  },

  repeatToggle (state) {
    state.player.isRepeat = !state.player.isRepeat;
  },

  step (state, stepIndex) {
    state.player.stepIndex = stepIndex;
  },
};
