
import { SCENE_KEYS } from '../config/sceneKeys'

export class FightScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.FIGHT)
	}

	preload() {
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
		// Monsters
		this.load.image('scalekin', 'images/fightomancers/scalekin.png')
		this.load.image('raichunt', 'images/fightomancers/raichunt.png')
	}

	create() {
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showMonster(200, 400, 'scalekin', true)
		this.showMonster(600, 200, 'raichunt', false)
	}

	showTitle() {
		this.add.text(this.cameras.main.width / 2, 130, ' Fightomancers ', {
			fontSize: '96px',
			color: '#f44',
			fontFamily: 'knight-warrior',
			shadow: {
				offsetX: 0,
				offsetY: 0,
				color: '#000',
				blur: 6,
				fill: true
			}
		})
			.setOrigin(0.5)
			.setDepth(1)
	}

	showMonster(x: number, y: number, key: string, isPlayer?: boolean, scale?: number) {
		const monster = this.add.image(x, y, key)
		monster.setScale(scale || 1)
		monster.setOrigin(0.5)
		if(!isPlayer) {
			monster.flipX = true
		}
		this.addMonsterTween(monster, isPlayer)
	}

	addMonsterTween(monster: Phaser.GameObjects.Image, reversed: boolean = false) {
		this.tweens.add({
			targets: monster,
			y: monster.y + 5 * (reversed ? -1 : 1),
			duration: 2000,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1
		})
	}

}
