export default class Car
{
	constructor(id, speed, power, capacity, weight)
	{
		this.id = id || 0;
		this.speed = speed || this.setRandSpeed();
		this.power = power || this.setRandPower();
		this.capacity = capacity || this.setRandCapacity();
		this.weight = weight || this.setRandWeight();
	}
	setRandVal(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	setRandSpeed() {
		return this.setRandVal(150, 250);
	}
	setRandPower() {
		return this.setRandVal(50, 300);
	}
	setRandCapacity() {
		return this.setRandVal(1500, 4500);
	}
	setRandWeight() {
		return this.setRandVal(1000, 2000);
	}
}