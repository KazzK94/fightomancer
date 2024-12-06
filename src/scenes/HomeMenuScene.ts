
import { SCENE_KEYS } from '../config/sceneKeys'
import { HOME_MENU_BUTTONS, HOME_MENU_CONFIG } from '../menus/homeMenu'
import { fadeInTransition, fadeOutTransition } from '../utils/transitions'

export class MainMenuScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
	}

	create() {
		this.showBackground()
		this.showButtons()
	}

	showBackground() {
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)
	}

	showButtons() {
		HOME_MENU_BUTTONS.forEach((button, index) => {
			this.createButton(button, index)
		})
	}

	createButton(button: { text: string, icon: string, color: number, toScene: string | null }, index: number) {

		const { MARGIN_TOP, MARGIN_LEFT, PADDING_LEFT, BUTTON_GAP_Y, ICON_GAP_X, BUTTON_WIDTH, BUTTON_HEIGHT } = HOME_MENU_CONFIG
		

		// Position of the button (Origin: Top Left)
		const BUTTON_X = MARGIN_LEFT
		const BUTTON_Y = MARGIN_TOP + ((BUTTON_HEIGHT + BUTTON_GAP_Y) * index)

		// Container (to group the button elements and handle hover and clicks)
		const container = this.add.container(BUTTON_X + BUTTON_WIDTH / 2, BUTTON_Y + BUTTON_HEIGHT / 2)
		container.setSize(BUTTON_WIDTH, BUTTON_HEIGHT)

		/* IMPORTANT NOTE: All coordinates of items inside a container are relative to the container position (origin is 0.5) */

		// Button Background
		const buttonBackground = this.add.graphics()
		buttonBackground.fillStyle(button.color, 0.9)
		buttonBackground.fillRoundedRect(-BUTTON_WIDTH / 2, -BUTTON_HEIGHT / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 20)

		const buttonIcon = this.add.image((-BUTTON_WIDTH / 2) + PADDING_LEFT, - 5, button.icon)
			.setScale(0.5)
			.setOrigin(0, 0.4)

		const buttonText = this.add.text((-BUTTON_WIDTH / 2) + buttonIcon.displayWidth + ICON_GAP_X, 0, ` ${button.text} `, {
			fontFamily: 'knight-warrior',
			fontSize: '64px',
			color: '#000',
			shadow: {
				color: '#fff',
				blur: 4,
				fill: true,
				stroke: true
			}
		})
		buttonText.setOrigin(0, 0.4)

		container.add([buttonBackground, buttonIcon, buttonText])
		container.setInteractive({ useHandCursor: true })
		container.on('pointerover', () => {
			buttonBackground.clear()
			buttonBackground.fillStyle(button.color, 1)
			buttonBackground.fillRoundedRect(-BUTTON_WIDTH / 2, -BUTTON_HEIGHT / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})
		container.on('pointerout', () => {
			buttonBackground.clear()
			buttonBackground.fillStyle(button.color, 0.9)
			buttonBackground.fillRoundedRect(-BUTTON_WIDTH / 2, -BUTTON_HEIGHT / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})

		container.on('pointerdown', () => {
			fadeOutTransition(this, () => {
				if(!button.toScene) {
					return fadeInTransition(this)
				}
				this.scene.start(button.toScene)
			})
		})
	}

}
