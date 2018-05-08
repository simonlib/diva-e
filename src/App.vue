<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div class="col text-center">
					<h1>Quartett</h1>
					<b>Karten im Spiel: {{ cars.length }}</b><br />
					<b>Genutze Karten: {{ graveyard.length }}</b><br />
					<button @click="compareCards" :disabled="!cars.length" class="btn btn-primary">Neue Karten vergleichen</button>
				</div>
			</div>
			<div class="cards row justify-content-center">
				<div class="col-4">
					<card :item="leftCard" v-model="compare" :winner="winner"></card>
					<b v-if="gameStarted" class="win-counter d-block text-center">{{ winCounter.left }} Sieg(e)</b>
				</div>
				<div class="col-4">
					<card :item="rightCard" v-model="compare" :winner="winner"></card>
					<b v-if="gameStarted" class="win-counter d-block text-center">{{ winCounter.right }} Sieg(e)</b>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import jsonData from './data'
	import Car from './models/car'
	import Card from './components/Card'

	export default {
		name: 'app',
		data() {
			return {
				cars: [],
				graveyard: [],
				leftCard: null,
				rightCard: null,
				compare: null,
				gameStarted: false,
				winCounter: {
					left: 0,
					right: 0
				}
			}
		},
		computed: {
			winner() {
				if(!this.compare) return null;
				if(this.leftCard.props[this.compare].value === this.rightCard.props[this.compare].value) return -1;

				let cards = [this.leftCard, this.rightCard];

				cards.sort((a, b) => {
					if(a.props[this.compare].value > b.props[this.compare].value) return -1;
					else return 1;
				});

				let winner = (this.leftCard.props[this.compare].rule === 'higher-is-better') ? cards[0].id : cards[1].id;
				if(this.leftCard.id === winner) this.winCounter.left++;
				else this.winCounter.right ++;

				return winner;
			}
		},
		methods: {
			setDeck() {
				for (let i = 0; i < jsonData.length; i++) {
					this.cars.push(new Car(
						jsonData[i].id,
						jsonData[i].title,
						jsonData[i].speed,
						jsonData[i].power,
						jsonData[i].velocity,
						jsonData[i].weight,
					));
				}
			},
			compareCards() {
				this.gameStarted = true;
				this.compare = null;
				this.leftCard = this.pullCard();
				this.rightCard = this.pullCard();
				this.putCardsToGraveyard();
			},
			pullCard() {
				return this.cars.splice(Math.floor(Math.random() * this.cars.length), 1)[0];
			},
			putCardsToGraveyard() {
				if(this.leftCard) {
					this.graveyard.push(this.leftCard);
					// this.leftCard = null;
				}
				if(this.rightCard) {
					this.graveyard.push(this.rightCard);
					// this.rightCard = {};
				}
			},
		},
		created() {
			this.setDeck();
		},
		components: {
			Card: Card
		}
	}
</script>

<style lang="scss">

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-top: 60px;
	}
	.cards {
		margin-top: 60px;
	}
	.win-counter {
		margin-top: 15px;
	}
	button {
		margin-top: 15px;
	}
</style>
