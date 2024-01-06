<script>

export let data;
import { fly, fade } from "svelte/transition"

</script>

<style>

  .tooltip {
    display: flex;
    position: absolute;
    pointer-events: none;
    width: 25%;
    transition: top 300ms ease, left 300ms ease;
    top: 40%;
    left: 21%;
    text-align: center;
  }

  p {
    font-family: sans-serif;
    font-size: 1.5em;
    color: #ffffff;
  }
</style>

<div class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade>
  <p>{data["Lesson Learned"]}</p>
</div>
