<template>
  <el-descriptions :column="6" :labelStyle="{width: '100px'}" border size="small">
    <el-descriptions-item contentStyle="width: 90px;" label="序号">
      <el-input :readonly="readonly" size="small" v-model="localValue.no" />
    </el-descriptions-item>
    <el-descriptions-item :label="topicDisplayName" :span="4">
      <el-input :readonly="readonly" size="small" v-model="localValue.topic" />
    </el-descriptions-item>
    <el-descriptions-item contentStyle="width: 100px;" label="标准分值">
      <el-input-number
        :disabled="readonly"
        controls-position="right"
        size="small"
        style="width:100px"
        v-model="localValue.points"
      />
    </el-descriptions-item>
    <el-descriptions-item :span="6" label="备注">
      <el-input :readonly="readonly" type="textarea" v-model="localValue.description" />
    </el-descriptions-item>
    <el-descriptions-item :label="optionsDisplayName" :span="6">
      <slot />
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'

export default {
  mixins: [LocalValueBindingMixin()],
  props: {
    hideStandardPoints: { type: Boolean, default: false },
    topicDisplayName: { type: String, default: '字段名' },
    optionsDisplayName: { type: String, default: '选项' },
    value: { type: Object, default: () => ({}) },
    readonly: { type: Boolean, default: false },
  },
}
</script>