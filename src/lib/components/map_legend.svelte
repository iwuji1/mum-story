<script>
    export let cScale;
    export let hoveredContinent;
</script>

<style>
  .legend {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 5px;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    column-gap: 3px;
    cursor: pointer;
    transition: opacity 300ms ease;
  }

  span {
    width: 9px;
    height: 9px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  p.unhovered {
    opacity: 0.3;
  }
</style>

<div class='legend' on:mouseleave={() => (hoveredContinent = null)}>
  {#each cScale.domain() as continent}
    <p on:mouseover={() => (hoveredContinent = continent)}
    class:unhovered={hoveredContinent && hoveredContinent !== continent}>
    <span style="background-color: {cScale(continent)}" />
      {continent}
    </p>
  {/each}

</div>
