<script>
  import { onMount } from 'svelte';
  let people;
  let data = null;
  let questions;

  onMount(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //
  //   const swipes = document.querySelector(".side-blocks");
  //   const charts = gsap.utils.toArray('.chart-block');
  //   const texts = gsap.utils.toArray(".anim");
  //
  //   // gsap.to(charts, {
  //   //   xPercent: -100 * (charts.length - 1),
  //   //   ease: "none",
  //   //   scrollTrigger: {
  //   //     trigger: ".side-blocks",
  //   //     start:"top 40%",
  //   //     pin: true,
  //   //     scrub: 1,
  //   //     snap: 1 / (charts.length - 1),
  //   //     end: () => "+=" + document.querySelector(".side-blocks").offsetWidth,
  //   //   }
  //   // })
  //
  //   // function getScrollAmount() {
  //   //   let chartsWidth = swipes.scrollWidth;
  //   //   return -(chartsWidth - window.innerWidth);
  //   // }
  //
  //   // const tween = gsap.to(swipes, {
  //   //   x: getScrollAmount,
  //   //   duration: 3,
  //   //   ease: "none",
  //   // });
  //
  //   // let scrollTween = gsap.to(charts, {
  //   //   xPercent: -100 * (charts.length - 1),
  //   //   ease: "none",
  //   //   scrollTrigger: {
  //   //     trigger:".charts-wrapper",
  //   //     pin:true,
  //   //     scrub: 1,
  //   //     end: "+=3000",
  //   //     markers:true,
  //   //   }
  //   // });
  //
  //   // ScrollTrigger.create({
  //   //   trigger:".side-blocks",
  //   //   start:"center 70%",
  //   //   end: () => `+=${getScrollAmount() * -1}`,
  //   //   pin:".side-blocks",
  //   //   animation:tween,
  //   //   scrub:1,
  //   //   invalidateOnRefresh:true,
  //   //   markers:true
  //   // })
  //
  //   // // whizz around the sections
  //   // sections.forEach((section) => {
  //   //   // grab the scoped text
  //   //   let text = section.querySelectorAll(".anim");
  //   //   // bump out if there's no items to animate
  //   //   if(text.length === 0)  return
  //   //   // do a little stagger
  //   //   gsap.from(text, {
  //   //     y: -130,
  //   //     opacity: 0,
  //   //     duration: 2,
  //   //     ease: "elastic",
  //   //     stagger: 0.1,
  //   //     scrollTrigger: {
  //   //       trigger: section,
  //   //       containerAnimation: scrollTween,
  //   //       start: "left center",
  //   //       markers: true
  //   //     }
  //   //   });
  //   // });
  //
  //
  // },

  async () => {
    try {
      const response = await fetch('/.netlify/functions/queryResults');
      if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        questions = data;
        people = data[0].length;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }})

</script>

<style>

 .t-container {
   display: flex;
   width: 100vw;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   text-align: justify;
   margin: 20px auto;
   font-family: "helvetica";
   background-color: #ffd502;
 }

 .text-block {
   padding: 20px 40px 0px;
   max-width: 700px;
 }

 .text-block h1 {
   color: #2f9744;
   text-transform:uppercase;
 }

 .text-block h2 {
   text-align: center;
   background-color: #000000;
   color: #ffffff;
   margin-left: 15%;
   margin-right: 15%;
   padding-top: 2%;
   padding-bottom: 2%;
   font-size: 5rem;
 }

 .side-blocks {
   width: 400%;
   height: 100vh;
   display: flex;
   flex-wrap: nowrap;
 }

 .chart-block {
   width: 100vw;


 }

 .chart-block h1{
   text-align: left;
   color: #2f9744;
   text-transform:uppercase;
   font-size: 2rem;
 }
</style>

<!-- <svelte:head>
<title>Demo Graphs</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</svelte:head> -->

<div class= "t-container">

  <div class= "text-block">
    <h1>To Our Sisters</h1>
    <p>It's an opportunity to shout out the amazing work done by amazing women in the community, but also a chance hear from real people the how the role of a mother reflects in the lives of their children...from the children's persepective. When doing this I did involve all age groups as I believe we are all a child to someone, but also curious to see how view points differ as you grow up and live in different seasons of your life</p>
  </div>
  <div class= "text-block">
    <p>So I surveyed</p>
    <h2> {people} people</h2>
    <p>All in different communities from both single parent and couple parent house holds to see the impact of their mother in their life. I asked them 3 questions:</p>
    <p>Using words appointed to being a mother from the internet, what 3 words best describle your mother?</p>
    <p>On a scale of 1(negative) - 5(positive), how would rate the impact of your mum in your life </p>
    <p>Write a quick lesson learned from your mum</p>
    <p>
  </div>
  <div class= "text-block">
    <h1>Breaking down the respondents</h1>
    <p>Before we get into what the people are saying it's important to get a good idea about who is actually responding here to give you a better context to our responses</p>
    <h2>Comming Soon</h2>
    <!-- {#if questions}
      {#each questions[0] as eb}
        <h1>{eb["Ethnic Background"]}</h1>
      {/each}
    {/if} -->
  </div>
</div>
<div class="side-blocks">
  <div class= "chart-block">
    <h1>Breaking down the respondents</h1>
    <p>Before we get into what the people are saying it's important to get a good idea about who is actually responding here to give you a better context to our responses</p>
    <h2>Comming Soon</h2>
    <!-- {#if questions}
      {#each questions[0] as eb}
        <h1>{eb["Ethnic Background"]}</h1>
      {/each}
    {/if} -->
  </div>
  <div class= "chart-block">
    <h1 class="anim">Breaking down the responses by ethnic background we see:</h1>
      <h2>Comming Soon</h2>
  </div>
  <div class= "chart-block">
    <h1 class="anim">Breaking down the responses by age we see:</h1>
    <h2>Comming Soon</h2>
  </div>
  <div class= "chart-block">
    <h1 class="anim">Breaking down the response by gender we see:</h1>
    <h2>Comming Soon</h2>
  </div>
  <div class= "chart-block">
    <h1 class="anim">And finally breaking down the audience by location we see:</h1>
    <h2>Comming Soon</h2>
  </div>
</div>
