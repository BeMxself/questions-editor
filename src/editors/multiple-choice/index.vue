<template>
  <question-frame :readonly="readonly" v-model="localValue">
    <table :class="$style.options">
      <thead>
        <tr>
          <th style="width: 40px"></th>
          <th>选项</th>
          <th style="width: 120px">分值加减</th>
          <th style="width: 120px">操作</th>
        </tr>
      </thead>
      <tbody ref="optionsContainer">
        <tr
          :class="{'ignore-sort': readonly}"
          :key="item.__id"
          v-for="(item, index) in localValue.options"
        >
          <td>
            <el-tag class="sort-handle" size="small" type="info">:::</el-tag>
          </td>
          <td>
            <el-input :readonly="readonly" size="small" v-model="item.content" />
          </td>
          <td>
            <el-input-number
              :readonly="readonly"
              controls-position="right"
              size="small"
              style="width:100px"
              v-model="item.points"
            />
          </td>
          <td>
            <el-button-group>
              <el-button
                @click="handleAddOption(index)"
                icon="el-icon-plus"
                plain
                size="small"
                type="primary"
              />
              <el-button
                :disabled="!index"
                @click="handleRemoveOption(index)"
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
import QuestionFrame from '@/common/QuestionFrame.vue'
import cloneDeep from '@/utils/cloneDeep'

const defaultProps = {
  no: '',
  topic: '',
  points: 0,
  description: '',
  options: [{ content: '', points: 0 }],
}

export default {
  mixins: [
    LocalValueBindingMixin({
      default: () => cloneDeep(defaultProps),
      needReset: (v) => !(v && v.options && v.options.length) && !v.topic,
    }),
    SortableMixin({
      refName: 'optionsContainer',
      updateDataArray: 'localValue.options',
    }),
  ],
  props: {
    readonly: { type: Boolean, default: false },
  },
  components: {
    QuestionFrame,
  },
  methods: {
    handleAddOption(index) {
      if (this.readonly) return
      this.localValue.options.splice(
        index + 1,
        0,
        cloneDeep(defaultProps.options[0])
      )
    },
    handleRemoveOption(index) {
      if (this.readonly) return
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
</style>