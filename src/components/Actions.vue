<template>
  <div>
    <button @click="takeCard">Take card</button>
    <button @click="stand">Stand</button>
  </div>
</template>

<script>
export default {
  methods: {
    takeCard() {
      if(this.$store.state.hiddenImg) return;
      this.$store.dispatch('takeCard');
    },
    stand() {
      if(this.$store.state.gameScore.player < 1) {
        this.$swal.fire({
          type: 'error',
          title: 'Oops...',
          text: "You can't do that without taking any card"
        });
        return;
      }
      this.$store.dispatch('checkWinner', true);
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    margin-top: 15px;
  }
  button {
    margin: 0 10px;
    border-radius: 2px;
    border: none;
    background-color: #834c69;
    color: white;
    padding: 8px 16px;
    transition-duration: 0.4s;
    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 7px black;
      background-color: transparent;
    }
    &:focus {
      outline: none;
    }
  }
</style>
