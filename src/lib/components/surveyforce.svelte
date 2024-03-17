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
export let np;

let width = 800;
let height = 700;
let hovered;
let words;

const margin = { top: 20, right: 20, left: 120, bottom: 20 };
$: innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;

$: xDomain = data.map(function(d) {return d["Word"]});

$: sScale = scaleLinear().domain([0, max(data, function(d) {return d.Freq})]).range([20,100]);
$: cScale = d3.scaleOrdinal().domain(xDomain).range(["#ffd502","#5d00fe","#0020fe","#000000","#ffffff", "#94e202"]);

const simulation = forceSimulation(data); // Instantiate a barebones simulation

let nodes = [];

$: {
  if (np!= true) {
    simulation.alpha(0.5).restart()

    simulation.on("tick", () => {
      nodes = simulation.nodes();
    });

    simulation
        .force("x", forceX(0))
        .force("y", forceY(0))
    } else {

      simulation.alpha(0.5).restart()

      simulation.on("tick", () => {
        nodes = simulation.nodes();
      });

      simulation
          .force("charge", forceManyBody().strength(100))
          .force('center', forceCenter(width / 2, height / 2))
          .force("collide", forceCollide().radius(function(d) {return sScale(d.Freq)}).strength(1).iterations(5))
      }
    }

</script>

<style>

svg {
  width: 80vw;
  height: 60vh;
}

text {
  transform: translate(25%, -10%) scale(0.8)
}

@media screen and (max-width: 780px) {

  svg {
    width: 100vw;
    height: 50vh;
  }

  text {
    transform: translate(-5%, 0%) scale(0.5)
  }

}

@media screen and (max-width: 400px) {

  svg {
    width: 100vw;
    height: 50vh;
  }

  text {
    transform: translate(-5%, 0%) scale(0.5)
  }

}

</style>
  <svg class="feelsforce" id="feels">
      {#each nodes as node, i}
        <text class="txt-1"
        text-anchor="middle"
        x={node.x}
        dy=".3em"
        y={node.y}
        fill={cScale(node.Word)}
        font-size={sScale(node.Freq)}>
        {node.Word}
        </text>
      {/each}
  </svg>
