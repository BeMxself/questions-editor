<template>
  <div>
    <table :class="$style.options">
      <thead>
        <tr>
          <th></th>
          <th>数值范围</th>
          <th>等级</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody ref="levels">
        <tr :key="index" v-for="(item, index) in localValue">
          <td>
            <el-tag class="sort-handle" size="small" type="info">:::</el-tag>
          </td>
          <td>
            <expression-editor v-model="item.range" />
          </td>
          <td>
            <el-input size="mini" v-model="item.level" />
          </td>
          <td>
            <el-button-group>
              <el-button
                @click="handleAddLevel(index)"
                icon="el-icon-plus"
                plain
                size="small"
                type="primary"
              />
              <el-button
                :disabled="!index"
                @click="handleRemoveLevel(index)"
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
  </div>
</template>
<script>
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import SortableMixin from '@/mixins/SortableMixin'
import ExpressionEditor from '@/common/ExpressionEditor.vue'
import cloneDeep from '@/utils/cloneDeep'

const LevelDefault = { range: { '=': 0 }, level: '无' }

export default {
  mixins: [
    LocalValueBindingMixin({
      valueType: Array,
      default: () => [cloneDeep(LevelDefault)],
      needReset: (v) => !(v && v.length),
    }),
    SortableMixin({ refName: 'levels', updateDataArray: 'localValue' }),
  ],
  components: {
    ExpressionEditor,
  },
  methods: {
    handleAddLevel(index) {
      this.localValue.splice(index + 1, 0, cloneDeep(LevelDefault))
    },
    handleRemoveLevel(index) {
      this.localValue.splice(index, 1)
    },
  },
}
</script>
<style src="../common/style.module.css" module></style>
