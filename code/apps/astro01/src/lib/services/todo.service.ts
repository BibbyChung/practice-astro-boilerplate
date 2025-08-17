import { getBehaviorSubject } from '~/lib/common/util'

// --- Type Definitions ---

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoState = {
  todos: Todo[]
  searchTerm: string
}

// --- Initial State ---

const initialState: TodoState = {
  todos: [
    { id: 1, text: 'Learn Astro', completed: true },
    { id: 2, text: 'Learn Svelte', completed: true },
    { id: 3, text: 'Learn RxJS', completed: false },
    { id: 4, text: 'Build a Todolist App', completed: false },
    { id: 5, text: 'Write documentation', completed: false },
    { id: 6, text: 'Deploy the app', completed: false },
  ],
  searchTerm: '',
}

// --- Store ---

const store = getBehaviorSubject<TodoState>(initialState)

// --- Service ---

export const getTodo = () => store.asObservable()

export const addTodo = (text: string) => {
  const state = store.getValue()
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  }
  store.next({
    ...state,
    todos: [...state.todos, newTodo],
  })
}

export const deleteTodo = (id: number) => {
  const state = store.getValue()
  store.next({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })
}

export const searchTodos = (searchTerm: string) => {
  const state = store.getValue()
  store.next({
    ...state,
    searchTerm,
  })
}

export const toggleTodo = (id: number) => {
  const state = store.getValue()
  store.next({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  })
}

export const toggleAllTodos = () => {
  const state = store.getValue()
  const allCompleted = state.todos.every((todo) => todo.completed)
  store.next({
    ...state,
    todos: state.todos.map((todo) => ({ ...todo, completed: !allCompleted })),
  })
}

export const deleteCompletedTodos = () => {
  const state = store.getValue()
  store.next({
    ...state,
    todos: state.todos.filter((todo) => !todo.completed),
  })
}
