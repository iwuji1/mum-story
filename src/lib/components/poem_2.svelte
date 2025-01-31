<script>
//configuring poem scroll
import gsap from 'gsap';
import { onMount } from 'svelte';

onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stansas = document.querySelector(".poem")

    let poemwidth = stansas.offsetWidth;

    function getScrollPoem() {
        let stansasWidth = stansas.scrollWidth;
        let laststansaWidth = document.querySelector(".poem div:last-of-type p").offsetWidth;
        let windowWidth = window.innerWidth;
        let padding = (windowWidth/2) - (laststansaWidth/2);

        return -(stansasWidth - windowWidth) - padding;
    }

    const ptween = gsap.fromTo(stansas, {
        x:() => window.innerWidth
    },
    {
        x: getScrollPoem,
        duration: 3,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: ".poemWrapper",
        start: "top top",
        end: () => `+=${getScrollPoem() * -2}`,
        pin: true,
        animation: ptween,
        scrub: 1,
        invalidateOnRefresh: true
    })

    const psections = gsap.utils.toArray(".poem div");

    psections.forEach((psection, i) => {
        ScrollTrigger.create({
            trigger: psection,
            start: "left 50%",
            end: "right 50%",
            animation: gsap.to(psection.querySelector("p"), {scale:0.5, color: "black"}),
            scrub: true,
            containerAnimation: ptween
        })
    })
})
</script>

<style>

.poemWrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    background-image: url('$lib/assets/swinging head_1.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .poem {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .poem h2 {
    font-family: 'Staatliches', cursive;
    font-size: clamp(100px, 10vw, 5vh);
    width: 90vw;
  }

  .poem p {
    font-family: 'Staatliches', cursive;
    font-size: clamp(20px, 10vw, 5vh);
    flex-shrink:0;
    padding-right:0.3em;
    padding-left:0.3em;
    white-space:nowrap;
    margin:0;
    align-self: center;
    color: white;
    text-shadow: 3px 3px 10px black;
  }

</style>

<div class="poemWrapper">
    <div class="poem">
      <div>
        <h2>
          Mother, a cradle to hold<br>
        </h2>
        <p>
          A Poem by Maya Angelou
        </p>
      </div>
        <div>
        <p>
          It is true <br>
          I was created in you. <br>
          It is also true <br>
          That you were created for me.<br>
          I owned your voice.<br>
          It was shaped and tuned to soothe me.<br>
          Your arms were molded<br>
          Into a cradle to hold me, to rock me.<br>
          The scent of your body was the air<br>
          Perfumed for me to breathe.<br>
      </p>
        </div>
        <div>
        <p>
          Mother,<br>
          During those early, dearest days<br>
          I did not dream that you had<br>
          A large life which included me,<br>
          For I had a life<br>
          Which was only you.<br>
      </p>
    </div>
    <div>
      <p>
        Time passed steadily and drew us apart.<br>
        I was unwilling.<br>
        I feared if I let you go<br>
        You would leave me eternally.<br>
        You smiled at my fears, saying<br>
        I could not stay in your lap forever.<br>
        That one day you would have to stand<br>
        And where would I be?<br>
        You smiled again.<br>
      </p>
    </div>
    <div>
      <p>
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
        Slowly I gained confidence.<br>
      </p>
    </div>
    <div>
      <p>
        You thought you know me,<br>
        But I did know you,<br>
        You thought you were watching me,<br>
        But I did hold you securely in my sight,<br>
        Recording every moment,<br>
        Memorizing your smiles, tracing your frowns.<br>
        In your absence<br>
        I rehearsed you,<br>
      </p>
    </div>
    <div>
      <p>
        The way you had of singing<br>
        On a breeze,<br>
        While a sob lay<br>
        At the root of your song.<br>
      </p>
    </div>
    <div>
      <p>
        The way you posed your head<br>
        So that the light could caress your face<br>
        When you put your fingers on my hand<br>
        And your hand on my arm,<br>
        I was blessed with a sense of health,<br>
        Of strength and very good fortune.<br>
      </p>
    </div>
    <div>
      <p>
        You were always<br>
        the heart of happiness to me,<br>
        Bringing nougats of glee,<br>
        Sweets of open laughter.<br>
      </p>
    </div>
    <div>
      <p>
        I loved you even during the years<br>
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
        And so quickly.<br>
      </p>
    </div>
    <div>
      <p>
        To know I have learned nearly nothing.<br>
        On this day<br>
        When mothers are being honored,<br>
        Let me thank you<br>
        That my selfishness, ignorance, and mockery<br>
        Did not bring you to<br>
        Discard me like a broken doll<br>
        Which had lost its favor.<br>
        I thank you that<br>
        You still find something in me<br>
        To cherish, to admire and to love.<br>
      </p>
    </div>
    <div>
      <p>
        I thank you, Mother.<br>
        I love you.”<br><br>
        
        Poem by Maya Angelou<br>
      </p>
    </div>
  
    </div>
  
  </div>