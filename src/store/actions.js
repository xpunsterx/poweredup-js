import noble from 'noble';
import constants from '../constants.js';

export default {
  subscribeBleState({ commit }) {
    noble.on('stateChange', (bleState) => {
      commit('bleState', bleState);
      if (bleState !== 'poweredOn') {
        noble.stopScanning();
      }
    });
  },

  subscribeDiscover({ commit, dispatch }) {
    noble.on('discover', (peripheral) => {
      commit('peripheral', peripheral);
      commit('subscribeConnection');
      dispatch('connect').then(() => {
        dispatch('discoverServices').then(() => {
          dispatch('discoverCharacteristics');
        });
      });
    });
  },

  search() {
    noble.startScanning([constants.HUB_UUID]);
  },

  connect ({ state }) {
    return new Promise((resolve) => {
      state.peripheral.connect(() => {
        resolve();
      });
    });
  },

  disconnect({ commit }) {
    commit('disconnect');
  },

  discoverServices ({ commit, state }) {
    return new Promise((resolve) => {
      state.peripheral.discoverServices([this.HUB_UUID], (error, services) => {
        commit('service', services);
        resolve();
      });
    });
  },

  discoverCharacteristics ({ commit, state }) {
    return new Promise((resolve) => {
      state.service.discoverCharacteristics(null, (error, characteristics) => {
        commit('characteristic', characteristics);
        resolve();
      });
    });
  },

  togglePort({ commit }, id) {
    commit('togglePort', id);
  },

  incrementPortValue({ commit, getters }, id) {
    commit('incrementPortValue', {id, getters});
  },

  resetPortValue({ commit, getters }, id) {
    commit('resetPortValue', {id, getters});
  },

  decrementPortValue({ commit, getters }, id) {
    commit('decrementPortValue', {id, getters});
  },

  setPortValue({ commit, getters }, data) {
    commit('setPortValue', {data, getters});
  },

  stopAllPort({ commit, state, getters }) {
    state.ports.map((item) => {
      commit('setPortValue', {data: {
        id: item.id,
        value: 0
      }, getters});
    });
  },

  enableMode ({ commit }, modeIndex) {
    commit('enableMode', modeIndex);
  },

  addTimeLineItem ({ commit }, data) {
    commit('addTimeLineItem', data);
  },

  updateTimeLine ({ commit }, data) {
    commit('updateTimeLine', data);
  },

  play ({ commit }, isPlay) {
    commit('play', isPlay);
  },

  repeatToggle ({ commit }) {
    commit('repeatToggle');
  },

  step ({ commit }, stepIndex) {
    commit('step', stepIndex);
  },
};
