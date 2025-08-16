<script lang="ts">
  const env = import.meta.env
</script>

<h2>===environment===</h2>
<div>
  MODE: {env.MODE} <br />
  BASE_URL: {env.BASE_URL} <br />
  VITE_GIT_SHORT_VER: {env.PUBLIC_GIT_SHORT_VER} <br />
  VITE_GIT_TIME: {env.PUBLIC_GIT_TIME} <br />
  DB_PASSWORD(client is empty): {env.DB_PASSWORD} <br />
</div>

<style>
  /* your styles go here */
</style>
