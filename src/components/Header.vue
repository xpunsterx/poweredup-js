<template>
  <div class="header">
    <div class="ble-state">
      <svg class="ble-state__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 976">
        <rect ry="291" height="976" width="640" :fill="iconColor"/>
        <path d="m157,330,305,307-147,178v-636l147,170-305,299" stroke="#FFF" stroke-width="53" fill="none"/>
      </svg>

      <md-tooltip md-direction="right">
        Bluetooth adapter state:
        <strong>
          {{ bleState }}
        </strong>
      </md-tooltip>
    </div>

    <div class="device-state device-state_connected" v-if="connectState">
        <span class="device-state__text">
            connected
        </span>
        <i class="device-state__icon" />
    </div>
    <div class="device-state device-state_disconnected" v-else>
        <span class="device-state__text">
            disconnected
        </span>
        <i class="device-state__icon" />
    </div>

    <div>
      <md-button @click="onStartScanningBtnClick" class="md-raised md-accent" v-if="!connectState">
        Search
      </md-button>
      <md-button @click="onStopScanningBtnClick" class="md-raised md-accent" v-if="connectState">
        Disconnect
      </md-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  methods: {
    onStartScanningBtnClick() {
      this.$store.dispatch('search');
    },

    onStopScanningBtnClick() {
      this.$store.dispatch('disconnect');
    }
  },

  computed: {
    ...mapState([
      'bleState', 'connectState'
    ]),
    iconColor() {
      return this.bleState === 'poweredOn' ? '#0a3d91' : '#333333';
    }
  }
};
</script>
