import { SCENE_KEYS } from '../config/sceneKeys'

export class PreloadScene extends Phaser.Scene {

	preload() {
		// Background
		this.load.image('background', 'images/backgrounds/bg-desert.jpg')
		// Icons / UI
		this.load.image('fightIcon', 'images/icons/fight.png')
		this.load.image('shopIcon', 'images/icons/shop.png')
		this.load.image('teamIcon', 'images/icons/team.png')
		this.load.image('settingsIcon', 'images/icons/settings.png')
		// Monsters
		this.load.image('monster1', 'images/fightomancers/green-monster-gamer.png')
		this.load.image('monster2', 'images/fightomancers/dragon.webp')
		this.load.image('scalekin', 'images/fightomancers/scalekin.png')
		this.load.image('raichunt', 'images/fightomancers/raichunt.png')
	}

	create() {
		this.scene.start(SCENE_KEYS.LAUNCH_MENU)
	}

}