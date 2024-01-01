<script>
    export let cScale;
    export let hoveredContinent;
    export let rmdat;

    import * as d3 from 'd3';
    import { max } from "d3-array";
    import { scaleLinear } from "d3-scale";

    let width = 400;
    let height = 100;

    let xScale = scaleLinear().domain([0, max(rmdat, function(d) {return d.RegFreq})]).range([0, (width-100)])
</script>

<style>
  .legend {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 5px;
  }

  svg {
    display: block;
    margin: auto;
    transform: translateX(20%);
  }


  text.unhovered {
    opacity: 0.3;
  }

  text.legendTitle {
	        text-anchor: start;
	        font-size: 1.2rem;
	        fill: #4F4F4F;
	        font-weight: 200;
	    }
</style>

<div class='legend' on:mouseleave={() => (hoveredContinent = null)}>
  <svg width={width} height={height}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:{cScale(cScale.domain()[0])};stop-opacity:1" />
        <stop offset="100%" style="stop-color:{cScale(cScale.domain()[1])};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="300" height="20" fill="url(#grad1)"/>
    {#each xScale.ticks(5) as d}
      <text class="legendTitle" on:mouseover={() => (hoveredContinent = d)}
      class:unhovered={hoveredContinent && hoveredContinent !== d}
      x={xScale(d)} y={height-50}>
        {d}
      </text>
    {/each}
  </svg>
</div>
