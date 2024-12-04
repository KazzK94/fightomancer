
export class Card extends Phaser.GameObjects.GameObject {

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, 'Card')
		this.create(scene, x, y)
	}

	create(scene: Phaser.Scene, x: number, y: number) {
		this.createShape(scene, x, y)
		this.createTitle(x, y, 'Card Title')
		this.createDamageAndCost(scene, x, y, Phaser.Math.Between(4, 20), Phaser.Math.Between(1, 9))
		this.createDescription(x, y, ' - This is the effect that is applied when this card is played - ')
	}

	createShape(scene: Phaser.Scene, x: number, y: number) {
		const CARD_WIDTH = 120
		const CARD_HEIGHT = 150

		const card = scene.add.graphics()
		card.fillStyle(0x001133)
		card.fillRoundedRect(x, y, CARD_WIDTH, CARD_HEIGHT, 6)
	}

	createTitle(x: number, y: number, title: string) {
		const titleText = this.scene.add.text(x + 60, y + 25, title, {
			fontSize: '20px',
			color: '#fff',
			fontFamily: 'knight-warrior',
			align: 'center'
		})
		titleText.setOrigin(0.5)
		titleText.setResolution(3)
	}

	createDamageAndCost(scene: Phaser.Scene, x: number, y: number, damage: number, cost: number) {

		// Damage Icon:
		scene.add.image(x + 28, y + 50, 'cardDamage').setScale(0.5).setTintFill(0xff0000)
		// Damage Text
		const damageText = scene.add.text(x + 38, y + 51, damage.toString(), {
			fontSize: '16px',
			color: '#f00',
			fontStyle: 'bold'
		})
		damageText.setOrigin(0, 0.5)
		damageText.setResolution(3)
		
		// Cost Icon:
		scene.add.image(x + 75, y + 50, 'cardCost').setScale(0.5).setTintFill(0x0099ff)
		// Cost Text
		const costText = scene.add.text(x + 85, y + 51, cost.toString(), {
			fontSize: '16px',
			color: '#09f',
			fontStyle: 'bold'
		})
		costText.setOrigin(0, 0.5)
		costText.setResolution(3)
		
	}

	createDescription(x: number, y: number, description: string) {
		const descriptionText = this.scene.add.text(x + 60, y + 100, description, {
			fontSize: '12px',
			color: '#fff',
			fontFamily: 'knight-warrior',
			align: 'center',
			wordWrap: { width: 100, useAdvancedWrap: true }
		})
		descriptionText.setOrigin(0.5)
		descriptionText.setResolution(3.5)
	}

}