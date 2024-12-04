
import { SCENE_KEYS } from '../config/sceneKeys'
import { fadeOutTransition } from '../utils/transitions'

// Padding Y: 50px
// Space between buttons: 30px
// Button height: 100px

export class MainMenuScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.MAIN_MENU)
	}

	preload() {
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
		// Monsters
		this.load.image('fightIcon', 'images/icons/fight.png')
		this.load.image('shopIcon', 'images/icons/shop.png')
		this.load.image('teamIcon', 'images/icons/team.png')
		this.load.image('settingsIcon', 'images/icons/settings.png')
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
				onClick: () => {
					fadeOutTransition(this, () => {
						this.scene.start(SCENE_KEYS.FIGHT)
					})
				}
			},
			{
				text: 'Shop',
				icon: 'shopIcon',
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Shop clicked')
					})
				}
			},
			{
				text: 'Team',
				icon: 'teamIcon',
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Team clicked')
					})
				}
			},
			{
				text: 'Settings',
				icon: 'settingsIcon',
				onClick: () => {
					fadeOutTransition(this, () => {
						console.log('Settings clicked')
					})
				}
			}
		]

		buttons.forEach((button, index) => {
			this.createButton(button, index)
		})
	}

	createButton(button: { text: string, icon: string, onClick: () => void }, index: number) {

		const MARGIN_TOP = 50 // Margin from top of the screen (in px)
		const MARGIN_LEFT = 40 // Margin from left of the screen (in px)
		const PADDING_LEFT = 20 // Padding from the left of the button (in px)
		const BUTTON_GAP_Y = 25 // Space between the menu buttons (in px)
		const ICON_GAP_X = 30 // Gap between icon and text
		const BUTTON_WIDTH = 600
		const BUTTON_HEIGHT = 100

		// Position of the button (Origin: Top Left)
		const BUTTON_X = MARGIN_LEFT
		const BUTTON_Y = MARGIN_TOP + ((BUTTON_HEIGHT + BUTTON_GAP_Y) * index)

		// Container (to group the button elements and handle hover and clicks)
		const container = this.add.container(BUTTON_X, BUTTON_Y)
		container.setSize(BUTTON_WIDTH, BUTTON_HEIGHT)

		/* IMPORTANT NOTE: All coordinates of items inside a container are relative to the container position */

		// Button Background
		const buttonBackground = this.add.graphics()
		buttonBackground.fillStyle(0xddaa66, 0.6)
		buttonBackground.fillRoundedRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 20)

		const buttonIcon = this.add.image(PADDING_LEFT, (BUTTON_HEIGHT / 2) - 5, button.icon)
			.setScale(0.5)
			.setOrigin(0, 0.4)

		const buttonText = this.add.text(buttonIcon.displayWidth + ICON_GAP_X, BUTTON_HEIGHT / 2, ` ${button.text} `, {
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
			buttonBackground.fillStyle(0xddaa66, 0.8)
			buttonBackground.fillRoundedRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})
		container.on('pointerout', () => {
			buttonBackground.clear()
			buttonBackground.fillStyle(0xddaa66, 0.6)
			buttonBackground.fillRoundedRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 20)
		})

		this.input.enableDebug(container)
	}

}
