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


#p45 {
  fill: #ff2ac4;
  transform: translate(20%, 40%) scale(2.16);
  stroke: #000000;
}

#p25 {
  fill: #ffd502;
  transform: translate(50%, 45%) scale(1.2);
  stroke: #000000;
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

@media screen and (max-width: 780px) {
  #p45 {
    fill: #ff2ac4;
    transform: translate(3%, 0%) scale(1.8)
  }

  #p25 {
    fill: #ffd502;
    transform: translate(65%, 25%) scale(0.6)
  }

  .gen-txt {
    transform: translate(10%, 30%) scale(0.5);
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

  #p45 {
    fill: #ff2ac4;
    transform: translate(3%, 0%) scale(1.8)
  }

  #p25 {
    fill: #ffd502;
    transform: translate(65%, 25%) scale(0.6)
  }

  .gen-txt {
    transform: translate(10%, 30%) scale(0.5);
  }

  p {
    font-size: 1rem;
  }

}

</style>

<svg class="gendbar">
  {#each gendat as d}
    <g>
      <path id="p{d.Freq}" class="gencircle" d="M52.65,125.2h19.9c3.3,0,6-2.7,6-6V86.301h3.399c3.301,0,6-2.701,6-6V43.2c0-3.3-2.699-6-6-6H43.25c-3.3,0-6,2.7-6,6
        v37.101c0,3.299,2.7,6,6,6h3.4V119.2C46.65,122.5,49.25,125.2,52.65,125.2z"/>
      <circle id="p{d.Freq}" class="gencircle"  cx="62.55" cy="15.7" r="15.7"/>
    </g>
    <text class="gen-txt" text-anchor="middle" x={xScale(d["Gender"]) + xScale.bandwidth() / 2} dy=".3em" y={xScale.bandwidth()}>{d["Gender"]}</text>
  {/each}
</svg>
