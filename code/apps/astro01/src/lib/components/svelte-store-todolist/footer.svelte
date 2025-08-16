<script lang="ts">
  import { take } from 'rxjs'
  import { onMount } from 'svelte'
  import { derived } from 'svelte/store'
  import { toStore, writeableFlexible } from '~/lib/common/rxjs-interop-svelte-store'
  import { getUUID } from '~/lib/common/util'
  import {
    getTodos,
    getTodosFilter,
    removeAllTodosCompleted,
    setTodosFilter,
    type todosFilterType,
  } from '~/lib/services/todolist.service'

  const removeAllTodosBtn$ = writeableFlexible<string>()
  const setTodosFilterBtn$ = writeableFlexible<todosFilterType>()

  const todos$ = toStore(getTodos())

  const isShowClearCompleted$ = derived(
    todos$,
    (todos, set, update) => {
      const completedCount = todos.filter((a) => a.completed).length
      set(completedCount !== 0)
    },
    false,
  )

  const uncompletedCount$ = derived(
    todos$,
    (todos, set, update) => {
      set(todos.filter((a) => !a.completed).length)
    },
    0,
  )

  const todoFilter$ = getTodosFilter()

  const setTodosFilterSub = setTodosFilterBtn$.subscribe((type) => {
    setTodosFilter(type)
  }, true)

  const removeAllTodosSub = removeAllTodosBtn$.subscribe(() => {
    removeAllTodosCompleted().pipe(take(1)).subscribe()
  }, true)

  onMount(() => {
    return () => {
      removeAllTodosSub()
      setTodosFilterSub()
    }
  })
</script>

<footer class="footer">
  <span class="todo-count">
    {$uncompletedCount$ === 1
      ? '1 uncompleted item left'
      : `${$uncompletedCount$} uncompleted items left`}
  </span>
  <ul class="filters">
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.set('all')}
        href="#/"
        class={$todoFilter$ === 'all' ? 'selected' : ''}>
        All
      </a>
    </li>
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.set('active')}
        href="#/"
        class={$todoFilter$ === 'active' ? 'selected' : ''}>
        Active
      </a>
    </li>
    <li>
      <a
        on:click|preventDefault={() => setTodosFilterBtn$.set('completed')}
        href="#/"
        class={$todoFilter$ === 'completed' ? 'selected' : ''}>
        Completed
      </a>
    </li>
  </ul>
  <div>
    {#if $isShowClearCompleted$}
      <button
        on:click|preventDefault={() => removeAllTodosBtn$.set(getUUID())}
        class="clear-completed">
        Clear completed
      </button>
    {/if}
  </div>
</footer>
