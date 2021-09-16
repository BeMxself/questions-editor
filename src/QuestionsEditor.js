import { getEditorDefine, EditorDefines } from './editors'
import EditorWrapper from '@/common/EditorWrapper.vue'
import Vue from 'vue'
import LocalValueBindingMixin from '@/mixins/LocalValueBindingMixin'
import SortableMixin from '@/mixins/SortableMixin'
export default {
  mixins: [
    LocalValueBindingMixin({ valueType: Array, default: () => [] }),
    SortableMixin({
      refName: 'questionsContainer',
      updateDataArray: 'localValue',
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
    renderOperations(q, h, context) {
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
          EditorDefines.map(({ name, displayName }) =>
            h('el-option', {
              props: {
                key: name,
                label: displayName || name,
                value: name,
              },
            })
          )
        ),
        h('el-button-group', { slot: 'operations-right' }, [
          h('el-button', {
            props: {
              icon: 'el-icon-arrow-up',
              size: 'mini',
              disabled: context.index === 0,
            },
            on: {
              click() {
                const item = context.brothers.splice(context.index, 1)[0]
                context.brothers.splice(context.index - 1, 0, item)
              },
            },
          }),
          h('el-button', {
            props: {
              icon: 'el-icon-arrow-down',
              size: 'mini',
              disabled: context.index === context.brothers.length - 1,
            },
            on: {
              click() {
                const item = context.brothers.splice(context.index, 1)[0]
                context.brothers.splice(context.index + 1, 0, item)
              },
            },
          }),
        ]),
        h(
          'el-popconfirm',
          {
            props: { title: '确定要删除吗？' },
            slot: 'operations-right',
            on: {
              confirm: () => context.brothers.splice(context.index, 1),
            },
          },
          [
            h('el-button', {
              slot: 'reference',
              style: { marginLeft: '10px' },
              props: { icon: 'el-icon-delete', size: 'mini', type: 'danger' },
            }),
          ]
        ),
      ]
    },
    renderQuestion(q, h, context) {
      const { type, ...props } = q
      const define = getEditorDefine(type)
      if (!define) return h('div', null, [`${type}不是有效的问题类型`])
      this.normalizeQuestion(q, define)
      return h(EditorWrapper, { props: { value: props } }, [
        h(
          define.editorComponent,
          {
            props: { value: props, context },
            on: {
              input: (v) => {
                Object.assign(q, v)
              },
            },
          },
          [
            define.isContainer
              ? this.renderQuestions(props.children, h, { parent: q })
              : null,
            this.renderAddButton(q, h),
          ]
        ),
        ...this.renderOperations(q, h, context),
      ])
    },
    renderAddButton(q, h) {
      return h(
        'div',
        { style: { display: 'flex', justifyContent: 'center' } },
        [
          h('el-button', {
            props: {
              size: 'medium',
              icon: 'el-icon-plus',
              type: 'primary',
              plain: true,
            },
            on: {
              click: () => q.children.push({ type: 'MultipleChoice' }),
            },
          }),
        ]
      )
    },
    renderQuestions(questions, h, context) {
      if (!questions) return null
      return [
        ...questions.map((q, index) =>
          this.renderQuestion(q, h, {
            brothers: questions,
            index,
            parent: context && context.parent,
            isRoot: !context,
          })
        ),
      ]
    },
  },
  render(h) {
    return h('div', { class: 'questions', ref: 'questionsContainer' }, [
      ...this.renderQuestions(this.localValue, h),
      this.renderAddButton({ children: this.localValue, isRoot: true }, h),
    ])
  },
}
