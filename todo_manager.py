"""
一个简单的待办事项管理器 (Todo List Manager)
支持添加、删除、列出和标记完成待办事项
"""

import json
import os
from datetime import datetime

TODO_FILE = "todos.json"


class TodoManager:
    def __init__(self):
        self.todos = self._load_todos()

    def _load_todos(self):
        if os.path.exists(TODO_FILE):
            with open(TODO_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def _save_todos(self):
        with open(TODO_FILE, "w", encoding="utf-8") as f:
            json.dump(self.todos, f, ensure_ascii=False, indent=2)

    def add(self, title: str, description: str = ""):
        todo = {
            "id": len(self.todos) + 1,
            "title": title,
            "description": description,
            "completed": False,
            "created_at": datetime.now().isoformat(),
        }
        self.todos.append(todo)
        self._save_todos()
        print(f"✓ 已添加待办: [{todo['id']}] {title}")

    def list(self, show_all: bool = True):
        if not self.todos:
            print("📭 暂无待办事项")
            return

        print("\n📋 待办列表:")
        print("-" * 50)
        for todo in self.todos:
            if not show_all and todo["completed"]:
                continue
            status = "✅" if todo["completed"] else "⬜"
            print(f"  {status} [{todo['id']}] {todo['title']}")
            if todo["description"]:
                print(f"      📝 {todo['description']}")
        print("-" * 50)

    def complete(self, todo_id: int):
        for todo in self.todos:
            if todo["id"] == todo_id:
                todo["completed"] = True
                self._save_todos()
                print(f"🎉 已完成: [{todo_id}] {todo['title']}")
                return
        print(f"❌ 未找到 ID 为 {todo_id} 的待办")

    def delete(self, todo_id: int):
        self.todos = [t for t in self.todos if t["id"] != todo_id]
        self._save_todos()
        print(f"🗑️  已删除待办 ID: {todo_id}")


def main():
    manager = TodoManager()

    # 示例用法
    manager.add("学习 Python", "完成基础语法和面向对象编程")
    manager.add("写项目文档", "为 demo 项目编写 README")
    manager.add("锻炼身体", "跑步 30 分钟")

    manager.list()

    manager.complete(1)
    manager.list(show_all=False)


if __name__ == "__main__":
    main()