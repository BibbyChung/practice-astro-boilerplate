<script lang="ts">
  import { filter, tap } from 'rxjs'
  import { onMount } from 'svelte'
  import { getSubject } from '~/lib/common/util'
  import { delTodo, updateTodo, type todoType } from '~/lib/services/todolist.service'

  export let params: todoType
  let inputElem: HTMLInputElement

  const updateItemBtn$ = getSubject<boolean>()
  const destroyBtn$ = getSubject<boolean>()

  const updateItemSub = updateItemBtn$
    .pipe(
      filter(() => !!inputElem),
      tap(() => {
        const newObj = { ...params }
        newObj.completed = inputElem.checked
        updateTodo(newObj)
      }),
    )
    .subscribe()

  const destroySub = destroyBtn$.pipe(tap(() => delTodo(params.id))).subscribe()

  onMount(() => {
    return () => {
      updateItemSub.unsubscribe()
      destroySub.unsubscribe()
    }
  })
</script>

<li class={params.completed ? 'completed' : ''}>
  <div class="view">
    <input
      class="toggle"
      type="checkbox"
      checked={params.completed}
      on:change|preventDefault={() => updateItemBtn$.next(true)}
      bind:this={inputElem}
      id={params.id}
    />
    <label for={params.id}>{params.title}</label>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button on:click|preventDefault={() => destroyBtn$.next(true)} class="destroy"></button>
  </div>
</li>
