
import type { CreatureData } from '../types'

import { Creature } from './Creature'

interface EnemyConstructorProps {
	scene: Phaser.Scene
	x: number
	y: number
	creatureData: CreatureData
}

export class Enemy extends Creature {

	constructor({ scene, x, y, creatureData }: EnemyConstructorProps) {
		super({ scene, position: { avatar: { x: x + 480, y }, healthBar: { x: x - 90, y: y - (256 / 2) + 20 } }, creatureData })
		this.creatureData = creatureData
		this.avatar.flipX = true
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

}