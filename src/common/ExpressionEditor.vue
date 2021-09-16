<template>
  <div>
    <el-select
      :value="expressions[0].operator"
      @input="handle1stOperatorInput"
      placeholder
      size="small"
      style="width: 80px"
    >
      <el-option label="=" value="=" />
      <el-option label=">" value=">" />
      <el-option label="≥" value=">=" />
      <el-option label="<" value="<" />
      <el-option label="≤" value="<=" />
    </el-select>
    <el-input-number
      :controls="false"
      size="small"
      style="width: 60px"
      v-model="expressions[0].value"
    />

    <el-select
      :value="expressions[1].operator"
      @input="handle2ndOperatorInput"
      placeholder
      size="small"
      style="width: 80px; margin-left: 20px"
    >
      <el-option label="无" value />
      <el-option :disabled="!isRange" label="<" value="<" />
      <el-option :disabled="!isRange" label="≤" value="<=" />
    </el-select>
    <el-input-number
      :controls="false"
      :disabled="!expressions[1].operator"
      size="small"
      style="width: 60px"
      v-model="expressions[1].value"
    />
  </div>
</template>
<script>
import LocalValueBindingMixin from '../mixins/LocalValueBindingMixin'

const operatorOrder = ['=', '>', '>=', '<', '<=']

export default {
  mixins: [LocalValueBindingMixin({ default: () => ({}) })],
  data() {
    return {
      expressions: [
        { operator: '=', value: 0 },
        { operator: '', value: 0 },
      ],
    }
  },
  computed: {
    isRange() {
      return ['>', '>='].includes(this.expressions[0].operator)
    },
  },
  watch: {
    value: {
      handler(newValue) {
        const keys = Object.keys(newValue).sort(
          (keyA, keyB) =>
            operatorOrder.indexOf(keyA) - operatorOrder.indexOf(keyB)
        )
        keys.forEach((key, index) => {
          this.expressions[index].operator = key
          this.expressions[index].value = newValue[key]
        })
      },
      immediate: true,
    },
    expressions: {
      handler(expressions) {
        const keys = Object.keys(this.localValue)
        const exps = expressions.filter((exp) => exp.operator)
        const newLocalValue = exps.reduce(
          (prev, curr) => Object.assign(prev, { [curr.operator]: curr.value }),
          {}
        )
        if (
          keys.length === exps.length &&
          exps.every((exp) => keys.includes(exp.operator))
        ) {
          Object.assign(this.localValue, newLocalValue)
          return
        }
        this.localValue = newLocalValue
      },
      deep: true,
    },
  },
  methods: {
    handle1stOperatorInput(op) {
      this.expressions[0].operator = op
      if (!['>', '>='].includes(op)) {
        this.expressions[1].operator = ''
        this.expressions[1].value = 0
      }
    },
    handle2ndOperatorInput(op) {
      this.expressions[1].operator = op
    },
  },
}
</script>