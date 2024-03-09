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
  color: #ffffff;
  transform: translate(36%, 4%);
  font-family: sans-serif;
}

.ageaxis {
  stroke: #ffffff;
  stroke-width: 2px;
  transform: translate(35.5%, 0%);
}

svg {
  width: 80vw;
  height: 100vh;
}

@media screen and (max-width: 780px) {

  svg {
    width: 80vw;
    height: 50vh;
  }

  .agebars {
    transform: translate(20%, 0%) scale(0.5)
  }

  .age-txt {
    transform: translate(15%, 5%) scale(0.5);
  }

  .ageaxis {
    stroke: #ffffff;
    stroke-width: 2px;
    transform: translate(6%, -6%);
  }

  p {
    font-size: 1rem;
  }

}

@media screen and (max-width: 400px) {

  svg {
    width: 100vw;
    height: 50vh;
  }

  .agebars {
    transform: translate(20%, 0%) scale(0.5)
  }

  .age-txt {
    transform: translate(15%, 5%) scale(0.5);
  }

  p {
    font-size: 1rem;
  }

}

</style>

<div class="age-container">

  <svg class="agebar">
    {#each agedat as d}
    <foreignObject class="age-txt" x="-50" dy=".3em" y={xScale(d["Age Group"]) + xScale.bandwidth() / 5} width={xScale.bandwidth()} height="180"><p>{d["Age Group"]}</p></foreignObject>
    <line class="ageaxis" x1="50" y1="50" x2="50" y2="660"/>
      <rect
        class="agebars"
        id= {d["Age Group"]}
        x="0"
        y={xScale(d["Age Group"]) + xScale.bandwidth()/2}
        width={yScale(d.Freq)}
        height={xScale.bandwidth()/2}
        fill="#ffd502"
        />
    {/each}
  </svg>
</div>
