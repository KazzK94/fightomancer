
import type { CreatureData } from '../types'
import { ActionBar } from '../ui/ActionBar'
import { HealthBar } from '../ui/HealthBar'

export interface CreatureConstructorProps {
	scene: Phaser.Scene
	x: number
	y: number
	creatureData: CreatureData
}

interface TakeDamageProps {
	damage: number
	element: string
	ailment?: string
}

/** A class representing any Creature. Needs to be extended from every creature in the game. */
export class Creature extends Phaser.GameObjects.GameObject {
	// Creature's Info
	protected health!: number
	protected actionCharge: number = 0
	protected actions: number = 0
	// Creature's UI
	private avatar!: Phaser.GameObjects.Image
	protected healthBar?: HealthBar
	protected actionBar?: ActionBar
	// Creature's Data
	protected creature!: CreatureData

	constructor({ scene, x, y, creatureData }: CreatureConstructorProps) {
		super(scene, 'Creature')
		this.avatar = scene.add.image(x, y, creatureData.texture)
		scene.add.existing(this)
		this.init(creatureData)
	}

	init(creatureData: CreatureData) {
		this.creature = creatureData
		this.health = creatureData.health
		this.createHealthBar()
		this.createActionBar()
	}

	update() {
		if (this.healthBar) {
			this.healthBar.update(this.health / this.creature.health)
		}
		if (this.actionBar) {
			this.actionBar.update(this.actionCharge, this.actions)
		}
	}

	createHealthBar() {
		// this.playerHealthBar = new HealthBar(this, 320, 360)
		this.healthBar = new HealthBar(this.scene, this.avatar.x + 150, this.avatar.y - this.avatar.height / 2 + 10)
	}

	createActionBar() {
		this.actionBar = new ActionBar(this.scene, this.avatar.x + 150, this.avatar.y - this.avatar.height / 2 + 10 + 35)
	}

	/** Deals damage to the creature. Returns an object: { isAlive: boolean }. */
	takeDamage({ damage, element, ailment }: TakeDamageProps) {
		this.health -= damage
		if (this.healthBar) {
			this.healthBar.update(this.health / this.creature.health)
		}

		const blinkTintColor = 0xddaaaa
		const blinkDuration = 240
		const blinkRate = blinkDuration / 3
		this.avatar.setTint(blinkTintColor)
		this.scene.time.delayedCall(blinkRate, () => {
			this.avatar.clearTint()
		})
		this.scene.time.delayedCall(blinkRate * 2, () => {
			this.avatar.setTint(blinkTintColor)
		})
		this.scene.time.delayedCall(blinkRate * 3, () => {
			this.avatar.clearTint()
		})

		return { isAlive: (this.health <= 0) }
	}
}
