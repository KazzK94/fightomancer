
import { SCENE_KEYS } from '../config/sceneKeys'
import { CREATURES } from '../data/creatures'
import { Player } from '../entities/Player'
import { HealthBar } from '../ui/HealthBar'
import { fadeInTransition } from '../utils/transitions'

export class FightScene extends Phaser.Scene {

	private player!: Player

	private enemyHealth: number = 100
	private enemyHealthBar!: HealthBar

	constructor() {
		super(SCENE_KEYS.FIGHT)
	}

	create() {
		fadeInTransition(this)
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showPlayer()
		this.showEnemy()

		// Test damage randomly
		this.input.on('pointerdown', () => {
			this.player.takeDamage({ damage: Phaser.Math.Between(4, 20), element: 'earth' })
		})
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
		this.createMonster(620, 160, 'raichunt', false)
		this.enemyHealthBar = new HealthBar(this, 60, 60)
	}

	createMonster(x: number, y: number, key: string, isPlayer?: boolean, scale?: number) {
		const monster = this.add.image(x, y, key)
		monster.setScale(scale || 1)
		monster.setOrigin(0.5)
		if (!isPlayer) {
			monster.flipX = true
		}

		this.tweens.add({
			targets: monster,
			y: monster.y + 5 * (isPlayer ? -1 : 1),
			duration: 2000,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1
		})

		return monster
	}

}
