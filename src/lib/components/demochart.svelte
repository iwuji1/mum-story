<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import { onMount } from 'svelte';

  export let demodat;

  let width = 800;
  let height = 400;

  const margin = { top: 20, right: 20, left: 120, bottom: 20 };
  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;


  $: xDomain = demodat.map(function(d) {return d["Ethnic Background"]});
  $: yDomain = demodat.map(function(d) {return d.Freq});

  $: xScale = scaleBand().domain(xDomain).range([0, innerWidth]).padding(0.1);
  $: yScale = scaleLinear().domain([0, max(demodat, function(d) {return d.Freq})]).range([innerHeight, 0]);

  let container = document.querySelector(".demobar");

</script>

<style>

.ethbars {
  transform: translate(25%, 0)
}

.eth-txt {
  color: #ffffff;
  transform: translate(22.5%, -2%);
  font-family: sans-serif;
}

svg {
  width: 80vw;
  height: 60vh;
}

@media screen and (max-width: 780px) {
  .ethbars {
    transform: translate(0%, 0%) scale(1);
  }

  .eth-txt {
    transform: translate(0%, 0%) scale(0.5);
  }
  svg {
    width: 100vw;
    height: 50vh;
  }

  p {
    font-size: 1rem;
  }

}

@media screen and (max-width: 400px) {
  .ethbars {
    transform: translate(6%, 0%) scale(0.5);
  }
  .eth-txt {
    transform: translate(0%, 0%) scale(0.5);
  }

  p {
    font-size: 1rem;
  }

}



</style>

<svg class="demobar">
  {#each demodat as d}
  <foreignObject class="eth-txt" x={xScale(d["Ethnic Background"]) + xScale.bandwidth() / 2} dy=".3em" y={innerHeight+10} width={xScale.bandwidth()} height="180"><p>{d["Ethnic Background"]}</p></foreignObject>
    <rect
      class="ethbars"
      id= {d["Ethnic Background"]}
      x={xScale(d["Ethnic Background"])}
      y={yScale(d.Freq)}
      width={xScale.bandwidth()}
      height={yScale(0) - yScale(d.Freq)}
      fill="#ffd502"
      />
  {/each}
</svg>
