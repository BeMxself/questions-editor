import isEqual from '@/utils/isEqual'
import cloneDeep from '@/utils/cloneDeep'

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
    computed: {
      isSynced() {
        const synced = isEqual(this.value, this.localValue)
        return synced
      },
    },
    watch: {
      value: {
        handler(newValue) {
          this.localValue = needReset(newValue)
            ? defaultFn()
            : isEqual(this.localValue, newValue)
            ? this.localValue
            : cloneDeep(newValue)
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
