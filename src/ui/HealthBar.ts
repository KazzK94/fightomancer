
export class HealthBar extends Phaser.GameObjects.GameObject {
	private bar: Phaser.GameObjects.Graphics
	private x: number
	private y: number
	private width: number = 400
	private height: number = 35

	constructor(scene: Phaser.Scene, x: number, y: number, healthProportion = 1) {
		super(scene, 'HealthBar')
		this.bar = scene.add.graphics()
		this.x = x
		this.y = y
		this.draw(healthProportion)
	}

	/** Updates the HealthBar with given proportion of fill (healthProportion value must be a number between 0 and 1) */
	update(healthProportion: number): void {
		this.draw(healthProportion)
	}

	private draw(healthProportion: number): void {
		this.bar.clear()

		// Draw background
		this.bar.fillStyle(0x660000, 1)
		this.bar.fillRect(this.x, this.y, this.width, this.height)

		// Draw health
		const healthWidth = Math.max(Math.floor(this.width * healthProportion), 0)
		if (healthProportion > 0.6) {
			this.bar.fillStyle(0x00ff00, 1)
		} else if (healthProportion > 0.3) {
			this.bar.fillStyle(0xffff00, 1)
		} else {
			this.bar.fillStyle(0xff0000, 1)
		}
		this.bar.fillRect(this.x, this.y, healthWidth, this.height)

		// Draw border
		this.bar.lineStyle(2, 0x222222)
		this.bar.strokeRect(this.x, this.y, this.width, this.height)
	}
}