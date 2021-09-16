const context = require.context('./', true, /define.js/)

export const EditorDefines = context.keys().map((key) => {
  const module = context(key)
  return module.default || module
})
export function getEditorDefine(type) {
  return EditorDefines.find((def) => def.name === type)
}
