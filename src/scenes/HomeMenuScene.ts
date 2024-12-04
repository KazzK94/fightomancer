
import { SCENE_KEYS } from '../config/sceneKeys'
import { fadeInTransition, fadeOutTransition } from '../utils/transitions'

// Padding Y: 50px
// Space between buttons: 30px
// Button height: 100px

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

		const buttons = [
			{
				text: 'Fight',
				icon: 'fightIcon',
				color: 0xee6666,
				onClick: () => {
					fadeOutTransition(this, () => {
						this.scene.start(SCENE_KEYS.FIGHT)
					})
				}
			},
			{
				text: 'Team',
				icon: 'teamIcon',
				color: 0x77dd77,
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Team clicked')
						fadeInTransition(this)
					})
				}
			},
			{
				text: 'Shop',
				icon: 'shopIcon',
				color: 0x7777dd,
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Shop clicked')
						fadeInTransition(this)
					})
				}
			},
			{
				text: 'Settings',
				icon: 'settingsIcon',
				color: 0xbbbbbb,
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Settings clicked')
						fadeInTransition(this)
					})
				}
			}
		]

		buttons.forEach((button, index) => {
			this.createButton(button, index)
		})
	}

	createButton(button: { text: string, icon: string, color?: number, onClick: () => void }, index: number) {

		const MARGIN_TOP = 25 // Margin from top of the screen (in px)
		const MARGIN_LEFT = 25 // Margin from left of the screen (in px)
		const PADDING_LEFT = 30 // Padding from the left of the button (in px)
		const BUTTON_GAP_Y = 20 // Space between the menu buttons (in px)
		const ICON_GAP_X = 40 // Gap between icon and text
		const BUTTON_WIDTH = 500
		const BUTTON_HEIGHT = 120

		const BACKGROUND_COLOR = button.color || 0xeecc77

		// Position of the button (Origin: Top Left)
		const BUTTON_X = MARGIN_LEFT
		const BUTTON_Y = MARGIN_TOP + ((BUTTON_HEIGHT + BUTTON_GAP_Y) * index)

		// Container (to group the button elements and handle hover and clicks)
		const container = this.add.container(BUTTON_X + BUTTON_WIDTH / 2, BUTTON_Y + BUTTON_HEIGHT / 2)
		container.setSize(BUTTON_WIDTH, BUTTON_HEIGHT)

		/* IMPORTANT NOTE: All coordinates of items inside a container are relative to the container position (origin is 0.5) */

		// Button Background
		const buttonBackground = this.add.graphics()
		buttonBackground.fillStyle(BACKGROUND_COLOR, 0.8)
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
			buttonBackground.fillStyle(BACKGROUND_COLOR, 1)
			buttonBackground.fillRoundedRect(-BUTTON_WIDTH / 2, -BUTTON_HEIGHT / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})
		container.on('pointerout', () => {
			buttonBackground.clear()
			buttonBackground.fillStyle(BACKGROUND_COLOR, 0.8)
			buttonBackground.fillRoundedRect(-BUTTON_WIDTH / 2, -BUTTON_HEIGHT / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})

		container.on('pointerdown', button.onClick)
	}

}
