<script>

//d3 map essentials
import * as d3 from 'd3';
import { onMount } from 'svelte';
import * as topojson from "topojson-client";

//colour scale
import { max } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";

//data imports
import world from "$lib/data/country_data.json";
import continents2 from "$lib/data/world_continents_2.json";
import continents from "$lib/data/world_continents.json";
import Legend from "$lib/components/map_legend.svelte";
export let rmdat;

//geopaths
import { geoOrthographic, geoPath, geoNaturalEarth1, geoMercator} from "d3-geo";
import * as d3_composite from "d3-composite-projections";

let countries = topojson.feature(world, world.objects.countries).features;
let borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

let conts = continents.features;
console.log(rmdat)

let width = 1000;
let height = 600;
let hovered;
let hoveredContinent;
const margin = { top: 20, right: 20, left: 120, bottom: 20 };

const subgroups = ["Africa", "Asia", "North America", "Europe","South America", "Oceania", "Antarctica"];

$: projection = geoMercator()
    .scale(width/8)
    .rotate([0, 0, 0])
    .translate([width / 2, height/1.5]);

$: path = geoPath(projection); // This is new!

$: cScale = d3.scaleSequential().domain([0, max(rmdat, function(d) {return d.RegFreq})])
  .interpolator(d3.interpolatePuRd);

</script>

<style>

  svg {
    width: 80vw;
    height: 60vh;
  }

</style>

<div class="map-container">

<Legend {cScale} bind:hoveredContinent />
  <svg class="RM_map">
    <g class="inner-chart" transform="translate({margin.left}, {margin.top})" on:mouseleave={() => (hovered = null)}>
    {#each conts as country}
        <path d={path(country)}
        id={country.properties.CONTINENT}
        fill="black"
        stroke="white" />
    {/each}
    {#each rmdat as dat}
      {#each conts as country}
        {#if dat.Region == country.properties.CONTINENT}
          <path d={path(country)}
          fill={cScale(dat.RegFreq)}
          stroke={hovered || hoveredContinent
            ? hovered === dat || hoveredContinent === dat.Region
              ? "black"
              : "transparent"
            : "white"}
          opacity={hovered || hoveredContinent
            ? hovered === dat || hoveredContinent === dat.Region
              ? 1
              : 0.3
            : 1}
          on:mouseover={() => hovered = dat}
          on:focus={() => hovered = dat}
          tabindex="0" />
        {/if}
      {/each}
    {/each}
    </g>
  </svg>
</div>
