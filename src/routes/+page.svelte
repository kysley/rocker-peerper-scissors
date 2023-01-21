<script lang="ts">
  import Peer, { type DataConnection } from "peerjs";
  import RpsSelect from "../components/rps-select.svelte";
  import { determineWinner } from "../utils";

  const peer = new Peer();
  let connection: DataConnection | undefined;
  let displayid = "disconnected";
  let choice: "rock" | "paper" | "scissors";
  let otherPlayerChoice: "rock" | "paper" | "scissors";
  let submitted = false;

  $: winState = determineWinner(choice, otherPlayerChoice);

  peer.on("open", (id) => {
    displayid = id;
  });

  peer.on("connection", handleConnection);

  function handleConnection(conn: DataConnection) {
    connection = conn;
    conn.on("open", () => console.log("peer has connected"));
    conn.on("data", (data: any) => {
      if (data.choice) {
        otherPlayerChoice = data.choice;
      }
    });
  }

  function choiceChangeCallback(event) {
    choice = event.detail;
  }

  function handleSubmitChoice() {
    connection?.send({ choice });
    submitted = true;
  }
</script>

{#if displayid !== "disconnected"}
  <h1>connected</h1>
  <a target="_blank" href="/{displayid}" rel="noreferrer">link: {displayid}</a>

  {#if connection}
    <span>choice: {choice}</span>

    <button on:click={handleSubmitChoice} disabled={submitted || !choice}
      >{submitted ? "waiting for other player" : "submit"}</button
    >
    <RpsSelect bind:choice on:change={choiceChangeCallback} />
  {:else}
    <span>waiting for player...</span>
  {/if}

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
{:else}
  <h1>connecting</h1>
{/if}
