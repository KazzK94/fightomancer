
export class LandingMenu extends Phaser.Scene {

	constructor() {
		super('LandingMenu')
	}

	preload() {
		// Monsters
		this.load.image('monster1', 'images/fightomancers/green-monster-gamer.png')
		this.load.image('monster2', 'images/fightomancers/dragon.webp')
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
	}

	create() {
		// Background
		this.add.image(0, this.cameras.main.height, 'background')
			.setOrigin(0, 1)

		// Title
		const title = this.add.text(this.cameras.main.width / 2, -100, 'Fightomancers', {
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

		this.tweens.add({
			targets: title,
			y: 130,
			duration: 1000,
			ease: 'Bounce.easeOut'
		})

		// Monsters
		const monster1 = this.add.image(200, 400, 'monster1')
		monster1.setScale(0.4)
		monster1.setOrigin(0.5)
		this.addMonsterTween(monster1, true)
		const monster2 = this.add.image(600, 200, 'monster2')
		monster2.setOrigin(0.5)
		this.addMonsterTween(monster2, false)
	}

	addMonsterTween(monster: Phaser.GameObjects.Image, reversed: boolean = false) {
		this.tweens.add({
			targets: monster,
			y: monster.y + 15 * (reversed ? -1 : 1),
			duration: 2000,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1
		})
	}
}
