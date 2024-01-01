<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max, mean, rollups } from "d3-array";
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceCenter, forceRadial } from "d3-force";
  import Tooltip from "$lib/components/comment_tooltip.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  export let data;

  let width = window.innerWidth
  let height = window.innerHeight

  let coms = data[5]

  let hovered;

  const simulation = forceSimulation(coms)

  let nodes = [];
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });

  // Run the simulation whenever any of the variables inside of it change
  $: {
    simulation
        .force("radial", forceRadial().x(width/ 3).y(height / 2).radius(200).strength(5))
        .force("collide", forceCollide().radius(13).strength(1).iterations(5))
    }

</script>

<style>

  .lesson-chart {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    background-color: #000000;
    margin: auto;
    padding: 0%;
  }

  .chart-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: auto;
  }

  .chart-text h1 {
    font-family: sans-serif;
    font-size: 10em;
    align-self: center;
    margin: auto;
    color: #ffd502
  }

  .chart-text p {
    font-family: sans-serif;
    font-size: 2em;
    align-self: flex-start;
    color: #ffffff;
  }

  svg {
    width: 50vw;
    height: 100vh;
  }

</style>


<div class="lesson-chart">
  <div class="chart-img" bind:clientWidth={width}>
    <svg>
      <g class="inner-chart" on:mouseleave={() => (hovered = null)}>
        {#each nodes as node, i}
          <circle
          cx={node.x}
          cy={node.y}
          r={10}
          fill={hovered
            ? hovered === node
              ? "#ffd502"
              : "white"
            : "white"}
          stroke={hovered
            ? hovered === node
              ? "black"
              : "transparent"
            : "white"}
          opacity={hovered
            ? hovered === node
              ? 1
              : 0.3
            : 1}
          on:mouseover={() => hovered = node}
          on:focus={() => hovered = node}
          tabindex="0" />
        {/each}
      </g>
    </svg>
  </div>
  <div class="chart-text">
    <h1>To Our Mothers</h1>
    <p>Reflecting on Motherhood for BHM 2023</p>
    {#if hovered}
      <Tooltip data={hovered}/>
    {/if}
  </div>
</div>
