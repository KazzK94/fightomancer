
import type { CardData } from '../types'

export const CARDS: CardData[] = [
	{
		name: 'Fireball',
		description: 'Throw a magic fireball.',
		texture: 'cardFireball',
		element: 'fire',
		damageType: 'magic',
		damage: 20,
		cost: 6
	},
	{
		name: 'Tackle',
		description: 'Tackle your enemy.',
		texture: 'cardTackle',
		element: 'neutral',
		damageType: 'physical',
		damage: 5,
		cost: 1
	},
	{
		name: 'Slash',
		description: 'Slash your enemy.',
		texture: 'cardSlash',
		element: 'neutral',
		damageType: 'physical',
		damage: 12,
		cost: 2
	},
	{
		name: 'Rock Throw',
		description: 'Throw a rock. 20% chance to remove an action from the enemy.',
		texture: 'cardRockThrow',
		element: 'earth',
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
		element: 'thunder',
		damageType: 'magic',
		ailment: {
			type: 'stun',
			chance: 0.15
		},
		damage: 15,
		cost: 5
	}
]
