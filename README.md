# questions-editor

## 安装
```
npm install vue-questions-editor-eleui2
```


## 使用

```js
import Vue from 'vue'
import Qe from 'questions-editor'

Vue.use(Qe)
```

```html
<questions-editor v-model="question" :readonly="false" @selected="handleSelected" />
<question-editor v-model="questions" :readonly="false" />
<scale-table v-model="scaleTable" :readonly="false" />
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

#### 属性

- value 值
- readonly 只读

#### 事件

- input 改动时触发


### QuestionsEditor

多问题编辑器

#### 属性

- value 值
- readonly 只读

#### 事件

- input 改动时触发
- selected 容器选中时触发

#### 方法

- appendQuestion(question) 在当前选中的容器中增加问题（若没有选中则增加到根容器里）


### ScaleTable

单个问题编辑器

#### 属性

- value 值
- readonly 只读

#### 事件

- input 改动时触发

