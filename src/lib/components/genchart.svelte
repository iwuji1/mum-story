<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";

  export let gendat;

  let width = 800;
  let height = 400;

  const margin = { top: 20, right: 20, left: 120, bottom: 20 };
  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;


  $: xDomain = gendat.map(function(d) {return d["Gender"]});
  $: yDomain = gendat.map(function(d) {return d.Freq});

  $: xScale = scaleBand().domain(xDomain).range([0, innerWidth]).padding(0.1);
  $: sScale = scaleLinear().domain([0, max(gendat, function(d) {return d.Freq})]).range([20, 180]);


</script>

<style>

.gencircle {
  transform: translate(20%, 10%)
}

.gen-txt {
  fill: #ffffff;
  transform: translate(29%, 10%);
  font-family: sans-serif;
  font-size: 2em;
}

svg {
  width: 80vw;
  height: 100vh;
}

</style>

<svg class="gendbar">
  {#each gendat as d}
    <circle
      class="gencircle"
      id= {d["Gender"]}
      cx={xScale(d["Gender"]) + xScale.bandwidth() }
      cy={xScale.bandwidth()}
      r={sScale(d.Freq)}
      fill="#ffd502"
      />
    <text class="gen-txt" text-anchor="middle" x={xScale(d["Gender"]) + xScale.bandwidth() / 2} dy=".3em" y={xScale.bandwidth()}>{d["Gender"]}</text>
  {/each}
</svg>
