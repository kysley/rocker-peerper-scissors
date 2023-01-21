<script lang="ts">
  import { page } from "$app/stores";
  import Peer, { type DataConnection } from "peerjs";
  import RpsSelect from "../../components/rps-select.svelte";

  const peer = new Peer();

  let connection: DataConnection | undefined;
  let displayid = "disconnected";
  let connected = false;
  let choice: "rock" | "paper" | "scissors";
  let otherPlayerChoice: "rock" | "paper" | "scissors";
  let submitted = false;

  peer.on("open", (id) => {
    displayid = id;
    console.log(id);
    let conn = (connection = peer.connect($page.params.slug));
    conn.on("open", () => {
      console.log("connected to peer");
      connected = true;
      conn.send({ id: displayid });
    });
    conn.on("data", (data) => {
      if (data.choice) {
        otherPlayerChoice = data.choice;
      }
    });
  });

  function choiceChangeCallback(event) {
    choice = event.detail;
  }

  function handleSubmitChoice() {
    connection?.send({ choice });
    submitted = true;
  }
</script>

{#if connected}
  <h1>connected</h1>

  <span>host: {$page.params.slug}</span>
  <span>playing: {choice}</span>

  <button on:click={handleSubmitChoice} disabled={submitted}
    >{submitted ? "waiting for other player" : "submit"}</button
  >

  <RpsSelect bind:choice on:change={choiceChangeCallback} />

  {#if submitted}
    <p>you: {choice}</p>
    {#if otherPlayerChoice}
      <p>them: {otherPlayerChoice}</p>
    {/if}
  {/if}
{:else}
  <h1>connecting</h1>
{/if}
