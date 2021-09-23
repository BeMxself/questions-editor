<template>
  <div class="group">
    <div class="header">
      <el-descriptions :labelStyle="{width: '100px'}" border size="mini">
        <el-descriptions-item contentStyle="width: 100px" label="序号">
          <el-input size="mini" v-model="localValue.no" />
        </el-descriptions-item>
        <el-descriptions-item label="分组名">
          <el-input size="mini" v-model="localValue.topic" />
        </el-descriptions-item>
        <el-descriptions-item contentStyle="width: 120px" label="记分方式">
          <el-select :disabled="readonly" size="mini" v-model="localValue.scoreType">
            <el-option label="累加" value="sum" />
            <el-option label="最大" value="max" />
            <el-option label="最小" value="min" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-input type="textarea" v-model="localValue.description" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="children" ref="questionsContainer">
      <slot />
    </div>
  </div>
</template>
<script>
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import SortableMixin from '@/mixins/SortableMixin'
import cloneDeep from '@/utils/cloneDeep'

const defaultProps = {
  no: '',
  topic: '',
  scoreType: 'sum',
  description: '',
  children: [],
}

export default {
  props: {
    readonly: { type: Boolean, default: false },
  },
  mixins: [
    LocalValueBindingMixin({
      default: () => cloneDeep(defaultProps),
      needReset: (v) => !v || !v.children,
    }),
    SortableMixin({
      refName: 'questionsContainer',
      updateDataArray: 'localValue.children',
    }),
  ],
}
</script>
<style scoped>
.group > .header {
  background-color: silver;
  margin: auto 0px;
  margin-bottom: 10px;
}
.group > .children {
  background-color: #fff8;
  padding: 0.1px 0 15px;
  width: 100%;
  border-radius: 6px;
}
</style>