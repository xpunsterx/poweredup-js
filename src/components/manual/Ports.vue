<template>
  <ul class="port-switcher">
    <li class="port-switcher-item" v-for="(item, index) in ports" :key="`port-${index}`" @click="onUsePortBtnClick(item.id)">
      <PortImg cssClass="port-switcher-item__img" width="130" height="55" :isActive="item.isActive" v-if="item.id !== 57" />
      <PortImg cssClass="port-switcher-item__img" width="60" height="25" :isActive="item.isActive" v-if="item.id === 57" />
      <PortImg cssClass="port-switcher-item__img" width="60" height="25" :isActive="item.isActive" v-if="item.id === 57" />
      <p class="port-switcher-item__text">
        {{ item.name }}
      </p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import PortImg from './PortImg.vue';

export default {
  name: 'Ports',
  components: {
    PortImg
  },
  methods: {
    onUsePortBtnClick(id) {
      this.$store.dispatch('togglePort', id);
    },
  },
  computed: {
    ...mapState([
      'ports'
    ])
  }
};
</script>
