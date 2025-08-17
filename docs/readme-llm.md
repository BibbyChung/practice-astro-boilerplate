# 專案規格：Astro Svelte Boilerplate

## 1. 專案總覽

* **核心目標**：一個使用 Astro 和 Svelte 建構的 Web 應用程式範本，展示多個功能模組包括書本管理、Todo List 和環境變數展示。
* **主要使用者**：前端開發者，作為新專案的起始樣板。

## 2. 技術棧 (Technology Stack)

* **程式語言**：TypeScript
* **主要框架/函式庫**：Astro, Svelte
* **狀態管理**：RxJS (`BehaviorSubject`)
* **樣式**：Tailwind CSS
* **相關工具**：pnpm, Vite, Prettier, ESLint

## 3. 核心架構與目錄結構

* `code/apps/astro01/src/`：應用程式主要源碼。
  * `pages/`：Astro 檔案，定義應用程式的頁面與路由。
    * `index.astro`：首頁，展示 Hello World 元件和環境變數。
    * `todolist.astro`：Todo List 頁面。
    * `book.astro`：書本管理頁面。
  * `layouts/`：Astro 元件，定義通用的頁面佈局。
    * `layout.astro`：基礎 HTML 結構和全域樣式。
    * `main.astro`：主要內容佈局，包含導航選單。
  * `lib/`：存放 Svelte 元件、服務與共用邏輯。
    * `components/`：可互動的 Svelte 元件 (Astro Islands)。
      * `todolist.svelte`：Todo List 的完整實現，包含新增、刪除、搜尋和標記完成功能。
      * `book.svelte`：書本列表管理介面。
      * `menu.svelte`：導航選單元件。
      * `hello-world.svelte`：展示基本 Svelte 元件和 canvas-confetti 效果。
      * `env.svelte`：展示環境變數的元件。
    * `services/`：核心業務邏輯與狀態管理的封裝。
      * `todo.service.ts`：Todo List 的狀態管理和業務邏輯。
      * `books.service.ts`：書本資料的狀態管理。
      * `layout.service.ts`：佈局相關狀態管理（視窗物件、頁面標題）。
    * `common/`：共用的輔助函式。
      * `util.ts`：RxJS 輔助函式和 UUID 生成工具。
  * `styles/`：全域 CSS 樣式。
* `code/apps/astro01/public/`：對外開放的靜態資源。
* `code/apps/astro01/astro.config.mjs`：Astro 專案的設定檔。
* `code/apps/astro01/package.json`：專案依賴關係定義。
* `pnpm-workspace.yaml`：定義 monorepo 結構的工作區設定。

## 4. 關鍵模組與業務邏輯

* **Todo List 狀態管理**：邏輯位於 `code/apps/astro01/src/lib/services/todo.service.ts`，使用 RxJS 的 `BehaviorSubject` 處理待辦事項的 CRUD 操作、搜尋篩選和批次操作（全選/取消全選、刪除已完成項目）。
* **書本狀態管理**：邏輯位於 `code/apps/astro01/src/lib/services/books.service.ts`，使用 RxJS 的 `BehaviorSubject` 處理書本列表的 CRUD 狀態。
* **佈局狀態管理**：邏輯位於 `code/apps/astro01/src/lib/services/layout.service.ts`，管理與瀏覽器視窗和頁面標題相關的狀態。
* **Todo List 互動介面**：UI 邏輯位於 `code/apps/astro01/src/lib/components/todolist.svelte`，負責渲染待辦事項列表並提供完整的互動功能。
* **書本互動介面**：UI 邏輯位於 `code/apps/astro01/src/lib/components/book.svelte`，負責渲染書本列表並與 `books.service.ts` 互動。
* **導航選單**：UI 邏輯位於 `code/apps/astro01/src/lib/components/menu.svelte`，提供頁面間的導航功能。

## 5. 狀態管理 (State Management)

* **定義方式**：狀態透過 RxJS 的 `BehaviorSubject` 實例進行定義，每個實例代表一個可觀察的狀態儲存單元。使用 `getBehaviorSubject` 輔助函式來建立實例。
* **使用方法**：
  * **更新狀態**：調用 `next()` 方法來推送新的狀態值。
  * **讀取狀態**：透過 `getValue()` 同步取得當前值，或使用 `asObservable()` 訂閱狀態的非同步更新。
  * **在 Svelte 中使用**：使用 `$` 前綴訂閱 RxJS Observable，自動處理訂閱和取消訂閱。
* **放置位置**：所有應用程式的狀態都集中管理在 `code/apps/astro01/src/lib/services/` 目錄下，每個 service 檔案負責一個特定功能領域的狀態。

## 6. 主要資料流程

1. **請求進入**：Astro 根據 URL 匹配 `code/apps/astro01/src/pages/` 中的對應頁面 (`.astro` 檔案)。
2. **伺服器端渲染 (SSR)**：Astro 頁面渲染 `code/apps/astro01/src/layouts/` 中的佈局，並準備好 Svelte 元件的 HTML 骨架。
3. **客戶端載入 (Hydration)**：標記為 `client:*` 的 Svelte 元件在瀏覽器端被載入並變為可互動狀態。
4. **邏輯處理**：Svelte 元件調用 `code/apps/astro01/src/lib/services/` 中的函式來讀取或修改應用程式狀態。
5. **狀態更新與 UI 反應**：Service 中的 `BehaviorSubject` 狀態更新後，已訂閱該狀態的 Svelte 元件會自動重新渲染，以反映最新的資料。

## 7. 設定與環境變數

* **專案設定**：主要設定位於 `code/apps/astro01/astro.config.mjs`，定義了 Astro 的整合與行為。
* **環境變數**：客戶端可用的環境變數需以 `PUBLIC_` 為前綴，定義在 `.env` 檔案中。範本可參考 `code/apps/astro01/.env.development`。

## 8. 其他

* `import` 的相對路徑改為 `~/` 路徑別名
* 使用 `getBehaviorSubject` 輔助函式來建立 `BehaviorSubject` 實例
* 專案採用 monorepo 結構，使用 pnpm workspace 管理多個應用程式和套件
* 使用函數表達式 (Function Expression) 代替函數宣告 (Function Declaration)
* 使用 `type` 取代 `interface` 定義型別
