
import { SCENE_KEYS } from '../config/sceneKeys'
import { CREATURES } from '../data/creatures'
import { Enemy } from '../entities/Enemy'
import { Player } from '../entities/Player'
import { CardData } from '../types'
import { fadeInTransition } from '../utils/transitions'

export class FightScene extends Phaser.Scene {

	private player!: Player
	private enemy!: Enemy

	private bgm!: Phaser.Sound.BaseSound

	constructor() {
		super(SCENE_KEYS.FIGHT)
	}

	create() {
		fadeInTransition(this)
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showPlayer()
		this.showEnemy()

		this.bgm = this.sound.add('battleTheme', { loop: true, volume: 0.5 })
		this.bgm.play()

		this.events.addListener('cardClick', this.handleCardClick, this)
	}

	update(): void {
		this.player.update()
		this.enemy.update()
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
		this.enemy = new Enemy({
			scene: this,
			x: 150,
			y: 160,
			creatureData: CREATURES.RAICHUNT
		})
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
		this.cameras.main.shake(100 + Math.max(6 * cardData.damage, 300), 0.0006 * cardData.damage)
		// and apply damage to enemy
		const { isAlive } = this.enemy.takeDamage(cardData)
		// Check if enemy is dead
		if (!isAlive) {
			this.events.removeListener('cardClick', this.handleCardClick, this)
			this.enemy.kill(() => {
				this.bgm.stop()
				this.time.delayedCall(300, () => {
					this.scene.start(SCENE_KEYS.VICTORY)
				})
			})
		}
	}

}
