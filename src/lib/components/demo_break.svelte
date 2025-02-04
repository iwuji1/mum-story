<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import * as d3 from 'd3';
    export let data;

    function sumFreq(jsonArray) {
    return jsonArray.reduce((sum, obj) => sum + obj.Freq, 0);
  };

  console.log(data)

  let count = sumFreq(data[1])

    let demodat = data[0];
    let gendat = data[1];
    let agedat = data[2];
    let reg_Mstat = data[3];
    let wordat = data[4];

    let expandedreg = [];
    let selectdata = [];
    let selectgroups = [];
    let cScale;

    reg_Mstat.forEach((d) => {
        for (let i=0; i< d.RegFreq; i++) {
            expandedreg.push({"Region": d["Region"], "PM Status": d["Parent Marital Status"] })
        }
    });

    let expandeddemo =[];

    demodat.forEach((d) => {
        for (let i=0; i< d.Freq; i++) {
            expandeddemo.push({"Ethnic Background": d["Ethnic Background"]})
        }
    })

    let expandedage = [];

    agedat.forEach((d) => {
        for (let i=0; i< d.Freq; i++) {
            expandedage.push({"Age Group":d["Age Group"],"Gender": d["Gender"]})
        }
    })

    const width = 350;
    const height = 700;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
    const boxSize = 50; //size of each box
    const boxGap = 3; //space between each box
    const howManyAcross = Math.floor(width / boxSize);

    let regions = ["Africa", "Asia", "North America", "Europe","South America", "Oceania", "Antarctica"];
    let ethnicities = demodat.map(function(d) {return d["Ethnic Background"]});
    let ages = agedat.map(function(d) {return d["Age Group"]});
    let genders = gendat.map(function(d) {return d["Gender"]});
    let words = wordat.map(function(d) {return d["Word"]});
    


    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const svg = d3.select(".waffle")
        .append("svg")
        .attr("width", width + marginLeft + marginRight)
        .attr("height", height + marginTop + marginBottom)
        .attr("viewBox", "0 0 " + (width + marginLeft + marginRight) + " " + (height + marginTop + marginBottom))
        .append("g")
        .attr("transform", "translate(" + (marginLeft) + "," + marginTop + ")")

        var legend = d3.select(".gallerylegend")
        .append("svg")
        .attr("class", "legend")
        .attr("width", 250 )
        .attr("height", 700)
        .attr("viewBox", "0 0 " + (width + marginLeft + marginRight) + " " + (height + marginTop + marginBottom))
        .append("g")
        .attr("transform", "translate(" + (-marginLeft) + "," + marginTop + ")")

        function waffleupdate() {
        selectdata = []
        selectgroups = []
        let selectsort = []
        let sorted = d3.sort(expandedreg, (d) => d.Region)

        for (let i = 0; i<sorted.length; i++) {
            selectsort.push({
                key: sorted[i]
            })
        }
        selectdata = d3.sort(selectsort, (d) => d.key)

        selectgroups = ["legend"]

        var u = svg.selectAll("rect")
        .data(selectdata)

        u.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "square")
        .attr("x", function(d,i){return boxSize * (i % howManyAcross);})
        .attr("y", function(d,i) {return Math.floor(i/howManyAcross) * boxSize; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", "#ffd502")

        let s = legend.selectAll("rect")
        .data(selectgroups)

        s.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "box")
        .attr("x", marginLeft + boxGap)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop; })
        .attr("width", boxSize)
        .attr("height", boxSize )
        .attr("fill", "#ffd502")

        s.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

        var w = legend.selectAll("text")
        .data(selectgroups)

        w.join("text")
        .transition()
		.duration(1000)
        .attr("class", "mylabels")
        .attr("x", (marginLeft + boxGap)*2.5)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop*2; })
        .attr("fill", "black")
        .text("Legend")
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "2em")

        w.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

    }

    waffleupdate()

    function geoupdate() {

        selectdata = []
        selectgroups = []
        let selectsort = []
        let sorted = d3.sort(expandedreg, (d) => d.Region)

        for (let i = 0; i<sorted.length; i++) {
            selectsort.push({
                key: sorted[i].Region
            })
        }
        selectdata = d3.sort(selectsort, (d) => d.key)

        selectgroups = regions
        $: cScale = d3.scaleOrdinal().domain(selectgroups).range(["#D9043D","#238C33","#F2B705","#F29F05","#0D0D0D"]);

        console.log(selectdata.sort)
        var u = svg.selectAll("rect")
        .data(selectdata)

        u.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "square")
        .attr("x", function(d,i){return boxSize * (i % howManyAcross);})
        .attr("y", function(d,i) {return Math.floor(i/howManyAcross) * boxSize; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d,i) {return cScale(d.key)})

        var s = legend.selectAll("rect")
        .data(selectgroups)

        s.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "box")
        .attr("x", marginLeft + boxGap)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d){ return cScale(d)})

        s.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

        var w = legend.selectAll("text")
        .data(selectgroups)

        w.join("text")
        .transition()
		.duration(1000)
        .attr("class", "mylabels")
        .attr("x", (marginLeft + boxGap)*2.5)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop*1.9; })
        .attr("fill", "black")
        .text(function(d) {return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "2em")

        w.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

    }

    function ethnicupdate() {
        selectdata = []
        selectgroups = []
        let selectsort = []

        let sorted = d3.sort(expandeddemo, (d) => d["Ethnic Background"])

        for (let i = 0; i<sorted.length; i++) {
            selectsort.push({
                key: sorted[i]["Ethnic Background"]
            })
        }
        selectdata = d3.sort(selectsort, (d) => d.key)

        selectgroups = ethnicities
        $: cScale = d3.scaleOrdinal().domain(selectgroups).range(["#D9043D","#238C33","#F2B705","#F29F05","#0D0D0D"]);

        var u = svg.selectAll("rect")
        .data(selectdata)

        u.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "square")
        .attr("x", function(d,i){return boxSize * (i % howManyAcross);})
        .attr("y", function(d,i) {return Math.floor(i/howManyAcross) * boxSize; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d,i) {return cScale(d.key)})

        var s = legend.selectAll("rect")
        .data(selectgroups)

        s.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "box")
        .attr("x", marginLeft + boxGap)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d){ return cScale(d)})

        s.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

        var w = legend.selectAll("text")
        .data(selectgroups)

        w.join("text")
        .transition()
		.duration(1000)
        .attr("class", "mylabels")
        .attr("x", (marginLeft + boxGap)*2.5)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop*1.9; })
        .attr("fill", "black")
        .text(function(d) {return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "2em")


        w.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()
    }

    function ageupdate() {
        selectdata = [];
        selectgroups = [];
        let selectsort = [];

        let sorted = d3.sort(expandedage, (d) => d["Age Group"])

        for (let i = 0; i<sorted.length; i++) {
            selectsort.push({
                key: sorted[i]["Age Group"]
            })
        }
        selectdata = d3.sort(selectsort, (d) => d.key)

        selectgroups = ages
        $: cScale = d3.scaleOrdinal().domain(selectgroups).range(["#D9043D","#238C33","#F2B705","#F29F05","#0D0D0D", "#ffffff"]);

        var u = svg.selectAll("rect")
        .data(selectdata)

        u.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "square")
        .attr("x", function(d,i){return boxSize * (i % howManyAcross);})
        .attr("y", function(d,i) {return Math.floor(i/howManyAcross) * boxSize; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d,i) {return cScale(d.key)})

        var s = legend.selectAll("rect")
        .data(selectgroups)

        s.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "box")
        .attr("x", marginLeft + boxGap)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d){ return cScale(d)})

        s.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

        var w = legend.selectAll("text")
        .data(selectgroups)

        w.join("text")
        .transition()
		.duration(1000)
        .attr("class", "mylabels")
        .attr("x", (marginLeft + boxGap)*2.5)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop*1.9; })
        .attr("fill", "black")
        .text(function(d) {return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "2em")

        w.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()
    }

    function genderupdate() {
        selectdata = []
        selectgroups = []
        let selectsort = []

        let sorted = d3.sort(expandedage, (d) => d["Gender"])

        for (let i = 0; i<sorted.length; i++) {
            selectsort.push({
                key: sorted[i]["Gender"]
            })
        }
        selectdata = d3.sort(selectsort, (d) => d.key)

        selectgroups = genders
        $: cScale = d3.scaleOrdinal().domain(selectgroups).range(["#D9043D","#238C33","#F2B705"]);

        var u = svg.selectAll("rect")
        .data(selectdata)

        u.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "square")
        .attr("x", function(d,i){return boxSize * (i % howManyAcross);})
        .attr("y", function(d,i) {return Math.floor(i/howManyAcross) * boxSize; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d,i) {return cScale(d.key)})

        var s = legend.selectAll("rect")
        .data(selectgroups)

        s.join("rect")
        .transition()
        .duration(1000)
        .attr("class", "box")
        .attr("x", marginLeft + boxGap)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop; })
        .attr("width", boxSize - 3)
        .attr("height", boxSize - 3)
        .attr("fill", function(d){ return cScale(d)})

        s.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

        var w = legend.selectAll("text")
        .data(selectgroups)

        w.join("text")
        .transition()
		.duration(1000)
        .attr("class", "mylabels")
        .attr("x", (marginLeft + boxGap)*2.5)
        .attr("y", function(d,i){ return (i * boxSize) + marginTop*1.9; })
        .attr("fill", "black")
        .text(function(d) {return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", "2em")

        w.exit()
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .remove()

    }

    // gsap scroll for charts
    const charts = gsap.utils.toArray(".gallerychart:not(:first-child)");
    const allcharts = gsap.utils.toArray(".gallerychart");

    const all_functions = [waffleupdate, geoupdate, ethnicupdate, ageupdate, genderupdate]

    let CHs = [];

    allcharts.forEach((div) => {
        let bc = window.getComputedStyle(div).backgroundColor;

        CHs.push(bc);
    })

    const contents = gsap.utils.toArray(".desrciptContentSection:not(:first-child");

    gsap.set(charts, {yPercent: 101});

    let mm= gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
        ScrollTrigger.create({
            trigger: ".chart-gallery",
            start: "top top",
            end: "bottom bottom",
            pin: ".charts",
            scrub: true
        });

        var tl2 = gsap.timeline({
          scrollTrigger: {
          trigger: ".cnt",
          start: 'top 80%',
          toggleActions: 'restart pause resume reverse'
        },
      });

      gsap.utils.toArray('.cnt').forEach(function (el) {
      var target = { val: 0 };
      let br = document.createElement('br');
      tl2.to(target, {
        val: el.getAttribute('data-number'),
        duration: 1,
        onUpdate: function () {
          el.innerText = Math.floor(target.val.toFixed(1));
        },
      });

      let tl3 = gsap.timeline({
        scrollTrigger: {
        trigger: ".p1",
        start: "top top",
        toggleActions: 'restart pause resume reverse'
      }
    })

    tl3.to(".cnt", {
        opacity: 0,
        y:0,
        ease: "power2"
      })


    });



        contents.forEach((unit, i) => {
            let headline = unit.querySelector("h1");
            ScrollTrigger.create({
                trigger:headline,
                start:"top 50%",
                end:"top 50%",
                scrub: true,
                onEnter: () => all_functions[i+1](),
                onEnterBack: () => all_functions[i](),
            })
        });

    })


    })


