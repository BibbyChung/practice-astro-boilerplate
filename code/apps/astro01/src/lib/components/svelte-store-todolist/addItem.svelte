<script lang="ts">
  import { onMount } from 'svelte'
  import { writeableFlexible } from '~/lib/common/rxjs-interop-svelte-store'
  import { getUUID } from '~/lib/common/util'
  import { addTodo } from '~/lib/services/todolist.service'

  let inputRef: HTMLInputElement

  const submitBtn$ = writeableFlexible<string>()

  const submitSub = submitBtn$.subscribe(() => {
    const v = inputRef?.value ?? ''
    if (v !== '') {
      addTodo(v ?? '')
      inputRef.value = ''
    }
  }, true)

  onMount(() => {
    return () => {
      submitSub()
    }
  })
</script>

<header class="header">
  <h1>todos</h1>
  <form on:submit|preventDefault={() => submitBtn$.set(getUUID())}>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      bind:this={inputRef}
      autoFocus={true}
    />
  </form>
</header>
