
import { SCENE_KEYS } from '../config/sceneKeys'

/*
	 - IMPORTANT!!: Add a reference for the icons usage to: https://icons8.com/license (in Credits?)
*/

export class CreditsScene extends Phaser.Scene {

	constructor() {
		super(SCENE_KEYS.CREDITS)
	}

	create() {
		this.add.text(400, 100, 'Credits', { fontSize: '48px', color: '#fff', fontFamily: 'knight-warrior' }).setOrigin(0.5)
	}

}
