<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <Header />
      </md-app-toolbar>

      <md-app-content md-permanent="full">
        <Manual v-if="modes[0].isActive && connectState" />
        <Programmable v-if="modes[1].isActive && connectState" />
        <div class="waiting" v-if="!connectState">
          <p class="waiting__title">
            Waiting for connection ...
          </p>
          <p class="waiting__description">
            Turn on your POWERED UP device and press search button.
          </p>
          <md-progress-spinner :md-diameter="100"
                               :md-stroke="10"
                               md-mode="indeterminate" />
        </div>

      </md-app-content>
    </md-app>

    <div class="phone-viewport">
      <md-bottom-bar class="md-accent" md-type="shift">
        <Modes />
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';
import Modes from './components/Modes.vue';
import Manual from './components/manual/Manual.vue';
import Programmable from './components/programmable/Programmable.vue';

export default {
  name: 'app',
  components: {
    Header, Modes, Manual, Programmable
  },
  created() {
    this.$store.dispatch('subscribeBleState');
    this.$store.dispatch('subscribeDiscover');
  },
  computed: {
    ...mapState([
      'modes', 'connectState'
    ])
  }
};
</script>

<style lang="scss" scoped>
  .md-app {
    height: calc(100vh - 48px);
    border: 1px solid rgba(#000, .12);
  }
</style>
