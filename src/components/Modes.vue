<template>
    <div class="footer">
        <md-tabs class="md-primary" md-alignment="centered">
            <md-tab :md-label="item.title"
                    v-for="(item, index) in modes"
                    :key="`mode-title-${index}`"
                    @click="onModeTitleClick(index)">
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Modes',
  created() {
    this.$store.dispatch('enableMode', 0);
  },
  methods: {
    onModeTitleClick(index) {
      this.$store.dispatch('enableMode', index);
    }
  },
  computed: {
    ...mapState([
      'modes'
    ])
  }
};
</script>

<style lang="scss" scoped>
    .footer {
        width: 100%;
    }

    .footer-item {
        width: 50%;
    }
</style>
