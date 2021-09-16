<template>
  <question-frame v-model="localValue">
    <table :class="$style.ranges">
      <thead>
        <tr>
          <th style="width: 40px"></th>
          <th>数值范围</th>
          <th style="width: 120px">分值加减</th>
          <th style="width: 120px">操作</th>
        </tr>
      </thead>
      <tbody ref="optionsContainer">
        <tr :key="index" v-for="(item, index) in localValue.options">
          <td>
            <el-tag class="sort-handle" size="small" type="info">:::</el-tag>
          </td>
          <td>
            <expression-editor v-model="item.range" />
          </td>
          <td>
            <el-input-number
              controls-position="right"
              size="small"
              style="width:100px"
              v-model="item.points"
            />
          </td>
          <td>
            <el-button-group>
              <el-button
                @click="handleAddRange(index)"
                icon="el-icon-plus"
                plain
                size="small"
                type="primary"
              />
              <el-button
                :disabled="!index"
                @click="handleRemoveRange(index)"
                icon="el-icon-delete"
                plain
                size="small"
                type="danger"
              />
            </el-button-group>
          </td>
        </tr>
      </tbody>
    </table>
  </question-frame>
</template>
<script>
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import SortableMixin from '@/mixins/SortableMixin'
import cloneDeep from '@/utils/cloneDeep'
import QuestionFrame from '@/common/QuestionFrame.vue'
import ExpressionEditor from '@/common/ExpressionEditor.vue'

const defaultProps = {
  no: '',
  topic: '',
  points: 0,
  description: '',
  options: [{ range: { '=': 0 }, points: 0 }],
}

export default {
  mixins: [
    LocalValueBindingMixin({
      default: () => cloneDeep(defaultProps),
      needReset: (v) => !(v && v.options && v.options.length),
    }),
    SortableMixin({
      refName: 'optionsContainer',
      updateDataArray: 'localValue.options',
    }),
  ],
  components: { ExpressionEditor, QuestionFrame },
  methods: {
    handleAddRange(index) {
      this.localValue.options.splice(
        index + 1,
        0,
        cloneDeep(defaultProps.options[0])
      )
    },
    handleRemoveRange(index) {
      this.localValue.options.splice(index, 1)
    },
  },
}
</script>
<style src="../../common/style.module.css" module></style>
<style scoped>
.sort-handle {
  cursor: move;
  cursor: -webkit-grabbing;
}
.sort-item-ghost {
  background: rgba(135, 207, 235, 0.2);
}
</style>