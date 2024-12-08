
import { CreatureData } from '../types'

interface CreaturesType {
	[key: string]: CreatureData
}

export const CREATURES : CreaturesType = Object.freeze({
	SCALEKIN: {
		name: 'Scalekin',
		health: 160,
		element: 'earth',
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
		health: 100,
		element: 'thunder',
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