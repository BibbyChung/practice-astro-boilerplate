<script lang="ts">
  import { getUUID } from '~/lib/common/util'
  import { addBook, delBook, getBooks, type BookType } from '~/lib/services/book.service'

  const books$ = getBooks()

  const add = () => {
    const id = getUUID()
    const b: BookType = {
      id,
      name: `name-${id}`,
      description: `description-${id}`,
    }
    addBook(b)
  }
  const del = (id: string) => {
    delBook(id)
  }
</script>

<div>
  <button on:click|preventDefault={add} class="btn">create book</button>
</div>
<div class="mt-4 flex flex-col gap-4">
  {#each $books$ as item (item.id)}
    <div class="border-gray flex flex-col items-start gap-2 border p-4">
      <h2 class="text-blue-300">{item.name}</h2>
      <span>{item.description}</span>
      <button class="btn block bg-pink-400" on:click|preventDefault={() => del(item.id)}
        >delete book</button
      >
    </div>
  {/each}
</div>
