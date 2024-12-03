import { SCENE_KEYS } from '../config/sceneKeys'
import { createMenuButton, addHighlightOnMenuButtonHover } from '../utils/menus'

export class MainMenuScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
	}

	preload() {
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
	}

	create() {
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showTitle()

		createMenuButton(this, this.cameras.main.width / 2, 300, 'Not Implemented Yet, sorry...', {
			fontSize: '56px',
			color: '#feb',
			fontStyle: 'italic'
		}, () => {})
			.setOrigin(0.5)

		const backButton = createMenuButton(this, this.cameras.main.width / 2, 400, 'Back to previous menu', {
			fontSize: '72px',
			color: '#fff'
		}, () => this.scene.start(SCENE_KEYS.LAUNCH_MENU))
			.setOrigin(0.5)
		addHighlightOnMenuButtonHover(backButton, 0xffff33)
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

}
