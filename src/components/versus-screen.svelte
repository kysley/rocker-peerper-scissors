<script lang="ts">
  import { onMount } from "svelte";
  import { determineWinner } from "../utils";
  import RpsButton from "./rps-button.svelte";

  export let playerChoice: "rock" | "paper" | "scissors";
  export let opponentChoice: "rock" | "paper" | "scissors";

  let interval: NodeJS.Timer;
  let choices = ["rock", "paper", "scissors"];
  let placeholderChoice: string;

  $: winState = determineWinner(playerChoice, opponentChoice);

  onMount(() => {
    placeholderChoice = choices[Math.floor(Math.random() * choices.length)];
    interval = setInterval(() => {
      placeholderChoice = choices[Math.floor(Math.random() * choices.length)];
    }, 1200);
  });
</script>

<div class="container">
  <RpsButton choice={playerChoice} alt selected />

  {#if winState}
    {#if winState === "a"}
      <span>you win</span>
    {:else if winState === "b"}
      <span>you lose</span>
    {:else}
      <span>tie</span>
    {/if}
  {/if}

  <div class="opponent-container">
    {#if !opponentChoice}
      <span class="randomized">waiting for opponent</span>
    {/if}
    <RpsButton choice={opponentChoice || placeholderChoice} alt flipped />
  </div>
</div>

<style>
  .container {
    display: grid;
    /* grid-template-columns: auto auto; */
    gap: 25px;
  }

  .opponent-container {
    position: relative;
  }

  .randomized {
    position: absolute;
    width: 100%;
    background-color: black;
    font-size: 2em;
    z-index: 1;
    color: white;
    text-align: center;
    top: 24px;
  }
</style>
