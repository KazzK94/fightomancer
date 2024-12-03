import { SCENE_KEYS } from '../config/sceneKeys'
import { createMenuButton, addHighlightOnMenuButtonHover } from '../utils/menus'
import { fadeInTransition, fadeOutTransition } from '../utils/transitions'

export class LaunchMenuScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.LAUNCH_MENU)
	}

	preload() {
		// Monsters
		this.load.image('monster1', 'images/fightomancers/green-monster-gamer.png')
		this.load.image('monster2', 'images/fightomancers/dragon.webp')
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
	}

	create() {
		// Background (positioned from bottom left)
		this.add.image(0, this.cameras.main.height, 'background').setOrigin(0, 1).setDepth(-10)

		this.showTitle()
		this.showMenuOptions()
		this.showMonstersWithTween()
	}

	showTitle() {
		const title = this.add.text(this.cameras.main.width / 2, -100, ' Fightomancers ', {
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
	}

	showMenuOptions() {
		// "New Game" button
		this.createMainMenuButton(this.cameras.main.width - 100, 380, 'New Game', () => {
			fadeOutTransition(this, () => {
				this.scene.start(SCENE_KEYS.MAIN_MENU)
			})
		})

		// "Options" button
		this.createMainMenuButton(this.cameras.main.width - 100, 450, 'Options', () => {
			fadeOutTransition(this, () => {
				// this.scene.start(SCENE_KEYS.OPTIONS)
				alert('Options not implemented yet')
				fadeInTransition(this)
			})
		})

		// "Credits" button
		this.createMainMenuButton(this.cameras.main.width - 100, 520, 'Credits', () => {
			fadeOutTransition(this, () => {
				// this.scene.start(SCENE_KEYS.CRE DITS)
				alert('Credits not implemented yet')
				fadeInTransition(this)
			})
		})
	}

	createMainMenuButton(x: number, y: number, text: string, onClick: () => void) {
		const menuButton = createMenuButton(this, x, y, text, {
			fontSize: '56px',
			color: '#fff'
		}, onClick)
			.setOrigin(1, 0.5)
			.setDepth(1)

		addHighlightOnMenuButtonHover(menuButton, 0xffff33)

		menuButton.on('pointerover', () => {
			this.tweens.add({
				targets: menuButton,
				scale: 1.05,
				duration: 100,
				ease: 'Sine.easeInOut'
			})
		})

		menuButton.on('pointerout', () => {
			this.tweens.add({
				targets: menuButton,
				scale: 1,
				duration: 100,
				ease: 'Sine.easeInOut'
			})
		})


	}

	showMonstersWithTween() {
		const monster1 = this.add.image(200, 390, 'monster1')
		monster1.setScale(0.35)
		monster1.setOrigin(0.5)
		this.addMonsterTween(monster1, true)
		const monster2 = this.add.image(600, 200, 'monster2')
		monster2.setScale(0.8)
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
