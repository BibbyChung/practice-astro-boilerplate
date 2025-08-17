<script lang="ts">
  import {
    getTodo,
    addTodo,
    deleteTodo,
    searchTodos,
    toggleTodo,
    toggleAllTodos,
    deleteCompletedTodos,
  } from '~/lib/services/todo.service'
  import { combineLatest } from 'rxjs'
  import { map } from 'rxjs/operators'

  let newTodoText = ''

  const todo$ = getTodo()

  const filteredTodos$ = combineLatest([todo$]).pipe(
    map(([{ todos, searchTerm }]) =>
      todos.filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase())),
    ),
  )

  const stats$ = todo$.pipe(
    map(({ todos }) => ({
      completed: todos.filter((t) => t.completed).length,
      incompleted: todos.filter((t) => !t.completed).length,
      allCompleted: todos.length > 0 && todos.every((t) => t.completed),
    })),
  )

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText)
      newTodoText = ''
    }
  }

  const handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement
    searchTodos(target.value)
  }
</script>

<div class="mx-auto">
  <div class="mb-4">
    <input
      type="text"
      placeholder="Search todos..."
      on:input={handleSearch}
      class="w-full rounded border p-2 focus:outline-none"
    />
  </div>
  <div class="mb-4 flex">
    <input
      type="text"
      bind:value={newTodoText}
      placeholder="Add a new todo"
      class="flex-grow rounded-l border p-2 focus:outline-none"
      on:keydown={(e) => e.key === 'Enter' && handleAddTodo()}
    />
    <button on:click={handleAddTodo} class="rounded-r bg-blue-500 p-2 text-white"> Add </button>
  </div>
  <div class="mb-4 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <span class="font-bold text-green-600">Completed: {$stats$.completed}</span>
      <span class="font-bold text-yellow-600">Incompleted: {$stats$.incompleted}</span>
      <button on:click={toggleAllTodos} class="btn btn-sm btn-outline btn-info">
        {#if $stats$.allCompleted}
          Unselect All
        {:else}
          Select All
        {/if}
      </button>
      <button on:click={deleteCompletedTodos} class="btn btn-sm btn-outline btn-error"
        >Delete Completed</button
      >
    </div>
  </div>
  <ul>
    {#each $filteredTodos$ as todo (todo.id)}
      <li class="flex items-center justify-between border-b p-2">
        <input
          type="checkbox"
          checked={todo.completed}
          on:change={() => toggleTodo(todo.id)}
          class="mr-2"
        />
        <span class:line-through={todo.completed}>{todo.text}</span>
        <button on:click={() => deleteTodo(todo.id)} class="ml-auto text-red-500"> Delete </button>
      </li>
    {/each}
  </ul>
</div>
