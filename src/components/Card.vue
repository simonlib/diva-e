<template>
	<div class="card" :class="status" v-if="item">
		<h1>Karte {{ item.id }}</h1>
		<table>
			<tr @click="compareProp('speed')">
				<th>km/h</th>
				<td>{{ item.speed }}</td>
			</tr>
			<tr @click="compareProp('power')">
				<th>PS</th>
				<td>{{ item.power }}</td>
			</tr>
			<tr @click="compareProp('capacity')">
				<th>ccm</th>
				<td>{{ item.capacity }}</td>
			</tr>
			<tr @click="compareProp('weight')">
				<th>kg (leer)</th>
				<td>{{ item.weight }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		props: ['item', 'status'],
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