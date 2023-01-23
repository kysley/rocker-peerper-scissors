<script lang="ts">
  import { onMount } from "svelte";

  export let tick = 1000;
  export let steps = ["-", "\\", "|", "/"];

  let position = 0;
  let interval: NodeJS.Timer;

  onMount(() => {
    interval = setInterval(() => {
      if (position < steps.length - 1) {
        position++;
      } else if (position === steps.length - 1) {
        position = 0;
      }
    }, tick);
  });
</script>

<span>[ {steps[position]} ]</span>
