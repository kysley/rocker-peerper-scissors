<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RpsButton from "./rps-button.svelte";

  export let choice: "rock" | "paper" | "scissors" | undefined;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleChoice(event: any) {
    choice = event.detail;
    dispatch("change", choice);
  }
</script>

<section>
  <RpsButton
    choice="rock"
    selected={choice === "rock"}
    on:change={handleChoice}
    {disabled}
  />
  <RpsButton
    choice="paper"
    selected={choice === "paper"}
    on:change={handleChoice}
    {disabled}
  />
  <RpsButton
    choice="scissors"
    selected={choice === "scissors"}
    on:change={handleChoice}
    {disabled}
  />
</section>

<style>
  section {
    display: flex;
    gap: 5em;
    justify-content: baseline;
  }
</style>
