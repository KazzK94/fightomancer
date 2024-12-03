
export function createMenuButton(
	context: Phaser.Scene, x: number, y: number, text: string, textStyle: Phaser.Types.GameObjects.Text.TextStyle, onClick: () => void
) {
	return context.add.text(x, y, text, {
		fontFamily: 'knight-warrior',
		shadow: {
			color: '#000',
			blur: 4,
			fill: true,
			stroke: true
		},
		...textStyle,
	})
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', onClick)
}

export function addHighlightOnMenuButtonHover(
	target: Phaser.GameObjects.Text, highlightColor: number = 0xffdd33
) {
	target.on('pointerover', () => {
		target.setTint(highlightColor)
	})

	target.on('pointerout', () => {
		target.clearTint()
	})
}