
// type Element must be any of the values from the ELEMENTS object
export type Element = 'neutral' | 'fire' | 'water' | 'thunder' | 'earth' | 'wind' | 'light' | 'dark'
export type Ailment = 'stun' | 'slow' | 'burn' | 'confusion'

export interface CreatureData {
	name: string
	health: number
	element: Element
	texture: string
	stats: CreatureStats
	// TODO: affinity (can be positive/strong or negative/weak)
	// elements: [ { element: Element, value: number }, ... ]
	// ailments: [ { ailment: Ailment, value: number }, ... ]
}

export interface CreatureStats {
	attack: number
	defense: number
	magic: number
	resistance: number
	speed: number
}

export interface CreatureFightData extends CreatureData {
	actions: number
	actionCharge: number
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


/*
	Stun: Action Bar doesn't fill for certain amount of time
	Slow: Action Bar fills slower for certain amount of time
	Burn: Take damage over time for certain amount of time
	Confusion: Force to discard the current hand
*/