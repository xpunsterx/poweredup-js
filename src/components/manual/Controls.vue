<template>
    <ul class="port-controls">
        <Control v-for="(item, index) in ports" :key="`control-${index}`" :port="item" />
    </ul>
</template>

<script>
import { mapState } from 'vuex';
import Control from './Control.vue';

export default {
  name: 'Controls',
  components: {
    Control
  },
  props: [
    'port'
  ],
  computed: {
    ...mapState([
      'ports'
    ])
  }
};
</script>
