<template>
  <div class="editor-wrapper">
    <div class="operate-panel">
      <div>
        <el-button
          :icon="expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          @click="expanded = !expanded"
          size="mini"
          type="text"
          v-if="toggleButton"
        ></el-button>
        <el-tag class="sort-handle" size="small" type="info" v-if="dragHandle">:::</el-tag>
        <slot name="operations-left" />
      </div>
      <div v-if="!expanded">{{value.topic || '[空]'}}</div>
      <div>
        <slot name="operations-right" />
      </div>
    </div>
    <transition name="fade">
      <div class="body" v-if="expanded">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) },
    toggleButton: { type: Boolean, default: true },
    dragHandle: { type: Boolean, default: true },
    isSynced: { type: Boolean, default: true },
  },
  data() {
    return {
      expanded: true,
    }
  },
}
</script>
<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 5px 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 0 4px #eee;
}
.editor-wrapper > .operate-panel {
  padding: 5px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
}
.editor-wrapper > .operate-panel .sort-handle {
  cursor: move;
  cursor: -webkit-grabbing;
  margin: 0 10px;
}
.editor-wrapper > :last-child {
  flex-grow: 1;
  flex-shrink: 0;
}
.editor-wrapper > .body {
  margin-top: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.25s;
}
.fade-enter,
.fade-leave-to {
  transform-origin: top;
  transform: scaleY(0);
}
.fade-leave,
.fade-enter-to {
  transform-origin: top;
  transform: scaleY(1);
}
</style>