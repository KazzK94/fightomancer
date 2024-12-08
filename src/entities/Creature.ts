
import type { CreatureData } from '../types'
import { ActionBar } from '../ui/ActionBar'
import { HealthBar } from '../ui/HealthBar'

export interface CreatureConstructorProps {
	scene: Phaser.Scene
	position: {
		avatar: {
			x: number
			y: number
		}
		healthBar: {
			x: number
			y: number
		}
	}
	creatureData: CreatureData
}

interface TakeDamageProps {
	damage: number
	element: string
	ailment?: {
		type: string
		chance: number
	}
}

/** A class representing any Creature. Needs to be extended from every creature in the game. */
export class Creature extends Phaser.GameObjects.GameObject {
	// Creature's Info
	protected health!: number
	protected actionCharge: number = 0
	protected actions: number = 0
	// Creature's UI
	protected avatar!: Phaser.GameObjects.Image
	protected healthBar?: HealthBar
	protected actionBar?: ActionBar
	// Creature's Data
	protected creatureData!: CreatureData

	constructor({ scene, position, creatureData }: CreatureConstructorProps) {
		super(scene, 'Creature')
		scene.add.existing(this)
		this.init({ position, creatureData })
	}

	init({ position, creatureData }: Omit<CreatureConstructorProps, 'scene'>) {
		this.avatar = this.scene.add.image(position.avatar.x, position.avatar.y, creatureData.texture)
		this.creatureData = creatureData
		this.health = creatureData.health
		this.createHealthBar(position.healthBar)
		this.createActionBar({ ...position.healthBar, y: position.healthBar.y + 35 })
	}

	update() {
		if (this.healthBar) {
			this.healthBar.update(this.health / this.creatureData.health)
		}
		if (this.actionBar) {
			this.actionBar.update(this.actionCharge, this.actions)
		}
	}

	createHealthBar({ x, y }: { x: number, y: number }) {
		// this.healthBar = new HealthBar(this.scene, this.avatar.x + 150, this.avatar.y - this.avatar.height / 2 + 10)
		this.healthBar = new HealthBar(this.scene, x, y)
	}

	createActionBar({ x, y }: { x: number, y: number }) {
		// this.actionBar = new ActionBar(this.scene, this.avatar.x + 150, this.avatar.y - this.avatar.height / 2 + 10 + 35)
		this.actionBar = new ActionBar(this.scene, x, y)
	}

	useActions(amount: number) {
		if (this.actions < amount) {
			console.warn('Not enough actions!')
			return false
		}
		this.actions -= amount
		return true
	}

	/** Deals damage to the creature. Returns an object: { isAlive: boolean }. */
	takeDamage({ damage/*, element, ailment */ }: TakeDamageProps) {
		this.health -= damage
		if (this.healthBar) {
			this.healthBar.update(this.health / this.creatureData.health)
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

		return { isAlive: (this.health > 0) }
	}
}
