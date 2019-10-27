<template>
    <div>
        <Ports />
        <Controls />
    </div>
</template>

<script>
import Ports from './Ports.vue';
import Controls from './Controls.vue';

export default {
  name: 'Manual',
  components: {
    Ports, Controls
  },
  data: () => ({
    showDialog: false
  })
};
</script>
