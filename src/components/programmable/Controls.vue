<template>
    <ul class="programmable-controls">
        <li class="programmable-control-item">
            <md-button class="programmable-control-item__btn md-fab md-raised md-primary" @click="onPlayBtnClick" :disabled="player.isPlay">
                <i class="programmable-control-item__icon programmable-control-item__icon_play"></i>
            </md-button>
        </li>

        <li class="programmable-control-item">
            <md-button class="programmable-control-item__btn md-fab md-raised md-primary" @click="onStopBtnClick" :disabled="!player.isPlay">
                <i class="programmable-control-item__icon programmable-control-item__icon_stop"></i>
            </md-button>
        </li>

        <li class="programmable-control-item">
            <md-button class="programmable-control-item__btn md-fab md-raised md-primary" @click="onPauseBtnClick" :disabled="!player.isPlay">
                <i class="programmable-control-item__icon programmable-control-item__icon_pause"></i>
            </md-button>
        </li>

        <li class="programmable-control-item">
            <md-button class="programmable-control-item__btn md-fab md-raised md-primary" @click="onRepeatBtnClick">
                <svg class="programmable-control-item__icon programmable-control-item__icon_repeat"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 500 500" xml:space="preserve" width="20" height="18">
                    <path :fill="player.isRepeat ? '#64dd17' : '#FFFFFF'" d="M507.336,100.696l-96-96c-4.576-4.576-11.456-5.952-17.44-3.456c-5.984,2.496-9.888,8.288-9.888,14.752v48h-208
                        c-97.216,0-176,78.784-176,176c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16c0-44.192,35.808-80,80-80h208v48
                        c0,6.464,3.904,12.32,9.888,14.784c5.984,2.496,12.864,1.12,17.44-3.456l96-96C513.576,117.08,513.576,106.936,507.336,100.696z"
                    />

                    <path :fill="player.isRepeat ? '#64dd17' : '#FFFFFF'" d="M496.008,255.992h-64c-8.832,0-16,7.168-16,16c0,44.192-35.808,80-80,80h-208v-48c0-6.464-3.904-12.32-9.888-14.784
                        s-12.832-1.088-17.44,3.488l-96,96c-6.24,6.24-6.24,16.384,0,22.624l96,96c4.576,4.576,11.456,5.952,17.44,3.456
                        s9.888-8.32,9.888-14.784v-48h208c97.216,0,176-78.784,176-176C512.008,263.16,504.84,255.992,496.008,255.992z"/>
                </svg>
            </md-button>
        </li>
    </ul>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Controls',
  data: () => {
    return {
      timerId: null
    };
  },
  methods: {
    onPlayBtnClick() {
      this.$store.dispatch('play', true);
      this.playProcess();
    },
    onStopBtnClick() {
      clearTimeout(this.timerId);
      this.$store.dispatch('play', false);
      this.$store.dispatch('step', 0);
      this.$store.dispatch('stopAllPort');
    },
    onPauseBtnClick() {
      clearTimeout(this.timerId);
      this.$store.dispatch('play', false);
    },
    onRepeatBtnClick() {
      this.$store.dispatch('repeatToggle');
    },
    onPlayIterationEnd() {
      console.log('done');
      if (this.player.isRepeat && this.player.isPlay) {
        this.playProcess();
      } else {
        this.$store.dispatch('play', false);
        this.$store.dispatch('stopAllPort');
      }
    },
    async playProcess() {
      for (const item in this.timeLine) {
        if (item < this.player.stepIndex) {
          continue;
        }

        if (!this.player.isPlay) {
          break;
        }

        await this.playItem(this.timeLine[item]);
      }
      this.onPlayIterationEnd();
    },
    async playItem(item) {
      this.$store.dispatch('setPortValue', {
        id: item.port,
        value: item.value
      });

      console.log('start', item.duration);
      await this.delayItem(item.duration);
      console.log('end', item.duration);

      if (this.player.isPlay) {
        const index = this.stepIndexById(item.id) + 1 < this.timeLine.length ? this.stepIndexById(item.id) + 1 : 0;
        this.$store.dispatch('step', index);
      }
    },
    delayItem(duration) {
      return new Promise(resolve => {
        this.timerId = setTimeout(resolve, duration);
      });
    },
  },
  computed: {
    ...mapState([
      'timeLine', 'player'
    ]),
    ...mapGetters([
      'stepIndexById'
    ])
  },
};
</script>
