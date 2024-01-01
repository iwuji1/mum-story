<script>
    export let data;
    export let cScale;
    export let width;

    import { fly, fade } from "svelte/transition"

    let tooltipWidth;

    const xNudge = 5;
    const yNudge = 5;

    // If the x position + the tooltip width exceeds the chart width, offset backward to prevent overflow
    $: xPosition =
      data.x + tooltipWidth + xNudge > width
      ? data.x - tooltipWidth - xNudge
      : data.x + xNudge;

    $: yPosition = data.y + yNudge;

</script>

<style>
  .tooltip {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 8px 6px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
    border-radius: 3px;
    pointer-events: none;
    min-width: 130px;
    transition: top 300ms ease, left 300ms ease;
  }

  h1 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
  }

  .freq {
    font-size: 0.8rem;
    color: #ffffff;
    border-radius: 3px;
    text-transform: uppercase;
  }
</style>

<div
  class="tooltip"
  in:fly={{ y: 10, duration: 200, delay: 200 }}
  out:fade
  style="left:{xPosition}px; top:{yPosition}px;"
  bind:clientWidth={tooltipWidth}>
  <!-- Word -->
  <div>
    <h1>
      {data.Word}
    </h1>
  </div>
  <!-- Additional info under the Word -->
  <div class="freq" style="background: {cScale(data.Word)};">
      {data.Freq}
  </div>
</div>
