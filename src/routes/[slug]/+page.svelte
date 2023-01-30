<script lang="ts">
  import { page } from "$app/stores";
  import Peer, { type DataConnection } from "peerjs";
  import RpsPostGame from "../../components/rps-post-game.svelte";
  import RpsSelect from "../../components/rps-select.svelte";
  import VersusScreen from "../../components/versus-screen.svelte";

  const peer = new Peer();

  let state: {
    id: string;
    connection?: DataConnection;
    choice?: "rock" | "paper" | "scissors";
    submitted: boolean;
    connected: boolean;
    rematch: boolean;
  } = { id: "", submitted: false, connected: false, rematch: false };
  let opponentChoice: "rock" | "paper" | "scissors";
  let opponentRematch = false;

  $: choice = state.choice;

  $: if (state.rematch && opponentRematch) {
    state.submitted = false;
    state.rematch = false;
    state.choice = undefined;
    opponentRematch = false;
    opponentChoice = undefined;
  }

  peer.on("open", (id) => {
    state.id = id;
    console.log(id);
    let conn = (state.connection = peer.connect($page.params.slug));
    conn.on("open", () => {
      console.log("connected to peer");
      state.connected = true;
      conn.send({ id });
    });
    conn.on("data", (data) => {
      if (data.choice) {
        opponentChoice = data.choice;
      }
      if (data.rematch) {
        opponentRematch = data.rematch;
      }
    });
  });

  function choiceChangeCallback(event) {
    state.choice = event.detail;
  }

  function handleSubmitChoice() {
    state.connection?.send({ choice: state.choice });
    state.submitted = true;
  }
</script>

<div class="container">
  {#if state.id !== "disconnected"}
    {#if state.connection}
      {#if !state.submitted}
        <RpsSelect
          bind:choice
          on:change={choiceChangeCallback}
          disabled={state.submitted}
        />
        <button
          class="button"
          on:click={handleSubmitChoice}
          disabled={state.submitted || !state.choice}
          >{state.submitted
            ? "other player choosing"
            : "confirm choice"}</button
        >
      {/if}
    {/if}

    {#if state.submitted && state.choice}
      <VersusScreen playerChoice={state.choice} {opponentChoice} />
      {#if opponentChoice}
        <RpsPostGame
          connection={state.connection}
          opponentReady={opponentRematch}
          on:rematch={(event) => {
            state.rematch = event.detail;
            // state.connection?.send({})
          }}
        />
      {/if}
    {/if}
  {:else}
    <p>connecting...</p>
  {/if}
</div>

<style>
  .container {
    display: flex;
    gap: 25px;
    flex-direction: column;
    font-family: monospace;
    /* align-items: flex-start; */
  }
  .button {
    align-self: flex-start;
  }
</style>
