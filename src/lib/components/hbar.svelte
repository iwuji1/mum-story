<script>

  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  const data = [
    {"Ethnic_group":"Asian/ Asian British",
  "couple_parents":12,
  "single_parents": 5},
  {"Ethnic_group":"Black/ Black British",
  "couple_parents":4,
  "single_parents": 9},
  {"Ethnic_group":"Mixed/ Multiple ethnic groups",
  "couple_parents":1,
  "single_parents": 3},
  {"Ethnic_group":"White/ White British",
  "couple_parents":80,
  "single_parents": 80},
  {"Ethnic_group":"Other ethnic group",
  "couple_parents":3,
  "single_parents": 3}
  ]

  let width = 600;
  let height = 500;

  const margin = { top: 20, right: 20, left: 120, bottom: 20 };
  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;

  $: cDomain = data.map(function(d) {return d.couple_parents});
  $: sDomain = data.map(function(d) {return d.single_parents});
  $: yDomain = data.map(function(d) {return d.Ethnic_group});

  $: yScale = scaleBand().domain(yDomain).range([0, innerHeight]).padding(0.1);
  $: cScale = scaleLinear().domain([0, max(data, function(d) {return d.couple_parents})]).range([0, innerWidth]);
  $: sScale = scaleLinear().domain([0, max(data, function(d) {return d.single_parents})]).range([0, innerWidth]);

</script>

<style>

  svg {
    width: 50vw;
    height: 90vh;
  }
  .cbars {
    transform: translate(22%, 15%)
  }

  .chart-txt {
    fill: #ffffff;
    transform: translate(5%, 10%);
    font-family: sans-serif;
  }

  p {
    color: #ffffff;
    font-size: 1rem;
  }

  @media screen and (max-width: 780px) {
    .cbars {
      transform: translate(25%, 0%) scale(0.5);
    }

    .chart-txt {
      transform: translate(10%, -5%) scale(0.5);
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
    .cbars {
      transform: translate(25%, 0%) scale(0.5);
    }
    .chart-txt {
      transform: translate(25%, 0%) scale(0.5);
    }

    svg {
      width: 100vw;
      height: 50vh;
    }

    p {
      font-size: 1rem;
    }

  }

</style>

  <svg class="hbar">
    {#each data as d}
    <foreignObject class="chart-txt" x="0" dy=".3em" y={yScale(d.Ethnic_group) + yScale.bandwidth() / 2} height="100" width="100"><p>{d.Ethnic_group}</p></foreignObject>
      <rect
        class="cbars"
        id= {d.Ethnic_group}
        x="0"
        y={yScale(d.Ethnic_group)}
        width={cScale(d.couple_parents)}
        height={yScale.bandwidth()/2}
        fill="#ff4f1d"
        />
      <rect
        class="cbars"
        id= {d.Ethnic_group}
        x="0"
        y={yScale(d.Ethnic_group) + yScale.bandwidth()/2}
        width={cScale(d.single_parents)}
        height={yScale.bandwidth()/2}
        fill="#ffd502"
        />
    {/each}

  </svg>
