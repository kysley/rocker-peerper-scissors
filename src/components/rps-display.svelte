<script lang="ts">
  export let choice: "rock" | "paper" | "scissors";
  export let alt = false;
  export let flipped = false;
  export let highlighted = false;
</script>

<div class:highlighted class:flipped class:alt>
  <img src="{choice}.webp" alt={choice} />
</div>

<style>
  div {
    cursor: grab;
    min-width: 160px;
    min-height: 160px;
    transition: transform 0.05s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.alt {
    background-color: #ee6b3b30;
    outline: 3px #3d3fb4 ridge;
  }

  div.flipped img {
    transform: scaleX(-1);
  }

  div.highlighted {
    outline: 3px groove gold;
    background-color: rgb(155, 41, 85);
  }
</style>
