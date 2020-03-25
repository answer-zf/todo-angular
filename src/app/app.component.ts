import { Component } from '@angular/core'

const todos = [
  {
    id: 1,
    title: 'zf',
    done: true
  },
  {
    id: 2,
    title: 'z--f',
    done: false
  },
  {
    id: 3,
    title: 'z==f',
    done: true
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: {
    id: number
    title: string
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todos') || '[]')

  public currentEditing: {
    id: number
    title: string
    done: boolean
  } = null

  public visibility: string = 'all'

  // 生命周期：angular 初始化的调用
  ngOnInit() {
    this.hashChangeHandle()
    // 手动绑定 this
    window.onhashchange = this.hashChangeHandle.bind(this)
  }
  // 生命周期：组件数据发生改变时调用
  ngDoCheck() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  // 全选、全不选
  get toggleAll() {
    return this.todos.every(t => t.done)
  }

  // 未完成
  get toggleUncompleted() {
    return this.todos.filter(item => !item.done).length
  }

  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos
    } else if (this.visibility === 'active') {
      return this.todos.filter(item => !item.done)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(item => item.done)
    }
  }

  set toggleAll(val) {
    this.todos.forEach(t => (t.done = val))
  }

  // 增
  addTodo(e): void {
    const titleText = e.target.value
    if (!titleText.length) return
    const last = this.todos[this.todos.length - 1]
    this.todos.push({
      id: last ? last.id + 1 : 1,
      title: titleText,
      done: false
    })
    // 清楚文本框
    e.target.value = ''
  }

  // 删
  removeTodo(index: number) {
    this.todos.splice(index, 1)
  }

  // 改
  saveEdit(todo, e) {
    todo.title = e.target.value
    this.currentEditing = null
  }

  // 取消编辑
  cancelEdit(e) {
    // esc 键盘码 27
    if (e.keyCode !== 27) return
    e.target.value = this.currentEditing.title
    this.currentEditing = null
  }

  // 清除所有完成项目
  clearCompleted() {
    this.todos = this.todos.filter(item => !item.done)
  }

  hashChangeHandle() {
    const hash = window.location.hash.substr(1)
    this.visibility = hash
    switch (hash) {
      case '/':
        this.visibility = 'all'
        break
      case '/active':
        this.visibility = 'active'
        break
      case '/completed':
        this.visibility = 'completed'
        break
    }
  }
}
