<script>

//d3 map essentials
import * as d3 from 'd3';
import { onMount } from 'svelte';
import * as topojson from "topojson-client";

//colour scale
import { max } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";

//data imports
import continents from "$lib/data/world_continents.json";
import Legend from "$lib/components/map_legend.svelte";
export let rmdat;

//geopaths
import { geoOrthographic, geoPath, geoNaturalEarth1, geoMercator} from "d3-geo";
import * as d3_composite from "d3-composite-projections";

let conts = continents.features;
//getting rid of antartica from the continent data
let relconts = conts.filter(d => d.properties.CONTINENT != "Antarctica")

let width = 800;
let height = 400;
let hovered;
let hoveredContinent;
const margin = { top: 20, right: 20, left: 120, bottom: 20 };

const subgroups = ["Africa", "Asia", "North America", "Europe","South America", "Oceania", "Antarctica"];

$: projection = geoMercator()
    .scale(width/5)
    .rotate([0, 0, 0])
    .translate([width / 2, height/1.5]);

$: path = geoPath(projection); // This is new!

$: cScale = d3.scaleLinear().domain([0, max(rmdat, function(d) {return d.RegFreq})])
.range(["#ffffff","#ff2ac4"]);

$: cScale2 = d3.scaleOrdinal().domain([0, max(rmdat, function(d) {return d.RegFreq})]).range(["#ff4f1d","#ff2ac4"])

$: filtered = marriedp


let divorcedp = {name:"Divorced", data:rmdat.filter(d => d["Parent Marital Status"] === "Divorced")}
let marriedp = {name:"Married", data:rmdat.filter(d => d["Parent Marital Status"] === "Married")}
let seperatedp = {name:"Seperated", data:rmdat.filter(d => d["Parent Marital Status"] === "Seperated")}
let widowedp = {name:"Widowed", data:rmdat.filter(d => d["Parent Marital Status"] === "Widowed")}


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
    transform: translate(8%, 40%) scale(.5);
  }

  #bpath {
    transform: translate(8%, 40%) scale(.5);
  }

  @media screen and (max-width: 780px) {

    #ctry {
      transform: translate(15%, 0%) scale(.6);
    }

    #bpath {
      transform: translate(15%, 0%) scale(.6);
    }
    svg {
      width: 100vw;
      height: 50vh;
    }

  }

  @media screen and (max-width: 400px) {

    #ctry {
      transform: translate(15%, 0%) scale(.6);
    }

    #bpath {
      transform: translate(15%, 0%) scale(.6);
    }
    svg {
      width: 100vw;
      height: 50vh;
    }

  }

</style>

<div class="map-container" bind:clientWidth={width}>
<label>
	<input bind:group={filtered} type="radio" name="amount" value="{marriedp}" /> Married
</label>
<label>
	<input bind:group={filtered} type="radio" name="amount" value="{divorcedp}" /> Divorced
</label>
<label>
	<input bind:group={filtered} type="radio" name="amount" value="{seperatedp}" /> Seperated
</label>
<label>
	<input bind:group={filtered} type="radio" name="amount" value="{widowedp}" /> Widowed
</label>

<h1>Map of recipient location, who's parent's marital status is {filtered.name}</h1>

  <svg class="RM_map">
    {#each relconts as country}
        <path d={path(country)}
        id="bpath"
        fill="#ff4f1d"
        stroke="white" />
    {/each}
    {#each filtered.data as dat}
      {#each relconts as country}
        {#if dat.Region == country.properties.CONTINENT}
          <path d={path(country)}
          id="ctry"
          fill={cScale(dat.RegFreq)}
          stroke="#ffffff"
          tabindex="0" />
        {/if}
      {/each}
    {/each}
  </svg>
</div>
