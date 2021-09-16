import Sortable from 'sortablejs/Sortable.min.js'
import get from 'lodash/get'
import set from 'lodash/set'

export default function getMixin(config) {
  const { refName = '', updateDataArray = () => {} } = config || {}
  const sortableVar = `${refName}Sortable`

  const updateDataArrayFn =
    updateDataArray instanceof Function
      ? updateDataArray
      : function({ newIndex, oldIndex }) {
          if (newIndex === oldIndex) return
          const newArr = get(this, updateDataArray).slice(0)
          const item = newArr.splice(oldIndex, 1)[0]
          newArr.splice(newIndex, 0, item)

          // 强制刷新
          set(this, updateDataArray, [])
          this.$nextTick(() => set(this, updateDataArray, newArr))
        }
  return {
    data() {
      return {
        [sortableVar]: null,
      }
    },
    mounted() {
      const el = this.$refs[refName]
      this[sortableVar] = Sortable.create(el, {
        sort: true,
        animation: 150,
        onEnd: (args) => updateDataArrayFn.call(this, args),
      })
    },
    destroyed() {
      this[sortableVar].destroy()
    },
  }
}
