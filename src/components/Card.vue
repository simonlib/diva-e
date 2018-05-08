<template>
	<transition name="card" mode="out-in">
		<div class="card" :class="status" v-if="item" :key="item.id">
			<div class="card-body">
				<h2 class="h4">Karte {{ item.title }}</h2>
				<table>
					<tr v-for="(prop, key) in item.props" :key="prop.id" @click="compareProp(key)" :class="key === value ? 'selected' : ''">
						<th>{{ prop.label }}</th>
						<td>{{ prop.value }}</td>
					</tr>
				</table>
			</div>
		</div>
	</transition>
</template>


<script>
	export default {
		props: ['item', 'winner', 'value'],
		computed: {
			status() {
				if(!this.winner) return '';
				else if(this.winner === -1) return 'border-primary';
				return this.winner === this.item.id ? 'border-success' : 'border-danger';
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

$danger: #dc3545;
$success: #28a745;
$primary: #007bff;

.card {
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

	&.border-success {
		tr.selected {
			color: $success;
		}
	}
	&.border-danger {
		tr.selected {
			color: $danger;
		}
	}
	&.border-primary {
		tr.selected {
			color: $primary;
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
				border-bottom: 1px dashed grey;
			}
		}
	}
}

.card-enter-active,
.card-leave-active {
	transition: all 250ms;
}
	.card-enter,
	.card-leave-to {
		opacity: 0;
	}
	.card-leave,
	.card-enter-to {
		opacity: 1;
	}
</style>