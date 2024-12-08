import { SCENE_KEYS } from '../config/sceneKeys'

export class VictoryScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.VICTORY)
	}

	create() {
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)
		this.showCongrats()
		this.sound.add('victoryFanfare', { volume: 0.5 }).play()
	}

	showCongrats() {
		const title = this.add.text(this.cameras.main.width / 2, -100, ' ¡FELICIDADES! ', {
			fontSize: '96px',
			color: '#ff4',
			fontFamily: 'system-ui',
			fontStyle: 'bold',
			shadow: {
				color: '#fff',
				blur: 6,
				fill: true
			}
		})
			.setOrigin(0.5)
			.setDepth(1)

		this.tweens.add({
			targets: title,
			y: 220,
			duration: 2000,
			ease: Phaser.Math.Easing.Sine.Out
		})
	}
}
