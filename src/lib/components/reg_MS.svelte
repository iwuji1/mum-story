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

let width = 800;
let height = 400;
let hovered;
let hoveredContinent;
const margin = { top: 20, right: 20, left: 120, bottom: 20 };

const subgroups = ["Africa", "Asia", "North America", "Europe","South America", "Oceania", "Antarctica"];

$: projection = geoMercator()
    .scale(width/6)
    .rotate([0, 0, 0])
    .translate([width / 2, height/1.5]);

$: path = geoPath(projection); // This is new!

$: cScale = d3.scaleSequential().domain([0, max(rmdat, function(d) {return d.RegFreq})])
  .interpolator(d3.interpolateYlOrBr);

</script>

<style>

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
}

  svg {
    width: 50vw;
    height: 100vh;
  }

  #ctry {
    transform: translate(0%, 20%)
  }

  @media screen and (max-width: 780px) {

    #ctry {
      transform: translate(15%, 40%) scale(.4);
    }

    svg {
      width: 100vw;
      height: 50vh;
    }

  }

  @media screen and (max-width: 400px) {

    #ctry {
      transform: translate(15%, 40%) scale(.4);
    }
    svg {
      width: 100vw;
      height: 50vh;
    }

  }

</style>

<div class="map-container">

  <svg class="RM_map">
    {#each rmdat as dat}
      {#each conts as country}
        {#if dat.Region == country.properties.CONTINENT}
          <path d={path(country)}
          id= "ctry"
          fill={cScale(dat.RegFreq)}
          stroke="black"
          tabindex="0" />
        {/if}
      {/each}
    {/each}
  </svg>
</div>
