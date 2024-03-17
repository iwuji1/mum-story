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
  $: forcepower = false;


  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    let numbers = document.querySelectorAll(".t-container");

    let sections = gsap.utils.toArray('.chart-block')

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: numbers,
        start: 'top center',
        toggleActions: 'restart pause resume reverse',
      },
    });

    gsap.utils.toArray('.cnt').forEach(function (el) {
      var target = { val: 0 };
      tl2.to(target, {
        val: el.getAttribute('data-number'),
        duration: 1,
        onUpdate: function () {
          el.innerText = target.val.toFixed(1)+" people";
        },
      });
    });

    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none", // <-- IMPORTANT!
      scrollTrigger: {
        trigger: ".chart-container",
        pin: true,
        scrub: 1,
        end: "+=5000"
      }
  });

  let regsectionscroll = gsap.timeline({
    scrollTrigger: {
      trigger: ".RM_map",
      containerAnimation: scrollTween,
      start: "center 80%",
      end: "center 20%",
      toggleActions: "play complete pause reset",
      id: "1",
    }
  })

  let ethsectionscroll = gsap.timeline({
    scrollTrigger: {
      trigger: ".demobar",
      containerAnimation: scrollTween,
      start: "center 80%",
      end: "center 20%",
      toggleActions: "play complete pause reset",
      id: "2",
    }
  })

  ethsectionscroll.from("rect.ethbars", {
    scaleY:0,
    transformOrigin: '50% 100%',
    stagger: .1,
    ease: "power2",
  })
  .from(".eth-txt", {
    opacity:0,
    y:0,
    ease: "power2"
  })

  let agesectionscroll = gsap.timeline({
    scrollTrigger: {
      trigger: ".agebar",
      containerAnimation: scrollTween,
      start: "center 80%",
      end: "center 20%",
      toggleActions: "play complete pause reset",
      id: "3",
    }
  })

  agesectionscroll.from("rect.agebars", {
    scaleX:0,
    stagger: .1,
    ease: "power2"
  })
  .from("line.ageaxis", {
    opacity:0,
    x: 2,
    delay: -2,
    ease: "power2"
  })
  .from("foreignObject.age-txt", {
    opacity:0,
    ease: "power2"
  })

  let gensectionscroll = gsap.timeline({
    scrollTrigger: {
      trigger: ".gendbar",
      containerAnimation: scrollTween,
      start: "center 80%",
      end: "center 20%",
      toggleActions: "play complete pause reset",
      id: "4",
    }
  })

  gensectionscroll.from("circle.gencircle", {
    scale: 2,
    transformOrigin: '50% 50%',
    opacity: 0,
    ease: "power2"
  })
  .from("path.gencircle", {
    scale: 2,
    transformOrigin: '50% 50%',
    opacity: 0,
    ease: "power2"
  })
  .from("text.gen-txt", {
    opacity: 0,
    ease:"power2"
  });

  let feelsectionscroll = gsap.timeline({
    scrollTrigger: {
      trigger: ".feelsforce",
      containerAnimation: scrollTween,
      start: "center 80%",
      end: "center 20%",
      toggleActions: "play complete pause reset",
      id: "5",
      onEnter: () => {
        forcepower=true;
      },
      onLeave: () => {
        forcepower=false;
      },
      onEnterBack: () => {
        forcepower=true;
      },
      onLeaveBack: () => {
        forcepower=false;
      }
    }
  })
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
   background-color: #ff4f1d;
 }

 .wrapper {
   min-height: 100vh;
   overflow-x: hidden;
   background-color: #ff4f1d;
   font-family: "helvetica";
 }

 .chartcontainer {
   padding: 0em 2em;
   text-align: center;
 }

 .chart-container {
   display: flex;
   flex-wrap: nowrap;
   width: 500vw;
 }

 .chart-block {
     display: flex;
     flex-direction: column;
     height: 80vh;
     width: 100vw;
     flex: 1;
     justify-content: space-between;
     padding: 1em;
     align-items: center;
     margin: auto;
 }

 .chart-block h1 {
   color: #ffffff;
   text-transform:uppercase;
   margin: 0%;
 }

 .text-block {
   display: flex;
   padding: 20px 40px 0px;
   max-width: 700px;
   flex-direction: column;
 }

 .text-block h1 {
   color: #ffffff;
   text-transform:uppercase;
 }

 .text-block h2 {
   text-align: center;
   background-color: #000000;
   color: #ffffff;
   padding-top: 2%;
   padding-bottom: 2%;
   font-size: 5rem;
 }

 .viz-text {

 }

</style>

<div class= "t-container">

  <div class= "text-block">
    <h1>To Our Sisters</h1>
    <p>This is an opporunity to shout out the amazing work done by women in the community, but also a chance hear from real people the how the role of a mother reflects in the lives of their children...from the children's persepective. When doing this I did involve all age groups as I believe we are all a child to someone, but was also curious to see how view points differ as you grow up and live in different seasons of your life</p>
  </div>
  <div class= "text-block count">
    <p>So I surveyed</p>
    <h2 class="cnt" data-number={count}> 0 people</h2>
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
        <h1 class="anim">Breaking down the audience by location we see:</h1>
        <RegMS rmdat={reg_Mstat}/>
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
        <h1 class="anim">And finally breaking down the audience by the words they associate with their parent:</h1>
        <SF data={wordat} np={forcepower}/>
      </section>
    </div>
  </div>
</div>
