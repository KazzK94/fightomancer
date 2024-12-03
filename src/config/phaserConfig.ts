
import { LaunchMenuScene } from '../scenes/LaunchMenuScene'
import { MainMenuScene } from '../scenes/HomeMenuScene'

// Game Initialization
export const phaserConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game',
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
		LaunchMenuScene,
		MainMenuScene
	]
}
