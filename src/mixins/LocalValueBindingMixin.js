export default function getMixin(config) {
  const {
    default: defaultFn = () => ({}),
    needReset = () => false,
    valueType = Object,
  } = config || {}
  return {
    props: {
      value: {
        type: valueType,
        default: defaultFn,
      },
    },
    data() {
      return {
        localValue: defaultFn(),
      }
    },
    watch: {
      value: {
        handler(newValue) {
          this.localValue = needReset(newValue) ? defaultFn() : newValue
        },
        immediate: true,
      },
      localValue: {
        handler(newValue) {
          this.$emit('input', newValue)
        },
        immediate: true,
        deep: true,
      },
    },
  }
}
