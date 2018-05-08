<template>
	<div id="app">
		<div>Karten im Spiel: {{ cars.length }}</div>
		<div>Genutze Karten: {{ graveyard.length }}</div>

		<button @click="compareCards" :disabled="!cars.length">Neue Karten vergleichen</button>

		<div class="cards">
			<card :item="leftCard" :key="1" @compare="compareWithRight" :status="leftStatus"></card>
			<card :item="rightCard" :key="2" @compare="compareWithLeft" :status="rightStatus"></card>
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
				compare: null
			}
		},
		computed: {
			leftStatus() {
				if(!this.compare) return '';

				if(this.compare.id === this.leftCard.id) {
					if(this.compare.value > this.rightCard.props[this.compare.prop].value) return 'winner';
					else return 'loser';
				}
				else {
					if(this.compare.value < this.leftCard.props[this.compare.prop].value) return 'winner';
					else return 'loser';
				}
			},
			rightStatus() {
				if(!this.compare) return '';

				if(this.compare.id === this.rightCard.id) {
					if(this.compare.value > this.leftCard.props[this.compare.prop].value) return 'winner';
					else return 'loser';
				}
				else {
					if(this.compare.value < this.rightCard.props[this.compare.prop].value) return 'winner';
					else return 'loser';
				}
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
				this.leftCard = this.pullCard();
				this.rightCard = this.pullCard();
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
			compareWithPos(pos, prop) {
				this.compare = {
					id: this[pos].id,
					prop: prop,
					value: this[pos].props[prop].value,
					rule: this[pos].props[prop].rule,
				}
			},
			compareWithLeft(prop) {
				this.compareWithPos('rightCard', prop)
			},
			compareWithRight(prop) {
				this.compareWithPos('leftCard', prop)
			}
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
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	.cards {
		padding: 60px 0;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		width: 600px;
	}
</style>
