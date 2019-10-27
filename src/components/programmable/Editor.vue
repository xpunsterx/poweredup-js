<template>
    <div class="programmable-editor">
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field>
                    <label for="editor-value">
                        Value
                    </label>
                    <md-input id="editor-value" v-model="value"></md-input>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-field>
                    <label for="editor-duration">
                        Duration
                    </label>
                    <md-input id="editor-duration" v-model="duration"></md-input>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-field>
                    <label for="editor-port">
                        Port
                    </label>
                    <md-select v-model="port" name="editor-port" id="editor-port">
                        <md-option v-for="(item, index) in ports"
                                :value="item.id"
                                :key="`port-${index}`"
                                :selected="item.id === port">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-button class="md-raised md-primary" @click="onAddBtnClick">
                    Add
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Editor',
  data: () => {
    return {
      value: null,
      duration: null,
      port: null
    };
  },
  mounted() {
    this.value = 0;
    this.duration = 0;
    this.port = this.ports[0].id;
  },
  methods: {
    onAddBtnClick() {
      this.$store.dispatch('addTimeLineItem', {
        value: this.value,
        duration: this.duration,
        port: this.port
      });
    }
  },
  computed: {
    ...mapState([
      'ports'
    ])
  }
};
</script>
