<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SF from '$lib/components/surveyforce.svelte'
  import Demo from '$lib/components/demochart.svelte'
  import Gend from '$lib/components/genchart.svelte'
  import Aged from '$lib/components/agechart.svelte'
  import RegMS from '$lib/components/reg_MS.svelte'

  export let data;

  function sumFreq(jsonArray) {
    return jsonArray.reduce((sum, obj) => sum + obj.Freq, 0);
  };

  let count = sumFreq(data[1])

  let demodat = data[0];
  let gendat = data[1];
  let agedat = data[2];
  let reg_Mstat = data[3];
  let wordat = data[4];
  let lessondat = data[5];


  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    let charts = gsap.utils.toArray(".chart-block");
    let texts = gsap.utils.toArray(".anim");

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".chartcontainer .chart-container",
        start: "top top",
        pin: ".chartcontainer .chart-container",
        scrub: 1,
        pinSpacing: true,
        id: "pinning",
        ease: "power2"
      }
    })

    tl.to(charts, {
      xPercent: -100 * (charts.length - 1),
      scrollTrigger: {
        trigger: ".chart-container",
        start: "top top",
        scrub: 1,
        snap: 1/ (charts.length),
        end: "+=1000",
        id: "charts",
        ease: "power2"
      }
    });
  })

</script>

<svelte:head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</svelte:head>

<style>

 .t-container {
   display: flex;
   width: 100vw;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   text-align: justify;
   margin: auto;
   font-family: "helvetica";
   background-color: #ffd502;
 }

 .wrapper {
   min-height: 100vh;
   overflow-x: hidden;
   background-color: #ffd502;
   font-family: "helvetica";
 }

 .chartcontainer {
   padding: 0em 2em;
   text-align: center;
   line-height: 10vh;
 }

 .chart-container {
   display: flex;
   width: 500vw;
 }

 .chart-block {
     display: flex;
     flex-direction: column;
     height: 100vh;
     flex: 1;
     justify-content: space-between;
     padding: 1em;
     align-items: center;
     margin: auto;
 }

 .chart-block h1 {
   color: #2f9744;
   text-transform:uppercase;
 }

 .chart-block p {

 }

 .text-block {
   display: flex;
   padding: 20px 40px 0px;
   max-width: 700px;
   flex-direction: column;
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

 .viz-text {

 }

 .viz-img {
   max-width: 80vw;
   height: auto;
 }

</style>

<div class= "t-container">

  <div class= "text-block">
    <h1>To Our Sisters</h1>
    <p>It's an opportunity to shout out the amazing work done by amazing women in the community, but also a chance hear from real people the how the role of a mother reflects in the lives of their children...from the children's persepective. When doing this I did involve all age groups as I believe we are all a child to someone, but also curious to see how view points differ as you grow up and live in different seasons of your life</p>
  </div>
  <div class= "text-block">
    <p>So I surveyed</p>
    <h2> {count} people</h2>
    <p>All in different communities from both single parent and couple parent house holds to see the impact of their mother in their life. I asked them 3 questions:</p>
    <p>Using words appointed to being a mother from the internet, what 3 words best describle your mother?</p>
    <p>On a scale of 1(negative) - 5(positive), how would rate the impact of your mum in your life </p>
    <p>Write a quick lesson learned from your mum</p>
    <p>
  </div>
  <div class= "text-block">
    <div class="viz-text">
      <h1>Breaking down the respondents</h1>
      <p>Before we get into what the people are saying it's important to get a good idea about who is actually responding here to give you a better context to our responses</p>
    </div>
  </div>
</div>
<div class="wrapper">
  <div class="chartcontainer">
    <div class="chart-container">
      <section class= "intro chart-block">
        <h1>Breaking down the respondents</h1>
        <SF data={wordat} />
      </section>
      <section class="c1 chart-block">
        <h1 class="anim">Breaking down the responses by ethnic background we see:</h1>
        <Demo demodat={demodat}/>
      </section>
      <section class="c2 chart-block">
        <h1 class="anim">Breaking down the responses by age we see:</h1>
        <Aged agedat={agedat}/>
      </section>
      <section class= "c3 chart-block">
        <h1 class="anim">Breaking down the response by gender we see:</h1>
        <Gend gendat={gendat}/>
      </section>
      <section class= "c4 chart-block">
        <h1 class="anim">And finally breaking down the audience by location we see:</h1>
        <RegMS rmdat={reg_Mstat}/>
      </section>
    </div>
  </div>
</div>
