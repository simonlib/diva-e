<template>
	<div class="card" :class="status" v-if="item">
		<h1>Karte {{ item.title }}</h1>
		<table>
			<tr v-for="(prop, key) in item.props" :key="prop.id" @click="compareProp(key)" :class="key === value ? 'chosen' : ''">
				<th>{{ prop.label }}</th>
				<td>{{ prop.value }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		props: ['item', 'winner', 'value'],
		computed: {
			status() {
				if(!this.winner) return '';
				else if(this.winner === -1) return 'draw';
				return this.winner === this.item.id ? 'winner' : 'loser';
			}
		},
		methods: {
			compareProp(prop) {
				this.$emit('input', prop)
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
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);

	&:hover {
		box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
	}

	&.winner {
		border-color: limegreen;

		tr.chosen {
			color: limegreen;
		}
	}
	&.loser {
		border-color: red;

		tr.chosen {
			color: red;
		}
	}
	&.draw {
		border-color: dodgerblue;

		tr.chosen {
			color: dodgerblue;
		}
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