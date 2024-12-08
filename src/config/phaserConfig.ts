
import { PreloadScene } from '../scenes/PreloadScene'
import { LaunchMenuScene } from '../scenes/LaunchMenuScene'
import { MainMenuScene } from '../scenes/HomeMenuScene'
import { FightScene } from '../scenes/FightScene'
import { CreditsScene } from '../scenes/CreditsScene'
import { VictoryScene } from '../scenes/VictoryScene'

// Game Initialization
export const phaserConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game',
	backgroundColor: '#555',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [
		PreloadScene,
		LaunchMenuScene,
		MainMenuScene,
		FightScene,
		CreditsScene,
		VictoryScene
	]
}
