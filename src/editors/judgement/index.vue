<template>
  <question-frame v-model="localValue">
    <table :class="$style.options">
      <thead>
        <tr>
          <th>判断</th>
          <th style="width:240px">分值加减</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>是</td>
          <td>
            <el-input-number
              controls-position="right"
              size="small"
              style="width:100px"
              v-model="localValue.options[0].points"
            />
          </td>
        </tr>
        <tr>
          <td>否</td>
          <td>
            <el-input-number
              controls-position="right"
              size="small"
              style="width:100px"
              v-model="localValue.options[1].points"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </question-frame>
</template>
<script>
import QuestionFrame from '@/common/QuestionFrame.vue'
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import cloneDeep from '@/utils/cloneDeep'

const defaultProps = {
  no: '',
  topic: '',
  points: 0,
  description: '',
  options: [{ points: 0 }, { points: 0 }],
}

export default {
  mixins: [
    LocalValueBindingMixin({
      valueType: Object,
      default: () => cloneDeep(defaultProps),
      needReset: (v) => !(v && v.options && v.options.length === 2),
    }),
  ],
  components: {
    QuestionFrame,
  },
}
</script>
<style src="../../common/style.module.css" module></style>