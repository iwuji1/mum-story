<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceCenter, forceRadial } from "d3-force";

  const width = 500;
  const height = 500;

  const radius = 150;
  let padding = 5
  let minX = -100
  let maxX = 100
  let minY = -100
  let maxY = 100

  // Star shape path (simplified for illustration)
  const starPath = 'M274.016 104.858 355.445 361.004 150 200 400 200 201.036 359.878Z'

  const numCircles = 100;

  const circleData = d3.range(numCircles).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }));

  const force = d3.forceSimulation(circleData)

  let nodes = [];
  force.on("tick", () => {
    nodes = force.nodes();
  })

  $: {
    force
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(2))
  }


  onMount(() => {

    });
</script>

<style>
  /* Add your styles here */
</style>


  <svg width="500" height="500">

    {#each nodes as node, i}
      <circle
      cx={node.x}
      cy={node.y}
      r="10"
      fill="blue" />
    {/each}
  </svg>
