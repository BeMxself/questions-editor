# questions-editor

## 安装
```
npm install question-editor
```


## 使用

```js
import Vue from 'vue'
import Qe from 'questions-editor'

Vue.use(Qe)
```

```html
<question-editor v-model="question" />
<question-editor v-model="questions" />
<scale-table v-model="scaleTable" />
```

也可以单独引入：

```js
import { QuestionEditor, QuestionsEditor, ScaleTable } from 'questions-editor'

// ……
```

详见 examples 


## 说明

### QuestionEditor

单个问题编辑器

### QuestionEditor

多问题编辑器

### ScaleTable

等级量表编辑器
