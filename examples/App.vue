<template>
  <div id="app">
    <h2>多题编辑器</h2>
    <button @click="addQuestion">add Judgement</button>
    <questions-editor @selected="handleSelected" ref="questions" v-model="questions" />
    <h2>单题编辑器</h2>
    <question-editor :readonly="true" v-model="question" />
    <h2>量表编辑器</h2>
    <scale-table :readonly="true" v-model="scaleTable" />
  </div>
</template>

<script>
import QuestionsEditor from '@/QuestionsEditor'
import QuestionEditor from '@/QuestionEditor'
import ScaleTable from '@/scale-table'

export default {
  name: 'App',
  components: {
    QuestionsEditor,
    QuestionEditor,
    ScaleTable,
  },
  data() {
    return {
      questions: [
        {
          type: 'Group',
          topic: '根',
          children: [
            { type: 'MultipleChoice', options: [{ points: 1 }] },
            {
              type: 'Numeric',
              topic: '123',
              ranges: [{ range: { '=': 0 }, points: 0 }],
            },
            {
              type: 'Judgement',
              options: [
                { content: '是', points: 1 },
                { content: '否', points: 0 },
              ],
            },
          ],
        },
      ],
      question: {},
      scaleTable: [],
    }
  },
  methods: {
    addQuestion() {
      this.$refs.questions.appendQuestion({ type: 'Judgement' })
    },
    handleSelected(selected) {
      console.warn(selected)
    },
  },
}
</script>

<style>
</style>
