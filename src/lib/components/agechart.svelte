<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import { onMount } from 'svelte';

  export let agedat;

  let width = 800;
  let height = 400;

  const margin = { top: 20, right: 20, left: 120, bottom: 20 };
  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;


  $: xDomain = agedat.map(function(d) {return d["Age Group"]});
  $: yDomain = agedat.map(function(d) {return d.Freq});

  $: xScale = scaleBand().domain(xDomain).range([0, innerWidth]).padding(0.1);
  $: yScale = scaleLinear().domain([0, max(agedat, function(d) {return d.Freq})]).range([innerHeight, 0]);

</script>

<style>

.agebars {
  transform: translate(40%, 0%)
}

.age-txt {
  fill: #ffffff;
  transform: translate(38%, 3%);
  font-family: sans-serif;
}

svg {
  width: 80vw;
  height: 100vh;
}

</style>

<div class="age-container">

  <svg class="agebar">
    {#each agedat as d}
    <text class="age-txt" text-anchor="end" y={xScale(d["Age Group"]) + xScale.bandwidth() / 2} dy=".3em" x="0">{d["Age Group"]}</text>
      <rect
        class="agebars"
        id= {d["Age Group"]}
        x="0"
        y={xScale(d["Age Group"]) + xScale.bandwidth()/2}
        width={yScale(d.Freq)}
        height={xScale.bandwidth()/2}
        fill="#ee3423"
        />
    {/each}
  </svg>
</div>
