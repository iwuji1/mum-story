<script>
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import { onMount } from 'svelte';

  import WMimg from '$lib/components/wm_img.svelte';
  import Stars from '$lib/components/star.svelte';
  import BHM from '$lib/components/BHM_intro.svelte';
  import She from '$lib/components/Sheroes.svelte';
  import Fam from '$lib/components/family.svelte';
  import Vbar from '$lib/components/vbar.svelte';
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

</script>

<style>

  :global(body){
    margin: 0;
  }

.intro-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  margin: auto;
  padding: 0%;
  background-image: url('$lib/assets/Mothers_Desktop.png');
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
  justify-content: flex-start;
  margin: auto;
}

.title-text h1 {
  flex: 60%;
  font-family: sans-serif;
  font-size: 10em;
  align-self: center;
  margin: 0%;
  color: #ffd502
}

.title-text p {
  font-family: sans-serif;
  font-size: 2em;
  align-self: center;
  color: #ffffff;
}

img {
  width: 100vw;
}

@media screen and (max-width: 780px) {
  .intro-container {
    background-image: url('$lib/assets/Mothers_tablet.png');
  }

  .title-text {
    text-align: center;
  }

  .title-text h1 {
    font-size: 5em;
  }

  .text-title p {
    font-size: 1em;
    text-align: center;
  }


}

@media screen and (max-width: 400px) {
  .intro-container {
    background-image: url('$lib/assets/Mothers_mobile.png');
  }

}

</style>

<div class="Page-container">

  <div class="intro-container">
    <div class="title-img">
    </div>
    <div class="title-text">
      <h1>To Our Mothers</h1>
      <p>Reflecting on Motherhood for BHM 2023</p>
    </div>
  </div>

  <BHM />
  <She />
  <Fam />
  {#if data}
    <Pintro data={data} />
    <Comments data={data}/>
  {/if}

</div>
