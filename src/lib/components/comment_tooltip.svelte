<script>

export let data;

import { fly, fade } from "svelte/transition"

</script>

<style>

  .tooltip {
    pointer-events: none;
    width: 75%;
    transition: top 300ms ease, left 300ms ease;
  }

  p {
    font-family: sans-serif;
    font-size: 1em;
    color: #ffffff;
  }
</style>

<div class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade>
  <p>{data["Lesson Learned"]}</p>
</div>
