import editorComponent from './index.vue'
export default {
  name: 'Group',
  displayName: '问题组',
  isContainer: true,
  editorComponent,
  props: ['scoreType'],
}
