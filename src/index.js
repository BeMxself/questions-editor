import QuestionEditor from './QuestionEditor'
import QuestionsEditor from './QuestionsEditor'
import ScaleTable from './scale-table'

const install = function(Vue) {
  if (install.installed) return
  Vue.component('question-editor', QuestionEditor)
  Vue.component('questions-editor', QuestionsEditor)
  Vue.component('scale-table', ScaleTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { QuestionEditor, QuestionsEditor, ScaleTable }
export default {
  install,
  QuestionEditor,
  QuestionsEditor,
  ScaleTable,
}
