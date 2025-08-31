<script lang="ts">
  import { onMount } from 'svelte'
  import { toStore, writeableFlexible } from '~/lib/common/rxjs-interop-svelte-store'
  import { getUUID } from '~/lib/common/util'
  import { getTodos, setAllTodosCompleted } from '~/lib/services/todolist.service'
  import AddItem from './addItem.svelte'
  import Footer from './footer.svelte'
  import Item from './item.svelte'

  let checkboxToggleElem: HTMLInputElement

  const checkSelectAllBtn$ = writeableFlexible<string>()

  const todos$ = toStore(getTodos())

  const checkSelectAllSub = checkSelectAllBtn$.subscribe(() => {
    if (!checkboxToggleElem) {
      return
    }
    setAllTodosCompleted(checkboxToggleElem.checked).subscribe()
  }, true)

  const toggleCheckboxSub = todos$.subscribe((todos) => {
    const total = todos.length
    const selectedCount = todos.filter((a) => a.completed).length
    let isSelected = total === selectedCount
    if (total === 0) {
      isSelected = false
    }
    if (checkboxToggleElem) {
      checkboxToggleElem.checked = isSelected
    }
  })

  onMount(() => {
    return () => {
      toggleCheckboxSub()
      checkSelectAllSub()
    }
  })
</script>

<section class="todoapp">
  <AddItem />
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:change|preventDefault={(e) => checkSelectAllBtn$.set(getUUID())}
      bind:this={checkboxToggleElem}
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      {#each $todos$ as item, i (item.id)}
        <!-- {JSON.stringify(item)} -->
        <Item params={item} />
      {/each}
    </ul>
  </section>

  <Footer />
</section>