</script>

<style>


.chart-gallery {
    display: flex;
    font-family: sans-serif;
  }

  .chart-gallery h1 {
    font-size:clamp(5em, 4vw, 6em);
    color: #ffd502;
  }

  .chart-gallery p {
    font-size:clamp(1em, 1.5vw, 2em);
    line-height:1.4;
    color: white;
  }

  .text {
    width: 50%;
    /* outline:2px solid blue; */
  }

  .charts {
    /* outline:2px solid blue; */
    height: 100vh;
    width: 50vw;
    display: flex;
    flex-direction:column;
    justify-content:center;
  }

  .descript {
    margin: auto;
    width: 80%;
  }

  .desrciptContentSection {
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .gallerycharts {
    display: flex;
    width:40vw;
    height:100vh;
    border-radius:20px;
    position:relative;
    overflow:hidden;
    justify-content: center;
    transform: translate(0, 20%);
  }

  .gallerychart {
    width:70vw;
    height:100vw;
  }

  .gallerylegend {
    width: 30vw;
    height:100vh;
  }

  .cnt {
    text-align: center;
    color: #ffffff;
    font-size: 5rem;
  }

  .text-block {
    position: absolute;
    top: 20%;
    font-size: 10rem;
    font-weight: bolder;
    left: 17%;
  }

  ul.questions {
    list-style-position: outside;
    font-style: italic;
    color: #ffd502;

  }

  span.highlight {
    background-image: linear-gradient(#ffd502, #ffd502);
    background-repeat: no-repeat;
    color: #000000;
  }

</style>

<div class="chart-gallery">
    <div class="text">
      <div class="descript">
        <div class="desrciptContentSection">
          <h1>To our Sisters</h1>
          <p>This is an opporunity to shout out the amazing work done by women in the community, but also a chance hear from real people the how the role of a mother reflects in the lives of their children...from the children's persepective. <br><br>
            When doing this I did involve all age groups as I believe we are all a child to someone, but was also curious to see how view points differ as you grow up and live in different seasons of your life</p>
            <p>So I surveyed</p>
          <h2 class="cnt" data-number={count}> 0 </h2><p>People</p>
          <p>All in different communities from both single parent and couple parent house holds to see the impact of their mother in their life. I asked them 3 questions:</p>
          <ul class="questions">
          <li><p>Using words appointed to being a mother from the internet, what 3 words best describle your mother?</p></li>
          <li><p>On a scale of 1(negative) - 5(positive), how would rate the impact of your mum in your life </p></li>
          <li><p>Write a quick lesson learned from your mum</p></li>
        </ul>
          <h2>Breaking down the respondents</h2>
          <p>Before we get into what the people are saying it's important to get a good idea about who is actually responding here to give you a better context to our responses</p>
        </div>
        <div class="desrciptContentSection p1">
          <h1>Breaking down the audience by location we see:</h1>
          <p>The vast majority of respondents were from Europe, in fact almost 70% of the sample come from Europe. With the next largest source of represenation coming from Africa. Not surprising considering my own personal background!</p>
        </div>
        <div class="desrciptContentSection p2">
          <h1>Breaking down the responses by ethnic background we see:</h1>
          <p>Breaking down the respondents by Ethnic Background (a politically charged term I know, but work with me!). My respondents tended to be from South Asian and African/Black Briitsh backgrounds. Of course wew could defintely breakdown the demographics further down here. But this is great to know as when you scroll down to the personal lessons learnt from mothers you'll find that alot of the comments, english and non-english were very much influenced by people's cultural backgrounds</p>
        </div>
        <div class="desrciptContentSection p3">
          <h1>Breaking down the responses by age we see:</h1>
          <p>This was my personal biggest challenge. I wanted to get respondents from different age groups to better understand how views might change depending on generation. I'm happy/ curious to say though, truly no matter how old you are, you are a child to somoen. And the comments reflect this!</p>
        </div>
        <div class="desrciptContentSection p4">
          <h1>Breaking down the response by gender we see:</h1>
          <p> Two Thirds of respondents were female with other portion identifying as male, there were no respondents who identified by other gender categories, hence the amount is seen as zero (and excluded)</p>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="gallerycharts">
        <div class="gallerychart waffle"></div>
        <div class="gallerylegend"></div>
        <div class="text-block cnt" data-number={count}> 0 </div>
      </div>
    </div>
  
  </div>