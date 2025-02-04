<script>

export let data;
import { fly, fade } from "svelte/transition"

</script>

<style>

  .tooltip {
    display: flex;
    flex-direction: column;
    position: absolute;
    pointer-events: none;
    width: 50%;
    transition: top 300ms ease, left 300ms ease;
    top: 40%;
    left: 21%;
    text-align: center;
    background-color: #ffd502;
    border-radius: 25px;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px 5px #238C33;
  }

  .lesson {
    font-family: sans-serif;
    font-size: 2em;
    color: #D9043D;
    font-weight: 800;
  }

  .signiture {
    font-family: 'Staatliches', cursive;
    font-size: 1.5em;
  }
</style>

<div class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade>
  <em><p class="lesson">{data["Lesson Learned"]}</p></em>
  <p class="signiture">- Mum</p>
</div>
