import { SCENE_KEYS } from '../config/sceneKeys'
import { createMenuButton, addHighlightOnMenuButtonHover } from '../utils/menus'
import { fadeOutTransition } from '../utils/transitions'

/*
	TODO: 
	 - (In LaunchMenuScene.ts) Add transition (fade out) when switching between scenes
	 - Create menu with 4 buttons:
	 	1) Fight
		2) Shop
		3) Team (manage team, gear, deck, etc)
		4) Settings
	 - Change background image
	 - Add icons to buttons
*/

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
		}, () => {
			fadeOutTransition(this, () => this.scene.start(SCENE_KEYS.LAUNCH_MENU))
		})
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
