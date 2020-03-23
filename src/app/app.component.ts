import { Component } from "@angular/core";

const todos = [
  {
    id: 1,
    title: "zf",
    done: true
  },
  {
    id: 2,
    title: "z--f",
    done: false
  },
  {
    id: 3,
    title: "z==f",
    done: true
  }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public todos: {
    id: number;
    title: string;
    done: boolean;
  }[] = todos;

  public currentEditing: {
    id: number;
    title: string;
    done: boolean;
  } = null;

  // 增
  addTodo(e): void {
    const titleText = e.target.value;
    if (!titleText.length) return;
    const last = this.todos[this.todos.length - 1];
    this.todos.push({
      id: last ? last.id + 1 : 1,
      title: titleText,
      done: false
    });
    // 清楚文本框
    e.target.value = "";
  }

  // 全选、全不选
  get toggleAll() {
    return this.todos.every(t => t.done);
  }

  set toggleAll(val) {
    this.todos.forEach(t => (t.done = val));
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }

  saveEdit(todo, e) {
    todo.title = e.target.value;
    this.currentEditing = null;
  }
}
