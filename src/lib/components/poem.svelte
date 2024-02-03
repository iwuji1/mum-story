<script>

import Tabletimg from '$lib/assets/Mothers_tablet.png';
import Phoneimg from '$lib/assets/Mothers_mobile.png';

import gsap from 'gsap';
import { onMount } from 'svelte';

// onMount(() => {
//   gsap.registerPlugin(ScrollTrigger);
//
//   var tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "h1",
//       start: "center bottom",
//       scrub: 1,
//       pin: ".p-container",
//       pinSpacing: true,
//     }
//   })
//
//
// })



</script>

<style>
  .p-container {
    display: flex;
    height: 100vh;
    background-image: url('$lib/assets/Poem Desktop.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto;
    flex-direction: row;
  }

  .stanza {
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    color: #ffffff;
    font-family: sans-serif;
    justify-content: center;
  }

  h2 {
    text-align: center;
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  @media screen and (max-width: 780px) {
    .p-container {
      flex-direction: column;
      height: 300vh;
      background-image: url('$lib/assets/poem tablet.png');
      width: auto;
    }

    .stanza {
      margin-left: 5%;
    }
  }

  @media screen and (max-width: 400px) {
    .p-container {
      flex-direction: column;
      height: 300vh;
      background-image: url('$lib/assets/poem phone.png');
      width: auto;
    }

    .stanza {
      margin-left: 5%;
    }
  }


</style>

<div class="p-container">
  <div class="stanza">
    <h2><em>Mother, A Cradle to Hold</em></h2>
  </div>

  <div class="stanza">
    <p>It is true<br>
I was created in you.<br>
It is also true<br>
That you were created for me.<br>
I owned your voice.<br>
It was shaped and tuned to soothe me.<br>
Your arms were molded<br>
Into a cradle to hold me, to rock me.<br>
The scent of your body was the air<br>
Perfumed for me to breathe.<br></p>

<p>Mother,<br>
During those early, dearest days<br>
I did not dream that you had<br>
A large life which included me,<br>
For I had a life<br>
Which was only you.<br></p>

<p>Time passed steadily and drew us apart.<br>
I was unwilling.<br>
I feared if I let you go<br>
You would leave me eternally.<br>
You smiled at my fears, saying<br>
I could not stay in your lap forever.<br>
That one day you would have to stand<br>
And where would I be?<br>
You smiled again.<br>
I did not.<br>
Without warning you left me,<br>
But you returned immediately.<br>
You left again and returned,<br>
I admit, quickly,<br>
But relief did not rest with me easily.<br>
You left again, but again returned.<br>
You left again, but again returned.<br>
Each time you reentered my world<br>
You brought assurance.<br>
Slowly I gained confidence.<br></p>
  </div>

  <div class="stanza">
<p>You thought you know me,<br>
But I did know you,<br>
You thought you were watching me,<br>
But I did hold you securely in my sight,<br>
Recording every moment,<br>
Memorizing your smiles, tracing your frowns.<br>
In your absence<br>
I rehearsed you,<br>
The way you had of singing<br>
On a breeze,<br>
While a sob lay<br>
At the root of your song.</p>

<p>
The way you posed your head<br>
So that the light could caress your face<br>
When you put your fingers on my hand<br>
And your hand on my arm,<br>
I was blessed with a sense of health,<br>
Of strength and very good fortune.<br></p>

<p>You were always<br>
the heart of happiness to me,<br>
Bringing nougats of glee,<br>
Sweets of open laughter.<br></p>
  </div>

  <div class="stanza">
<p>I loved you even during the years<br>
When you knew nothing<br>
And I knew everything, I loved you still.<br>
Condescendingly of course,<br>
From my high perch<br>
Of teenage wisdom.<br>
I spoke sharply of you, often<br>
Because you were slow to understand.<br>
I grew older and<br>
Was stunned to find<br>
How much knowledge you had gleaned.<br>
And so quickly.<br></p>

<p>To know I have learned nearly nothing.<br>
On this day<br>
When mothers are being honored,<br>
Let me thank you<br>
That my selfishness, ignorance, and mockery<br>
Did not bring you to<br>
Discard me like a broken doll<br>
Which had lost its favor.<br>
I thank you that<br>
You still find something in me<br>
To cherish, to admire and to love.<br></p>

<p>I thank you, Mother.<br>
I love you.”<br></p>

<p><em>Poem by Maya Angelou</em></p>
  </div>

</div>
