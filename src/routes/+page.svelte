<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import { onMount } from 'svelte';

  import WMimg from '$lib/components/wm_img.svelte';
  import Stars from '$lib/components/star.svelte';
  import PoemHor from '$lib/components/poem_2.svelte';
  import BHM from '$lib/components/BHM_intro.svelte';
  import She from '$lib/components/Sheroes.svelte';
  import Fam from '$lib/components/family.svelte';
  import Dots from '$lib/components/points.svelte';
  import Vbar from '$lib/components/vbar.svelte';
  import Scrolldem from '$lib/components/demo_break.svelte';
  import Pintro from '$lib/components/pub_intro.svelte';
  import Comments from '$lib/components/comment_map.svelte';
  import Deskimg from '$lib/assets/Mothers_Desktop.png';
  import Tabletimg from '$lib/assets/Mothers_tablet.png';
  import Phoneimg from '$lib/assets/Mothers_mobile.png';

  let data;

  onMount(async () => {

    try {
      const response = await fetch('/.netlify/functions/queryResults');
      if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    gsap.registerPlugin(ScrollTrigger);

  })
  // onMount(async () => {

  //   try {
  //     const response = await fetch('https://toourmothers.obinnaiwuji.com/.netlify/functions/queryResults');
  //     if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       data = await response.json();

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  //   gsap.registerPlugin(ScrollTrigger);

  // })

</script>

<style>

  :global(body){
    margin: 0;
    background-color: #000000;
  }

.intro-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  justify-content: flex-end;
  margin: auto;
  padding: 0%;
  background-image: url('$lib/assets/Poem Desktop.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.title-img {
  position: relative;
  height: 100vh;
}

.title-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
}

.title-text h1 {
  font-family: sans-serif;
  text-align: center;
  font-size: 10em;
  margin: 0%;
  color: #ffd502
}

.title-text p {
  font-family: sans-serif;
  text-align: center;
  font-size: 2em;
  color: #ffffff;
}

img {
  width: 100vw;
}

.end-container {
  display: none;
}

.col-content {
  display: flex;
  flex-direction: column;
}

.p-content {
  font-family: sans-serif;
  font-size: 1em;
  margin: auto;
  color: white;
  text-align: center;
}



@media screen and (max-width: 780px) {
  .intro-container {
    background-image: url('$lib/assets/Poem tablet.png');
  }

  .end-container {
    display: block;
    background-color: #000000;
  }

  .title-text {
    text-align: center;
    width: 100vw;
  }

  .title-text h1 {
    font-size: 5em;
  }

  .text-title p {
    font-size: 1em;
    text-align: center;
  }

  .end{
    display: none;
  }


}

@media screen and (max-width: 400px) {
  .intro-container {
    background-image: url('$lib/assets/Poem phone.png');
  }

  .title-text {
    text-align: center;
    width: 100vw;
  }

  .end-container {
    display: flex;
    align-items: center;
    width: 100vw;
    background-color: #000000;
    margin: auto;
    height: 100vh;
  }

  .p-content {
    margin: auto;
    padding: 5%;
  }

  .end{
    display: none;
  }

}

</style>

<div class="Page-container">

  <div class="intro-container">
    <div class="title-img">
    </div>
    <div class="title-text">
      <h1>To Our Mothers</h1>
      <p>Reflecting on Motherhood for Black History Month 2024</p>
    </div>
  </div>
  <BHM />
  <She />
  <Fam />
  <PoemHor />
  {#if data}
    <Scrolldem data={data} />
    <div class="end">
    <Comments data={data}/>
    </div>
  {/if}

  <div class="end-container">
   <div class="col-content">
    <div>
      <p class="p-content">The internet is an amazing space to learn about details and ideas that you may not come across in your day to day activities, that makes it both a blessing and a curses</p>
    </div>
    <div>
      <p class="p-content">The rise of rather negative conversations on the internet about mothers means that people out there in their various situations are being exposed to a conversation that is important but it no ways universal</p>
    </div>
    <div>
      <p class="p-content">hopefully reading this story opened up the conversation to see a more nuanced illustration of the role of mothers in society and what they are actually doing. No one is perfect, but there is a lot to learn from those who went before us</p>
    </div>
    <div>
      <p class="p-content">on our Desktop version hover over the circles to the left, you'll see someone of the many lessons from those who were survey for the story, see if any of the lessons remind you of your mum, because many certainly reminded me of mine</p>
   </div>
  </div>
  </div>

</div>
