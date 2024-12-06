
import { CardData } from '../types'

const CARD_WIDTH = 120
const CARD_HEIGHT = 150

export class Card extends Phaser.GameObjects.Rectangle {

	cardData!: CardData

	titleText!: Phaser.GameObjects.Text
	damageIcon!: Phaser.GameObjects.Image
	damageText!: Phaser.GameObjects.Text
	costIcon!: Phaser.GameObjects.Image
	costText!: Phaser.GameObjects.Text

	constructor(scene: Phaser.Scene, x: number, y: number, cardData: CardData) {
		super(scene, x + 500, y, CARD_WIDTH, CARD_HEIGHT, 0x112244, 1)
		scene.add.existing(this)
		this.setOrigin(0)
		this.cardData = cardData
		this.create(scene, x, y)
		this.animate(scene)
	}

	create(scene: Phaser.Scene, x: number, y: number) {
		this.createTitle(x, y, this.cardData.name)
		this.createDamageAndCost(x, y)
		this.on('pointerdown', () => {
			alert('card clicked')
		})
	}

	createTitle(x: number, y: number, title: string) {
		this.titleText = this.scene.add.text(x + 60 + 500, y + 22, title, {
			fontSize: '40px',
			color: '#fff',
			fontFamily: 'knight-warrior',
			align: 'center'
		})
		this.titleText.setOrigin(0.5)
		this.titleText.setScale(0.5)
	}

	createDamageAndCost(x: number, y: number) {

		const { damage, cost } = this.cardData

		// Damage Icon:
		this.damageIcon = this.scene.add.image(x + 28 + 500, y + 50, 'cardDamage').setScale(0.5).setTintFill(0xff0000)
		// Damage Text
		this.damageText = this.scene.add.text(x + 38 + 500, y + 51, damage.toString(), {
			fontSize: '16px',
			color: '#f00',
			fontFamily: 'system-ui',
			fontStyle: 'bold'
		})
		this.damageText.setOrigin(0, 0.5)

		// Cost Icon:
		this.costIcon = this.scene.add.image(x + 75 + 500, y + 50, 'cardCost').setScale(0.5).setTintFill(0x0099ff)
		// Cost Text
		this.costText = this.scene.add.text(x + 85 + 500, y + 51, cost.toString(), {
			fontSize: '16px',
			color: '#09f',
			fontFamily: 'system-ui',
			fontStyle: 'bold'
		})
		this.costText.setOrigin(0, 0.5)
	}

	animate(scene: Phaser.Scene) {
		scene.tweens.add({
			targets: [this, this.titleText, this.damageIcon, this.damageText, this.costIcon, this.costText],
			x: "-=500",
			duration: 500,
			ease: 'Power2'
		})
	}

}