export default class Car
{
	constructor(id, title, speed, power, velocity, weight)
	{
		this.id = id || 0;
		this.title = title || '';
		this.props = {
			speed: {
				label: 'km/h',
				value: speed || Car.getRandSpeed(),
				rule: 'higher-is-better'
			},
			power: {
				label: 'PS',
				value: power || Car.getRandPower(),
				rule: 'higher-is-better'
			},
			velocity: {
				label: '0 - 100 km/h',
				value: velocity || Car.getRandVelocity(),
				rule: 'lower-is-better'
			},
			weight: {
				label: 'kg (leer)',
				value: weight || Car.getRandWeight(),
				rule: 'lower-is-better'
			}
		}
	}
	static getRandVal(min, max) {
		// eslint-disable-next-line
		console.warn('you shouldn\'t use random values anymore');
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static getRandSpeed() {
		return Car.getRandVal(150, 250);
	}
	static getRandPower() {
		return Car.getRandVal(50, 300);
	}
	static getRandVelocity() {
		return Car.getRandVal(2, 20);
	}
	static getRandWeight() {
		return Car.getRandVal(1000, 2000);
	}
}