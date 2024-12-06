
import { SCENE_KEYS } from '../config/sceneKeys'

export const HOME_MENU_CONFIG = {
	MARGIN_TOP: 25, // Margin from top of the screen (in px)
	MARGIN_LEFT: 25, // Margin from left of the screen (in px)
	PADDING_LEFT: 30, // Padding from the left of the button (in px)
	BUTTON_GAP_Y: 20, // Space between the menu buttons (in px)
	ICON_GAP_X: 40, // Gap between icon and text
	BUTTON_WIDTH: 450,
	BUTTON_HEIGHT: 120
}

export const HOME_MENU_BUTTONS = [
	{
		text: 'Fight',
		icon: 'fightIcon',
		color: 0xee6666,
		toScene: SCENE_KEYS.FIGHT
	},
	{
		text: 'Team',
		icon: 'teamIcon',
		color: 0x77dd77,
		toScene: null
	},
	{
		text: 'Shop',
		icon: 'shopIcon',
		color: 0x7777dd,
		toScene: null
	},
	{
		text: 'Settings',
		icon: 'settingsIcon',
		color: 0xbbbbbb,
		toScene: null
	}
]