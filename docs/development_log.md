# Todolist 功能開發日誌

## 2025-08-17

### 1. 需求分析與規格制定

- **目標**: 建立一個具備 CRUD (新增、刪除、查詢) 功能的 Todolist。
- **技術選型**:
  - **路由**: Astro Pages (`/todolist`)
  - **狀態管理**: RxJS (`BehaviorSubject`)
  - **UI 元件**: Svelte
- **產出**:
  - `docs/spec.md`: 包含資料流程圖、循序圖與資料結構定義。
  - `docs/todolist.md`: 列出詳細的開發任務清單。

### 2. 開發流程

#### 2.1. 路由建立

- 建立 `src/pages/todolist.astro` 作為 Todolist 頁面的進入點。
- **修正**: 初期路徑設定錯誤 (`../../layouts/main.astro`)，已修正為 (`../layouts/main.astro`)。

#### 2.2. 狀態管理 (Service)

- 建立 `src/lib/services/todo.service.ts`。
- **決策**:
  - 遵循專案規範，使用 `getBehaviorSubject` 輔助函式來建立 `BehaviorSubject` 實例。
  - 遵循 Functional Programming 原則，將 `store` 與 `addTodo`, `deleteTodo`, `searchTodos` 等函式各自使用 `export const` 匯出，而非包裝在單一物件中。
- **實作**:
  - 定義 `Todo` 與 `TodoState` 型別。
  - 實作新增、刪除、搜尋的邏輯。

#### 2.3. UI 元件 (Svelte)

- 建立 `src/lib/components/todolist.svelte`。
- **實作**:
  - 透過 `import { store, ... }` 引入狀態與函式。
  - 使用 `combineLatest` 與 `map` operator 來建立 `filteredTodos$`，以處理搜尋過濾後的待辦事項列表。
  - 使用 `$` 語法糖自動訂閱 `filteredTodos$`。
  - 綁定 UI 事件以觸發 `addTodo`, `deleteTodo`, `searchTodos` 等函式。

#### 2.4. 整合 (Astro)

- 在 `src/pages/todolist.astro` 中引入 `todolist.svelte`。
- **決策**:
  - 使用 `client:load` 指令，確保 Svelte 元件在客戶端立即載入並可互動。
- **修正**:
  - 遇到 `Todolist` 命名衝突問題，將其更名為 `TodolistComponent`。
  - 根據命名慣例，最終將其更名為 `TodolistComp`。

- **修正**:
  - 遇到 `Todolist` 命名衝突問題，將其更名為 `TodolistComponent`。
  - 根據命名慣例，最終將其更名為 `TodolistComp`。
- **重構**: 根據專案規範，將所有 `import` 的相對路徑改為 `~/` 路徑別名，以提升程式碼可維護性。

#### 2.5. 選單整合

- 在 `src/lib/components/menu.svelte` 中新增 `/todolist` 路由，使其顯示於全域導覽選單中。

### 3. 總結

Todolist 功能已成功開發完成，並遵循了專案的架構與開發規範。過程中遇到的一些小問題 (路徑錯誤、命名衝突、程式碼風格、路徑別名) 都已即時修正，並已將新頁面整合至導覽選單。

---

## 2025-08-17 (v2)

### 1. 功能擴充

- **目標**: 增加「完成/未完成」狀態切換與統計功能。
- **產出**:
  - `docs/spec.md`: 更新規格文件，加入新功能描述。
  - `docs/todolist.md`: 更新開發任務清單。

### 2. 開發流程

#### 2.1. 狀態管理 (Service)

- 在 `src/lib/services/todo.service.ts` 中新增 `toggleTodo` 函式，用於切換待辦事項的 `completed` 狀態。

#### 2.2. UI 元件 (Svelte)

- 在 `src/lib/components/todolist.svelte` 中：
  - 新增 `stats$` observable，使用 `map` operator 計算已完成與未完成的項目數量。
  - 列表項中加入 checkbox，並綁定 `on:change` 事件來觸發 `toggleTodo` 函式。
  - 使用 `class:line-through` 指令為已完成的項目加上刪除線樣式。
  - 在 UI 上顯示統計數字。

### 3. 總結

成功為 Todolist 擴充了狀態管理與統計功能，提升了應用的實用性。

---

## 2025-08-17 (v3)

### 1. 功能擴充

- **目標**: 增加「全選」與「批次刪除」功能。
- **產出**:
  - `docs/todolist.md`: 更新開發任務清單。

### 2. 開發流程

#### 2.1. 狀態管理 (Service)

- 在 `src/lib/services/todo.service.ts` 中：
  - 新增 `selectAllTodos` 函式，將所有待辦事項標示為已完成。
  - 新增 `deleteCompletedTodos` 函式，刪除所有已完成的待辦事項。

#### 2.2. UI 元件 (Svelte)

- 在 `src/lib/components/todolist.svelte` 中：
  - 新增「Select All」按鈕，並綁定 `on:click` 事件來觸發 `selectAllTodos` 函式。
  - 新增「Delete Completed」按鈕，並綁定 `on:click` 事件來觸發 `deleteCompletedTodos` 函式。
  - 為按鈕加入 `.btn` class 以統一風格。
  - 美化統計數字與按鈕區域的 UI，提升視覺效果。

### 3. 總結

成功為 Todolist 擴充了批次操作功能，並對 UI 進行了美化，進一步提升了使用者體驗。

---

## 2025-08-17 (v4)

### 1. 資料初始化

- **目標**: 加入初始的假資料以利於開發與展示。
- **實作**: 在 `src/lib/services/todo.service.ts` 的 `initialState` 中新增 6 筆待辦事項資料。

---

## 2025-08-17 (v5)

### 1. 功能優化

- **目標**: 將「全選」與「全部取消」功能合併為單一按鈕。
- **實作**:
  - **Service**: 將 `selectAllTodos` 修改為 `toggleAllTodos`，根據目前所有項目的完成狀態，來決定是全選還是全部取消。
  - **UI**:
    - 將按鈕的事件處理函式改為 `toggleAllTodos`。
    - 根據 `allCompleted` 狀態，動態顯示按鈕文字為 "Select All" 或 "Unselect All"。
    - **(由使用者手動調整)** 調整統計數字與按鈕的排版，使其更加美觀。
    - 移除 `input` 欄位的 `outline` 樣式，使 UI 更自然。

---

## 2025-08-17 (v6)

### 1. 程式碼重構

- **目標**: 封裝 `todo.service.ts` 中的 `store`，使其不直接對外暴露。
- **實作**:
  - **Service**:
    - 將 `store` 的 `export` 移除，使其成為模組私有變數。
    - 新增 `getTodo` 函式，回傳 `store.asObservable()`，讓外部只能訂閱而不能直接修改 `store`。
  - **UI**:
    - 在 `todolist.svelte` 中，將原本直接 `import store` 的方式，改為 `import { getTodo }` 並呼叫 `getTodo()` 來取得 observable。