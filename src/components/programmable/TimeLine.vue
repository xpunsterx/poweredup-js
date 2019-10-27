<template>
    <div class="programmable-timeline">
        <draggable class="programmable-timeline__list" v-model="itemList">
            <div :class="[
                {'programmable-timeline-item': true},
                {'programmable-timeline-item_active': player.stepIndex === index},
            ]"
                 v-for="(item, index) in timeLine"
                 :key="`programmable-timeline-item-${timeLine[index].id}`">
                <ul class="programmable-timeline-item__props">
                    <li class="programmable-timeline-item__props-item">value: {{ item.value }};</li>
                    <li class="programmable-timeline-item__props-item">duration: {{ item.duration }};</li>
                    <li class="programmable-timeline-item__props-item">port: {{ portById(item.port).name }};</li>
                </ul>

                <md-button class="programmable-timeline-item__btn md-fab md-mini md-raised md-primary" @click="onRemoveItemBtnClick(index)">
                    <span class="programmable-timeline-item__icon-delete" />
                </md-button>
            </div>
        </draggable>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'TimeLine',
  components: {
    draggable
  },
  methods: {
    onRemoveItemBtnClick(index) {
      this.itemList.splice(index,1);
    }
  },
  computed: {
    ...mapState([
      'timeLine', 'ports', 'player'
    ]),
    ...mapGetters([
      'portById'
    ]),
    itemList: {
      get() {
        return this.$store.state.timeLine;
      },
      set(value) {
        this.$store.commit('updateTimeLine', value);
      }
    }
  }
};
</script>
