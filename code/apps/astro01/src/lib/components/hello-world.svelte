<script lang="ts">
	import confetti from "canvas-confetti";

	const lang = "svelte";
</script>

<h2 class=" bg-pink-400 text-black">hello world - {lang}</h2>
<button class="btn mt-2" on:click|preventDefault={() => confetti()}>click it</button>

<style>
</style>
