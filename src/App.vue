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
				</div>
				<div class="col-4">
					<card :item="rightCard" v-model="compare" :winner="winner"></card>
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

				if(this.leftCard.props[this.compare].rule === 'higher-is-better') return cards[0].id;
				else return cards[1].id;
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
				this.compare = null;
				this.putCardsToGraveyard();
				setTimeout(() => {
					this.leftCard = this.pullCard();
					this.rightCard = this.pullCard();
				}, 250);
			},
			pullCard() {
				return this.cars.splice(Math.floor(Math.random() * this.cars.length), 1)[0];
			},
			putCardsToGraveyard() {
				if(this.leftCard) {
					this.graveyard.push(this.leftCard);
					this.leftCard = null;
				}
				if(this.rightCard) {
					this.graveyard.push(this.rightCard);
					this.rightCard = {};
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
	button {
		margin-top: 15px;
	}
</style>
