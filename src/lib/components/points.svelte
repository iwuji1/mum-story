<script>
    import gsap from 'gsap';
    import * as d3 from 'd3';
    import { scaleBand, scaleLinear } from "d3-scale";
    import { max, mean, rollups, range } from "d3-array";
    import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceCenter } from "d3-force";
    import { onMount } from 'svelte';
    import Points from '$lib/assets/points.json';


    let points = Points;


    let width = 800;
    let height = 600;
    let numDots = 100;
    let colorScale = ['orange', 'lightblue', '#B19CD9'];
    let xCenter = [100, 300, 500];

    let nodes = range(numDots).map(function(d,i) {
        return {
            radius: Math.random() * 25,
            category: i % 3
        }
    });

    let targets = points.map(function(d,i) {
        return {
            x_pos: d[0],
            y_pos: d[1],
            radius: 5,
            category: i % 3
        }
    })

    console.log(nodes)
    
    let simulation = forceSimulation(targets)
    .alphaTarget(0.3)
    .velocityDecay(0.1)
    .force("x", d3.forceX().strength(0.01))
    .force("y", d3.forceY().strength(0.01))
    .force('charge', d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('collide', d3.forceCollide().radius(d => d.r + 1).iterations(3))

    simulation.restart()

    simulation.on("tick", () => {
        nodes = simulation.nodes();
      });
    
</script>

<style>
    .background {
        display: flex;
        height: 100vh;
        width: 100vw;
        justify-content: center;
    }

    h1 {
        color: white;
        font-size: 10em;
        align-self: center;
    }

    svg {
        width: 50vw;
        height: 100vh;
    }

    circle {
    transform: translate(50%, 50%)
  }
</style>

<div class="background">
    <h1>
        Check
    </h1>

    <svg class="vis">
        {console.log(targets)}
        {#each targets as node, i}
        <circle 
        class="fcircle"
        r = {node.radius}
        cx = {node.x}
        cy = {node.y}
        fill = {colorScale[node.category]}/>
        {/each}
        
    </svg>

</div>