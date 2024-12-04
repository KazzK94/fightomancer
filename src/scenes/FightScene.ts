
import { SCENE_KEYS } from '../config/sceneKeys'
import { ActionBar } from '../ui/ActionBar'
import { Card } from '../ui/Card'
import { HealthBar } from '../ui/HealthBar'
import { fadeInTransition } from '../utils/transitions'

export class FightScene extends Phaser.Scene {

	private playerHealth: number = 100
	private playerHealthBar!: HealthBar
	private playerActionCharge: number = 0
	private playerActionBar!: ActionBar
	private playerActions: number = 0

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
	}

	update(): void {
		this.playerHealth -= 0.005
		this.playerHealthBar.update(this.playerHealth)
		this.playerActionCharge += 0.1
		if (this.playerActionCharge > 100) {
			this.playerActionCharge = 0
			this.playerActions = Phaser.Math.MaxAdd(this.playerActions, 1, 19)
		}
		this.playerActionBar.update(this.playerActionCharge, this.playerActions)
		this.enemyHealth -= 0.015
		this.enemyHealthBar.update(this.enemyHealth)
	}

	showPlayer() {
		this.createMonster(160, 460, 'scalekin', true)
		this.playerHealthBar = new HealthBar(this, 320, 360)
		this.playerActionBar = new ActionBar(this, 320, 395)
		for (let i = 0; i < 3; i++) {
			const cardX = 325 + i * 135
			const cardY = 435
			new Card(this, cardX, cardY)
		}
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
