import { getEditorDefine, EditorDefines } from '@/editors'
import EditorWrapper from '@/common/EditorWrapper.vue'
import cloneDeep from '@/utils/cloneDeep'
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import Vue from 'vue'

const defaultProps = { type: 'MultipleChoice' }
export default {
  mixins: [
    LocalValueBindingMixin({
      default: () => cloneDeep(defaultProps),
      needReset: (v) => !(v && v.type),
    }),
  ],
  methods: {
    normalizeQuestion(q, define) {
      if (define.isContainer && !q.children) Vue.set(q, 'children', [])
      // 清理不必要的属性
      const keepProps = [
        'no',
        'topic',
        'description',
        'points',
        'type',
        ...(define.props || []),
        ...(define.isContainer ? ['children'] : []),
      ]
      Object.keys(q)
        .filter((k) => !keepProps.includes(k))
        .forEach((key) => delete q[key])
    },
    renderOperations(q, h) {
      return [
        h(
          'el-select',
          {
            slot: 'operations-left',
            props: { value: q.type, size: 'mini' },
            style: { width: '120px' },
            on: {
              change: (value) => (q.type = value),
            },
          },
          EditorDefines.filter((d) => !d.isContainer).map(
            ({ name, displayName }) =>
              h('el-option', {
                props: {
                  key: name,
                  label: displayName || name,
                  value: name,
                },
              })
          )
        ),
      ]
    },
    renderQuestion(q, h, context) {
      const { type, ...props } = q
      const define = getEditorDefine(type)
      if (!define) return h('div', null, [`${type}不是有效的问题类型`])

      this.normalizeQuestion(q, define)
      return h(
        EditorWrapper,
        { props: { value: props, toggleButton: false, dragHandle: false } },
        [
          h(
            define.editorComponent,
            {
              props: { value: props, context },
              on: {
                input: (v) => Object.assign(q, v),
              },
            },
            null
          ),
          ...this.renderOperations(q, h, context),
        ]
      )
    },
  },
  render(h) {
    return this.renderQuestion(this.localValue, h)
  },
}
