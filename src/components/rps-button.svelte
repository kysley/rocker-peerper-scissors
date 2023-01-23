<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let choice: "rock" | "paper" | "scissors";
  export let selected = false;
  export let disabled = false;
  export let alt = false;
  export let flipped = false;

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("change", choice)}
  class:selected
  class:flipped
  {disabled}
  class:alt
  ><img src="{choice}.webp" alt={choice} />
</button>

<style>
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    min-width: 160px;
    min-height: 160px;
  }

  button:hover img {
    transform: translateY(-5px);
  }

  button.selected {
    transform: translateY(-5px);
    outline: 3px groove gold;
    padding: 5px;
    background-color: rgb(155, 41, 85);
  }

  button.selected:hover img {
    transform: none;
  }

  button.alt {
    background-color: #ee6b3b30;
    outline: 3px #3d3fb4 ridge;
  }

  button.flipped img {
    transform: scaleX(-1);
  }

  button.alt.selected {
    outline: 3px groove gold;
    background-color: rgb(155, 41, 85);
  }
</style>
