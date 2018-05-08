<template>
	<div class="card" :class="status" v-if="item">
		<h1>Karte {{ title }}</h1>
		<table>
			<tr v-for="(prop, key) in item.props" :key="prop.id" @click="compareProp(key)">
				<th>{{ prop.label }}</th>
				<td>{{ prop.value }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		props: ['item', 'status'],
		computed: {
			title() {
				return this.item.title;
			},
			speed() {
				return this.item.props.speed;
			},
			power() {
				return this.item.props.power;
			},
			velocity() {
				return this.item.props.velocity;
			},
			weight() {
				return this.item.props.weight;
			}
		},
		methods: {
			compareProp(prop) {
				this.$emit('compare', prop)
			},
		},
	}
</script>

<style lang="scss">
.card {
	h1 {
		font-size: 22px;
	}

	$border-color: #d3d3d3;

	width: 250px;
	border: 1px solid $border-color;
	border-radius: 4px;

	&.winner {
		border-color: limegreen;
	}
	&.loser {
		border-color: red;
	}

	table {
		width: 100%;
		table-layout: fixed;

		tr {
			cursor: pointer;
		}

		th,
		td {
			width: 50%;
			padding: 5px;
		}
		th {
			text-align: left;
		}
		td {
			text-align: right;
		}
		tr:not(:last-of-type) {
			th,td {
				border-bottom: 1px dashed $border-color;
			}
		}
	}
}
</style>