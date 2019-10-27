<template>
    <div>
        <Controls />
        <Editor />
        <TimeLine />
    </div>
</template>

<script>
import Controls from './Controls.vue';
import TimeLine from './TimeLine.vue';
import Editor from './Editor.vue';

export default {
  name: 'Manual',
  components: {
    Controls, TimeLine, Editor
  }
};
</script>
