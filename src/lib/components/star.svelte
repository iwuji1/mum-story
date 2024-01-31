<script>
  import P5 from 'p5-svelte';
  import mum_face from '$lib/assets/mothers head3.png'

  let width = 584;
  let height = 720;

  const sketch = (p5) => {

    class Circle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 1;
        this.growing = true;
      }

      grow() {
        if (this.growing) {
          this.r += 1;
        }
      }

      show() {
        p5.fill(178,34,34);
        p5.noStroke();
        p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
      }

      edges() {
        return (
          this.x + this.r >= width ||
          this.x - this.r <= 0 ||
          this.y + this.r >= height ||
          this.y - this.r <= 0
        )
      }
    }

    let circles;
    let spots;
    let img;

    p5.preload = () => {
      img = p5.loadImage(mum_face)
    }

    p5.setup = () => {
      p5.createCanvas(width,height);
      img.loadPixels();

      spots = [];
      circles = [];

      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
          let index = x + y * img.width;
          let c = img.pixels[index*4];
          let b = p5.brightness([c]);

          if (b > 1) {
            spots.push(p5.createVector(x, y));
          }
        }
      }

    };

    p5.draw = () => {
      p5.background(0);

      let total = 5;
      let count = 0;
      let attempts = 0;

      while (count < total) {
        let newC = newCircle();
        if (newC !== null) {
          circles.push(newC);
          count++;
        }
        attempts++;
        if (attempts > 100) {
          p5.noLoop();
          break;
        }
      }


      for (let i = 0; i < circles.length; i++) {
        let circl = circles[i];

        if (circl.growing) {
          if (circl.edges()) {
            circl.growing = false;
          } else {
            for (let j = 0; j < circles.length; j++) {
              let other = circles[j];
              if (circl !== other) {
                var d = p5.dist(circl.x, circl.y, other.x, other.y);
                var distance = circl.r + other.r;

                if (d - 4 < distance) {
                  circl.growing = false;
                  break;
                }
              }
            }
          }
        }

        circl.show();
        circl.grow();
      }
    }

    function newCircle() {
      var r = p5.int(p5.random(0, spots.length));
      var spot = spots[r];
      var x = spot.x;
      var y = spot.y;

      var valid = true;
      for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var d = p5.dist(x, y, circle.x, circle.y);
        if (d < circle.r) {
          valid = false;
          break;
        }
      }
      if (valid) {
        return new Circle(x, y);
      } else {
        return null;
      }
    }

  }


</script>

<style>

</style>

<P5 {sketch} />
