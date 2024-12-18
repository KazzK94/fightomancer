
import type { CreatureData } from '../types'
import { CARDS } from '../data/cards'

import { Card } from './Card'
import { Creature } from './Creature'

interface PlayerConstructorProps {
	scene: Phaser.Scene
	x: number
	y: number
	creatureData: CreatureData
}

export class Player extends Creature {
	// Player's Data
	private cards: Card[] = []

	constructor({ scene, x, y, creatureData }: PlayerConstructorProps) {
		super({ scene, position: { avatar: { x, y }, healthBar: { x: x + 150, y: y - (256 / 2) + 10 } }, creatureData })
		this.creatureData = creatureData
		this.createCards()
	}

	update() {
		super.update()
		// Update HealthBar Info
		this.healthBar?.update(this.health / this.creatureData.health)
		// Charge Action Gauge
		this.actionCharge += this.creatureData.stats.speed * 0.03
		if (this.actionCharge > 100) {
			this.actionCharge = 0
			this.actions = Phaser.Math.MaxAdd(this.actions, 1, 19)
		}
		// Update ActionBar Info
		this.actionBar?.update(this.actionCharge, this.actions)
	}

	createCards() {
		for (let i = 0;i < 3;i++) {
			const cardX = 305 + i * 135
			const cardY = 420
			const card = new Card(this.scene, cardX, cardY, CARDS[i + 1])
			this.cards.push(card)
		}
	}
}