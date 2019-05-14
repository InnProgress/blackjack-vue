<template>
  <div>
    <p><i class="fas fa-star"></i> Score: {{ $store.state.score }}</p>
    <p><i class="fas fa-trophy"></i> Wins (W/L): {{ $store.state.stats.wins }} / {{ $store.state.stats.losts }}</p>
    <p><i class="fas fa-caret-square-left"></i> Your last card value: {{ $store.state.last }}</p>

    <p class="bigger">Game score: {{ $store.state.gameScore.player }}</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  div {
    margin: 10px 0 15px;
  }
  p {
    margin: 0;
  }
  p.bigger {
    font-size: 20px;
    text-decoration: underline;
    margin-top: 5px;
  }
</style>
