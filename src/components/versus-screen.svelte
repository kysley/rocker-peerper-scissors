<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { determineWinner } from "../utils";
  import RpsDisplay from "./rps-display.svelte";
  import Spinner from "./spinner.svelte";

  export let playerChoice: "rock" | "paper" | "scissors";
  export let opponentChoice: "rock" | "paper" | "scissors";

  let interval: NodeJS.Timer;
  let choices = ["rock", "paper", "scissors"];
  let placeholderChoice: string;
  let state = "waiting";

  $: winState = determineWinner(playerChoice, opponentChoice);

  $: if (playerChoice && opponentChoice) {
    setTimeout(() => {
      state = "results";
    }, 800);
  }

  onMount(() => {
    placeholderChoice = choices[Math.floor(Math.random() * choices.length)];
    interval = setInterval(() => {
      placeholderChoice = choices[Math.floor(Math.random() * choices.length)];
    }, 1200);
  });
</script>

{#if state === "waiting"}
  <div class="container">
    <div
      in:fly={{ y: -100, duration: 600 }}
      style="position: relative;"
      class:beat={winState === "b"}
    >
      <RpsDisplay choice={playerChoice} highlighted />
    </div>
    <div
      in:fly={{ y: 100, duration: 600 }}
      style="position: relative;"
      class:beat={winState === "a"}
    >
      {#if !opponentChoice}
        <span class="randomized">waiting for opponent <Spinner /></span>
      {/if}
      <RpsDisplay choice={opponentChoice || placeholderChoice} alt flipped />
    </div>
  </div>
{:else}
  <div class="container">
    <div
      out:fade={{ duration: 600, delay: 600 }}
      style="position: relative;"
      class:beat={winState === "b"}
    >
      {#if winState === "a"}
        <span class="randomized">You win!</span>
      {:else if winState === "tie"}
        <span class="randomized">Tie.</span>
      {/if}
      <RpsDisplay choice={playerChoice} highlighted />
    </div>

    <div class="opponent-container" class:beat={winState === "a"}>
      <div style="position:relative;">
        <RpsDisplay choice={opponentChoice} alt flipped />
      </div>
      {#if winState === "b"}
        <span class="randomized">They win!</span>
      {:else if winState === "tie"}
        <span class="randomized">Tie.</span>
      {/if}
    </div>
  </div>{/if}

<style>
  .container {
    display: grid;
    gap: 25px;
  }

  .opponent-container {
    position: relative;
    display: grid;
  }

  .randomized {
    position: absolute;
    width: 100%;
    background-color: black;
    font-size: 2em;
    z-index: 1;
    color: white;
    text-align: center;
    bottom: 8px;
  }

  .beat {
    opacity: 0.25;
    transition: all 0.2s ease-in;
    transition-delay: 500ms;
  }
</style>
