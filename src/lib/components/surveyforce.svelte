<script>
import * as d3 from 'd3';
import { scaleBand, scaleLinear } from "d3-scale";
import { max, mean, rollups } from "d3-array";
import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceCenter } from "d3-force";
import Tooltip from "$lib/components/force_tooltip.svelte";
import { fade } from "svelte/transition";
import { onMount } from 'svelte';
import gsap from 'gsap';

export let data;

let width = 800;
let height = 400;
let hovered;

const margin = { top: 20, right: 20, left: 120, bottom: 20 };
$: innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;

$: xDomain = data.map(function(d) {return d["Word"]});

$: sScale = scaleLinear().domain([0, max(data, function(d) {return d.Freq})]).range([10,50]);
$: cScale = d3.scaleOrdinal().domain(xDomain).range(["#b22234","#012169","#009246","#C09300","#ED2939","#F1BF00","#2D2926","#046A38","#FFB81C","#0645B1","#7f3b08"]);

const simulation = forceSimulation(data); // Instantiate a barebones simulation

let nodes = [];
simulation.on("tick", () => {
  nodes = simulation.nodes();
});

// Run the simulation whenever any of the variables inside of it change
$: {
  simulation
      .force("charge", forceManyBody().strength(20))
      .force("x", forceX().strength(0.01))
      .force("y", forceY().strength(0.01))
      .force('center', forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(function(d) {return sScale(d.Freq)}).strength(1))
  }

</script>

<style>

</style>
<div class="force-chart">
  <svg {width} {height}>
    <g class="inner-chart" on:mouseleave={() => (hovered = null)}>
      {#each nodes as node, i}
        <circle
        cx={node.x}
        cy={node.y}
        r={sScale(node.Freq)}
        fill={cScale(node.Word)}
        on:mouseover={() => hovered = node}
        on:focus={() => hovered = node}
        tabindex="0"/>
      {/each}
    </g>
  </svg>
  {#if hovered}
  <Tooltip data={hovered} {cScale} {width}/>
  {/if}
</div>
