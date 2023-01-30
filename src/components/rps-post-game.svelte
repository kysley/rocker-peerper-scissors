<script lang="ts">
  import type { DataConnection } from "peerjs";
  import { createEventDispatcher, onMount } from "svelte";

  export let connection: DataConnection;
  let playersReady: 0 | 1 | 2 = 0;
  export let opponentReady: boolean;

  let hasReadied = false;

  $: if (opponentReady) playersReady++;

  const dispatch = createEventDispatcher<{ rematch: boolean }>();

  function handleRematch() {
    connection.send({ rematch: true });
    dispatch("rematch", true);
    playersReady++;
    hasReadied = true;
  }
</script>

<div class="container">
  <button on:click={handleRematch} disabled={hasReadied}
    >Rematch {playersReady} / 2</button
  >
</div>

<style>
  .container {
    display: flex;
  }
</style>
