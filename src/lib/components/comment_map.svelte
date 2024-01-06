<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max, mean, rollups } from "d3-array";
  import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceCenter, forceRadial } from "d3-force";
  import Tooltip from "$lib/components/comment_tooltip.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Ftext from "$lib/Data/force_text.js";
  import Scrolly from "$lib/helpers/Scrolly.svelte";

  export let data;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let coms = data[5];
  let hovered;
  $: currentStep = 0;
  let forcegroup = false;

  const simulation = forceSimulation(coms);

  let nodes = [];
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });

  // Run the simulation whenever any of the variables inside of it change

  $: {
      simulation
          .force("radial", forceRadial().x(width/ 3).y(height / 2).radius(d=> forcegroup ? 200 : 0).strength(0.2))
          .force("collide", forceCollide().radius(13).strength(1))
          .alpha(0.3)
          .alphaDecay(0.0005)
          .restart();
  }

  $: {
  if (currentStep === 0) {
    // Set Colonies to 0 on initial check
    forcegroup = false;
  } else if (currentStep === 1) {
      // increase by a bit to test
      forcegroup = false;

  } else if (currentStep === 2) {
      // Set all data to defaults
      forcegroup = false;
  } else if (currentStep === 3) {
      // Set all data to defaults
      forcegroup = false;
  } else if (currentStep === 4) {
      // Set all data to defaults
      forcegroup = true;
  }
}



onMount(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    markers:false
  })

  var steps = gsap.utils.toArray('.step');
  var s2 = document.querySelectorAll('.step');

  var height = 100 * steps.length;

  var tl = gsap.timeline({
    duration: steps.length,
    scrollTrigger: {
      trigger: ".lesson-chart",
      start: "top center",
      end: "+="+height+"%",
      scrub: 1,
      id: "steps",
      ease: "power2",
      toggleClass: "active"
    }
  })

  var pinner = gsap.timeline({
    scrollTrigger: {
      trigger: ".lesson-chart .wrapper",
      start: "top top",
      end: "+="+height+"%",
      scrub: 1,
      pin: ".lesson-chart .wrapper",
      pinSpacing: true,
      id: "pinning",
      ease: "power2"
    }
  })

  steps.forEach(function(elem, i) {
    gsap.set(elem, {position: "absolute", top: "40%", width:"40%"});

    console.log(elem)

    tl.from(
      elem.querySelector('.step-content'), {autoAlpha:0, translateY: 100}, i)

    if (i != steps.length-1) {
      tl.to(elem.querySelector('.step-content'), {autoAlpha:0, translateY:-100}, i+0.75)
    }

  });

  ScrollTrigger.create({
    trigger: "#step-4",
    start: "top center",
    toggleClass: "active",
    onEnter: () => {
      currentStep = 0;
      console.log(currentStep)
    },
    onLeave: () => {
      currentStep = 4;
      console.log(currentStep)
    },
    onEnterBack: () => {
      currentStep = 0;
    },
    onLeaveBack: () => {
      currentStep = 0;
    },
  });

})

</script>

<style>

  .lesson-chart .wrapper {
    display: flex;
    height: 100vh;
    background-color: #000000;
    margin: auto;
    padding: 0%;
  }

  .lesson-chart .step {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .chart-img {
    flex-basis: 50%;
  }

  .chart-text {
    flex-basis: 50%;
    height: 100vh;
    margin: auto;
    width: auto;
    align-content: center;
  }

  .chart-text h1 {
    font-family: sans-serif;
    font-size: 10em;
    align-self: center;
    margin: auto;
    color: #ffd502
  }

  .chart-text p {
    font-family: sans-serif;
    font-size: 2em;
    align-self: flex-start;
    color: #ffffff;
  }

  svg {
    width: 50vw;
    height: 100vh;
  }

  .step {

  }

</style>


<div class="lesson-chart">
  <div class="wrapper">
    <div class="chart-img" bind:clientWidth={width}>
      <svg>
        <g class="inner-chart" on:mouseleave={() => (hovered = null)}>
          {#each nodes as node, i}
            <circle
            cx={node.x}
            cy={node.y}
            r={10}
            fill={hovered
              ? hovered === node
                ? "#ffd502"
                : "white"
              : "white"}
            stroke={hovered
              ? hovered === node
                ? "black"
                : "transparent"
              : "white"}
            opacity={hovered
              ? hovered === node
                ? 1
                : 0.3
              : 1}
            on:mouseover={() => hovered = node}
            on:focus={() => hovered = node}
            tabindex="0" />
          {/each}
        </g>
      </svg>
      {#if hovered}
        <Tooltip data={hovered}/>
      {/if}
    </div>
    <div class="chart-text">
      <div class="step" id="step-1">
        <p class="step-content">The internet is an amazing space to learn about details and ideas that you may not come across in your day to day activities, that makes it both a blessing and a curses</p>
      </div>

      <div class="step" id="step-2">
        <p class="step-content">The rise of rather negative conversations on the internet about mothers means that people out there in their various situations are being exposed to a conversation that is important but it no ways universal</p>
      </div>

      <div class="step" id="step-3">
        <p class="step-content">hopefully reading this story opened up the conversation to see a more nuanced illustration of the role of mothers in society and what they are actually doing. No one is perfect, but there is a lot to learn from those who went before us</p>
      </div>

      <div class="step" id="step-4">
        <p class="step-content">if you hover over the circles to the left, you'll see someone of the many lessons from those who were survey for the story, see if any of the lessons remind you of your mum, because many curtainly reminded me of mine</p>
      </div>
    </div>
  </div>
</div>
