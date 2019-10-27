<template>
    <li class="port-control-item" v-if="port.isActive">
        <header class="port-control-item__header">
            <p class="port-control-item__title">
                Port:
                <strong>
                    {{ port.name }}
                </strong>
            </p>

            <div class="port-control-item__controls">
                <div class="input-number">
                    <md-button class="md-icon-button md-raised md-primary" @click="onMinusBtnClick">
                        <md-icon>-</md-icon>
                    </md-button>

                    <input class="input-number__text" v-model="port.value" type="number" />

                    <md-button class="md-icon-button md-raised md-primary" @click="onPlusBtnClick">
                        <md-icon>+</md-icon>
                    </md-button>
                </div>

                <md-button class="md-raised md-primary" @click="onStopsBtnClick">
                    Reset
                </md-button>
            </div>
        </header>

        <VueSlider v-model="port.value"
                   :min="constants.MIN_PORT_VALUE"
                   :max="constants.MAX_PORT_VALUE"
                   :interval="10"
                   @change="onSliderChange"
                   :marks="true" />
    </li>
</template>

<script>
import constants from './../../constants.js';

export default {
  name: 'Control',
  props: [
    'port'
  ],
  data: () => {
    return {
      constants
    };
  },
  methods: {
    onPlusBtnClick() {
      this.$store.dispatch('incrementPortValue', this.port.id);
    },
    onStopsBtnClick() {
      this.$store.dispatch('resetPortValue', this.port.id);
    },
    onMinusBtnClick() {
      this.$store.dispatch('decrementPortValue', this.port.id);
    },
    onSliderChange(value) {
      this.$store.dispatch('setPortValue', {
        id: this.port.id,
        value: value
      });
    }
  }
};
</script>
