
import Phaser, { Types } from 'phaser'

// Scenes
import { LandingMenu } from './scenes/LandingMenu'

// Game Initialization
const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: '#game',
	backgroundColor: '#900',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	input: {
		gamepad: true
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
	scene: [
		LandingMenu
	]
}

new Phaser.Game(config)