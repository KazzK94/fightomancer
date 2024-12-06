import { ELEMENTS } from './elements'

export const CREATURES = Object.freeze({
	SCALEKIN: {
		name: 'Scalekin',
		health: 160,
		element: ELEMENTS.EARTH,
		texture: 'scalekin',
		stats: {
			attack: 20,
			defense: 5,
			magic: 10,
			resistance: 2,
			speed: 30
		}
	},
	RAICHUNT: {
		name: 'Raichunt',
		element: ELEMENTS.THUNDER,
		health: 120,
		texture: 'raichunt',
		stats: {
			attack: 12,
			defense: 3,
			magic: 25,
			resistance: 5,
			speed: 50
		}
	}
})