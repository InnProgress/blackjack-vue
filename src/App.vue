<template>
  <div class="container" id="mainApp">
    <Stats />

    <transition name="flip">
      <img v-show="!$store.state.hiddenImg" class="takenCardImg" :src="require('./assets/cards/mainSet/' + $store.state.takenCard.type + '/' + $store.state.takenCard.imgValue + '.png')" />
    </transition>

    <Actions />
  </div>
</template>

<script>
import Stats from './components/Stats.vue'
import Actions from './components/Actions.vue'

export default {
  components: {
    Stats,
    Actions
  }
}
</script>

<style lang="scss">
  .flip-enter-active {
    transition: all .6s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
  }

  .flip-leave-active {
    transition: all .6s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
  }

  .flip-enter, .flip-leave-to {
    transform: scaleY(0) translateZ(0);
    opacity: 0;
  }

  body {
    margin: 0;
    font-family: 'Tajawal', sans-serif;
    background-image: url('./assets/bg/main.jpeg');
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  #mainApp {
    background-color: #222831;
    border-radius: 7px;
    padding: 5px 0 30px;
    max-width: 510px;
    color: #e14594;
    -webkit-box-shadow: 2px 0px 41px black;
    box-shadow: 2px 0px 41px black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 510px;
  }
  .takenCardImg {
    width: 120px;
  }
</style>
