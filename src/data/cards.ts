
import type { CardData } from '../types'
import { ELEMENTS } from './elements'

export const CARDS: CardData[] = [
	{
		name: 'Fireball',
		description: 'Throw a magic fireball.',
		texture: 'cardFireball',
		element: ELEMENTS.FIRE,
		damageType: 'magic',
		damage: 20,
		cost: 6
	},
	{
		name: 'Tackle',
		description: 'Tackle your enemy.',
		texture: 'cardTackle',
		element: ELEMENTS.NEUTRAL,
		damageType: 'physical',
		damage: 5,
		cost: 1
	},
	{
		name: 'Slash',
		description: 'Slash your enemy.',
		texture: 'cardSlash',
		element: ELEMENTS.NEUTRAL,
		damageType: 'physical',
		damage: 12,
		cost: 2
	},
	{
		name: 'Rock Throw',
		description: 'Throw a rock. 20% chance to remove an action from the enemy.',
		texture: 'cardRockThrow',
		element: ELEMENTS.EARTH,
		damageType: 'physical',
		ailment: {
			type: 'stun',
			chance: 0.2
		},
		damage: 25,
		effect: ({ target }) => {
			if(!target) throw new Error('CRITICAL ERROR: No target defined in Rock Throw effect.')
			if (Math.random() <= 0.2) {
				target.actions = Math.max(target.actions-1 || 0)
			}
			return { target }
		},
		cost: 4
	},
	{
		name: 'Thunderbolt',
		description: 'Discharge a magic thunderbolt. 15% chance to stun.',
		texture: 'cardThunderbolt',
		element: ELEMENTS.THUNDER,
		damageType: 'magic',
		ailment: {
			type: 'stun',
			chance: 0.15
		},
		damage: 15,
		cost: 5
	}
]
