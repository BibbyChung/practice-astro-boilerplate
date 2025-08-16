<script lang="ts">
  import { onMount } from 'svelte'
  import { writeableFlexible } from '~/lib/common/rxjs-interop-svelte-store'
  import { getUUID } from '~/lib/common/util'
  import { delTodo, updateTodo, type todoType } from '~/lib/services/todolist.service'

  export let params: todoType
  let inputElem: HTMLInputElement

  const updateItemBtn$ = writeableFlexible<string>()
  const destroyBtn$ = writeableFlexible<string>()

  const updateItemSub = updateItemBtn$.subscribe(() => {
    if (!inputElem) {
      return
    }

    const newObj = JSON.parse(JSON.stringify(params)) as todoType
    newObj.completed = inputElem.checked
    updateTodo(newObj)
  }, true)

  const destroySub = destroyBtn$.subscribe(() => {
    delTodo(params.id)
  }, true)

  onMount(() => {
    return () => {
      updateItemSub()
      destroySub()
    }
  })
</script>

<li class={params.completed ? 'completed' : ''}>
  <div class="view">
    <input
      class="toggle"
      type="checkbox"
      checked={params.completed}
      on:change|preventDefault={() => updateItemBtn$.set(getUUID())}
      bind:this={inputElem}
      id="ii" />
    <label for="ii">{params.title}</label>
    <button on:click|preventDefault={() => destroyBtn$.set(getUUID())} class="destroy"></button>
  </div>
</li>
