<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let choice: "rock" | "paper" | "scissors";

  const dispatch = createEventDispatcher();

  function onChange(value: typeof choice) {
    choice = value;
    dispatch("change", value);
  }
</script>

<section>
  <button on:click={() => onChange("rock")}>rock</button>
  <button on:click={() => onChange("paper")}>paper</button>
  <button on:click={() => onChange("scissors")}>scissors</button>
</section>
