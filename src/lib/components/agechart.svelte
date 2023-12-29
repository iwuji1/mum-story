<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";

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

.bars {
  transform: translate(10%, 0)
}

.chart-txt {
  fill: #ffffff;
  transform: translate(10%, 1%);
  font-family: sans-serif;
}

svg {
  width: 80vw;
  height: 60vh;
}

</style>

<svg class="agebar">
  {#each agedat as d}
  <text class="chart-txt" text-anchor="middle" x={xScale(d["Age Group"]) + xScale.bandwidth() / 2} dy=".3em" y={innerHeight+10}>{d["Age Group"]}</text>
    <rect
      class="bars"
      id= {d["Age Group"]}
      x={xScale(d["Age Group"])}
      y={yScale(d.Freq)}
      width={xScale.bandwidth()}
      height={yScale(0) - yScale(d.Freq)}
      fill="#ee3423"
      />
  {/each}
</svg>
