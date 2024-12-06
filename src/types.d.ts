
import { ELEMENTS } from './data/elements'

export type Element = keyof ELEMENTS

export interface CreatureData {
	health: number
	texture: string
	element: Element
	stats: CreatureStats
	// TODO: affinity (can be positive/strong or negative/weak)
	// elements: [ { element: Element, value: number }, ... ]
	// ailments: [ { ailment: Ailment, value: number }, ... ]
}

export interface CreatureFightData extends CreatureData {
	actions: number
	actionCharge: number
}

export interface CreatureStats {
	attack: number
	defense: number
	magic: number
	resistance: number
	speed: number
}

export interface CardData {
	name: string
	description: string
	texture: string
	element: Element
	damageType: 'physical' | 'magic'
	damage: number
	cost: number
	ailment?: {
		type: Ailment
		/** chance: Value from 0 (0%) to 1 (100%) */
		chance: number
	}
	effect?: ({ source, target }: CardEffectParams) => { source?: CreatureFightData, target?: CreatureFightData }
}

interface CardEffectParams {
	source?: CreatureFightData
	target?: CreatureFightData
}

export type Ailment = 'stun' | 'slow' | 'burn' | 'confusion'

/*
	Stun: Action Bar doesn't fill for certain amount of time
	Slow: Action Bar fills slower for certain amount of time
	Burn: Take damage over time for certain amount of time
	Confusion: Force to discard the current hand
*/