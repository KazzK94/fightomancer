
import { SCENE_KEYS } from '../config/sceneKeys'
import { CREATURES } from '../data/creatures'
import { Player } from '../entities/Player'
import { CardData } from '../types'
import { HealthBar } from '../ui/HealthBar'
import { fadeInTransition } from '../utils/transitions'

export class FightScene extends Phaser.Scene {

	private player!: Player

	private enemyHealth: number = 100
	private enemyHealthBar!: HealthBar
	private enemySprite!: Phaser.GameObjects.Image

	constructor() {
		super(SCENE_KEYS.FIGHT)
	}

	create() {
		fadeInTransition(this)
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showPlayer()
		this.showEnemy()

		this.events.addListener('cardClick', this.handleCardClick, this)
	}

	update(): void {
		this.player.update()
		this.enemyHealthBar.update(this.enemyHealth / 100)
	}

	showPlayer() {
		this.player = new Player({
			scene: this,
			x: 150,
			y: 460,
			creatureData: CREATURES.SCALEKIN
		})
	}

	showEnemy() {
		this.enemySprite = this.createMonster(620, 160, 'raichunt', false)
		this.enemyHealthBar = new HealthBar(this, 60, 60)
	}

	createMonster(x: number, y: number, key: string, isPlayer?: boolean, scale?: number) {
		const monster = this.add.image(x, y, key)
		monster.setScale(scale || 1)
		monster.setOrigin(0.5)
		if (!isPlayer) {
			monster.flipX = true
		}

		return monster
	}

	handleCardClick(cardData: CardData) {
		// Use actions (exit if not enough actions)
		if (!this.player.useActions(cardData.cost)) return
		// Shake on big amounts of damage
		this.cameras.main.shake(200, 0.0005 * cardData.damage)
		// and apply damage to enemy
		this.enemyHealth = Phaser.Math.MinSub(this.enemyHealth, cardData.damage, 0)
		// Check if enemy is dead
		if (this.enemyHealth === 0) {
			this.events.removeListener('cardClick', this.handleCardClick, this)
			this.tweens.add({
				targets: this.enemySprite,
				scale: 0,
				alpha: 0,
				duration: 500,
				onComplete: () => {
					this.time.delayedCall(500, () => alert('¡FELICIDADES!'))
				}
			})
		}
	}

}
