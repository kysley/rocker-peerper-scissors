<script lang="ts">
  import "98.css";
</script>

<div class="wrapper">
  <div class="container">
    <header>
      <h1>
        <span>Rock 🤘</span> <span>peerper 📡</span> <span>scissors ✂️</span>
      </h1>
    </header>
    <main>
      <slot />
    </main>
  </div>
</div>

<style>
  main {
    width: 100%;
  }
  * {
    font-family: Arial, Helvetica, sans-serif;
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .container {
    width: 50vw;
    height: 100vh;
    display: flex;
    gap: 25px;
    flex-direction: column;
    /* align-items: flex-start; */
  }

  header {
    display: flex;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    text-align: left;
  }

  h1 span {
    display: block;
  }
</style>
