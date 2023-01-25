<script lang="ts">
  import { page } from "$app/stores";
  import Peer, { type DataConnection } from "peerjs";
  import RpsSelect from "../../components/rps-select.svelte";
  import VersusScreen from "../../components/versus-screen.svelte";
  import { determineWinner } from "../../utils";

  const peer = new Peer();

  let state: {
    id: string;
    connection?: DataConnection;
    choice?: "rock" | "paper" | "scissors";
    submitted: boolean;
    connected: boolean;
  } = { id: "", submitted: false, connected: false };
  // let connection: DataConnection | undefined;
  // let displayid = "disconnected";
  // let connected = false;
  // let choice: "rock" | "paper" | "scissors";
  let opponentChoice: "rock" | "paper" | "scissors";
  // let submitted = false;

  $: choice = state.choice;
  $: winState = determineWinner(state.choice, opponentChoice);

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
    {/if}
  {:else}
    <p>connecting...</p>
  {/if}

  <!-- {#if state.connected}
    <h1>connected</h1>

    <span>host: {$page.params.slug}</span>
    <span>choice: {state.choice}</span>

    <button on:click={handleSubmitChoice} disabled={state.submitted}
      >{state.submitted ? "waiting for other player" : "submit"}</button
    >

    <RpsSelect bind:choice on:change={choiceChangeCallback} />

    {#if submitted}
      <p>you: {choice}</p>
      {#if otherPlayerChoice}
        <p>them: {otherPlayerChoice}</p>
        <span>
          {#if winState === "tie"}
            tie
          {:else if winState === "a"}
            you won
          {:else}
            you lost
          {/if}
        </span>
      {/if}
    {/if}
  {:else} -->
  <!-- <h1>connecting</h1>
  {/if} -->
</div>

<style>
  .container {
    display: flex;
    gap: 25px;
    flex-direction: column;
    font-family: monospace;
    margin: 25px 0;
    /* align-items: flex-start; */
  }
  .button {
    align-self: flex-start;
  }
</style>
