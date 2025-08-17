# Todolist 功能規格

## 1. 功能需求

- **列表 (List)**: 顯示所有待辦事項。
- **新增 (Create)**: 允許使用者新增待辦事項。
- **刪除 (Delete)**: 允許使用者刪除指定的待辦事項。
- **切換狀態 (Toggle)**: 允許使用者將待辦事項標示為「已完成」或「未完成」。
- **搜尋 (Search)**: 允許使用者根據關鍵字篩選待辦事項。
- **統計 (Stats)**: 顯示已完成與未完成的項目數量。

## 2. 系統架構

### 2.1 資料流程圖 (Data Flow Diagram)

```mermaid
graph TD
    A[使用者操作 UI] -->|新增/刪除/搜尋| B(Svelte Component);
    B -->|呼叫 Service function| C(RxJS Service);
    C -->|更新 BehaviorSubject| D(State);
    D -->|通知更新| B;
    B -->|更新 UI| A;
```

### 2.2 循序圖 (Sequence Diagram)

```mermaid
sequenceDiagram
    participant User
    participant SvelteComponent
    participant RxJSService
    participant State

    User->>SvelteComponent: 輸入新事項並點擊新增
    SvelteComponent->>RxJSService: addTodo("新事項")
    RxJSService->>State: 更新 todos BehaviorSubject
    State-->>SvelteComponent: 觸發 UI 更新
    SvelteComponent-->>User: 顯示更新後的列表
```

## 3. 資料結構 (Data Structure)

```typescript
// src/lib/services/todo.service.ts

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  searchTerm: string;
};
```

## 4. 核心模組

- **`src/pages/todolist.astro`**: Todolist 頁面的路由與佈局。
- **`src/lib/services/todo.service.ts`**: 使用 RxJS `BehaviorSubject` 管理 Todolist 的狀態，包含 `addTodo`, `deleteTodo`, `toggleTodo`, `searchTodos` 等函式。
- **`src/lib/components/todolist.svelte`**: Svelte 元件，負責 UI 互動、狀態顯示與統計數字的計算與呈現。