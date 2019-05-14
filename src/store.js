import Vue from 'vue'
import Vuex from 'vuex'
// import { lookupService } from 'dns';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [
      'Clubs',
      'Diamonds',
      'Hearts',
      'Spades'
    ],
    score: 0,
    stats: {
      wins: 0,
      losts: 0
    },
    gameScore: {
      player: 0,
      npc: 0
    },
    last: 0,
    takenCard: {
      type: 'Default',
      imgValue: 1
    },
    hiddenImg: false
  },
  mutations: {
    updateGameScore(state, { player, value}) {
      if(value > 10 && player !== 'npc') value = 10;
      state.gameScore[player] += value;
    },
    updateLastCard(state, cardInfo) {
      state.hiddenImg = true;

      setTimeout(function() {
        state.hiddenImg = false;
        state.takenCard.type = cardInfo.type;
        state.takenCard.imgValue = cardInfo.value;
        
        if(cardInfo.value > 10) cardInfo.value = 10;
        state.last = cardInfo.value + ' [ ' + cardInfo.type + ' ]';
      }, 550);

    },
    reset(state) {
      state.gameScore.player = 0;
      state.gameScore.npc = 0;
      state.last = 0;
      state.takenCard.type = 'Default';
      state.takenCard.imgValue = 1;
    },
    updateStats(state, won) {
      if(won) {
        state.stats.wins ++;
      } else state.stats.losts ++;
    },
    addScore(state, score) {
      state.score += score;
    }
  },
  actions: {
    takeCard({ commit, state, dispatch }) {
      let cardType = Math.floor(Math.random() * 4);
      let cardValue = Math.floor(Math.random() * 13) + 1;

      commit('updateLastCard', { type: state.types[cardType], value: cardValue });

      setTimeout(function() {
        commit('updateGameScore', {player: 'player', value: cardValue });

        dispatch('checkWinner', false);
      }, 600);
    },
    npcTakeCard({commit}) {

      let cardsValue = 0;

      while(cardsValue <= 14) {
        let rand = Math.floor(Math.random() * 13) + 1;
        cardsValue += rand > 10 ? 10 : rand;
      }

      commit('updateGameScore', {player: 'npc', value: cardsValue });
    },
    checkWinner({ state, dispatch, commit }, stand) {

      let gameOverType = -1;

      if (state.gameScore.player === 21 || stand) { // if player gets 21 and wins or its draw

        dispatch('npcTakeCard');

        // gameOverType values:
        // 0 - lose
        // 1 - win
        // 2 - draw

        if (state.gameScore.npc === state.gameScore.player) gameOverType = 2;
        else if (state.gameScore.npc === 21) gameOverType = 0;
        else if(state.gameScore.player === 21 && state.gameScore.npc !== 21) gameOverType = 1;

        else if (state.gameScore.player > state.gameScore.npc && state.gameScore.player < 21) gameOverType = 1;
        else if (state.gameScore.player < state.gameScore.npc && state.gameScore.npc < 21) gameOverType = 0;
 
        else if (state.gameScore.player > state.gameScore.npc && state.gameScore.npc > 21) gameOverType = 0;
        else if (state.gameScore.player < state.gameScore.npc && state.gameScore.player > 21) gameOverType = 1;

        else if (state.gameScore.npc > 21 && state.gameScore.player < 21) gameOverType = 1;
        else gameOverType = 0;
      }

      if(gameOverType !== -1) {

        let finish;
        let won = false;
        switch (gameOverType) {
          case 0: {
            finish = 'You lost';
            break;
          }
          case 1: {
            finish = 'You won';
            won = true;
            commit('addScore', 1);
            break;
          }
          case 2: {
            finish = "It's draw";
            won = true;
            commit('updateStats', false);
            commit('addScore', 1);
            break;
          }
        }
        commit('updateStats', won);

        dispatch('showResult', {msg: finish, won });
        commit('reset');
      }
    },
    showResult({ state }, { msg, won } ) {
      Vue.swal.fire({
        type: won === true ? 'success' : 'error',
        title: msg,
        text: "Your score: " + state.gameScore.player + ". Your opponent score: " + state.gameScore.npc + "."
      });
    }
  }
})
