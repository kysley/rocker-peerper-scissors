<script lang="ts">
  import Peer, { type DataConnection } from "peerjs";
  import RpsSelect from "../components/rps-select.svelte";
  import VersusScreen from "../components/versus-screen.svelte";

  const peer = new Peer();
  let config: { mode: "bo1" | "bo3" | "bo5" } = { mode: "bo1" };
  let state: {
    id: string;
    connection?: DataConnection;
    choice?: "rock" | "paper" | "scissors";
    submitted: boolean;
  } = { id: "", submitted: false };
  let opponentChoice: "rock" | "paper" | "scissors";

  $: choice = state.choice;

  peer.on("open", (id) => {
    state.id = id;
  });

  peer.on("connection", handleConnection);

  function handleConnection(conn: DataConnection) {
    state.connection = conn;
    conn.on("open", () => console.log("peer has connected"));
    conn.on("data", (data: any) => {
      if (data.choice) {
        opponentChoice = data.choice;
      }
    });
  }

  function choiceChangeCallback(event) {
    state.choice = event.detail;
  }

  function handleSubmitChoice() {
    state.connection?.send({ choice: state.choice });
    state.submitted = true;
  }

  function copyGameLink() {
    navigator.clipboard.writeText(`${window.location.href}${state.id}`);
  }
</script>

<div class="container">
  {#if state.id !== "disconnected"}
    {#if !state.connection}
      <button class="button" on:click={copyGameLink}>Copy invite link</button>
    {/if}

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
  }

  .button {
    align-self: flex-start;
  }
</style>
