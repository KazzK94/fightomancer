
export class ActionBar extends Phaser.GameObjects.GameObject {
	private bar: Phaser.GameObjects.Graphics
	private x: number
	private y: number
	private width: number = 400
	private height: number = 10

	constructor(scene: Phaser.Scene, x: number, y: number, actionChargePercent = 0, actions = 0) {
		super(scene, 'ActionBar')
		this.bar = scene.add.graphics()
		this.x = x
		this.y = y
		this.draw(actionChargePercent, actions)
	}

	update(actionChargePercent: number, actions: number): void {
		this.draw(actionChargePercent, actions)
	}

	private draw(actionChargePercent: number, actions: number): void {
		this.bar.clear()

		// Draw background
		this.bar.fillStyle(0x000088, 1)
		this.bar.fillRect(this.x, this.y, this.width, this.height)

		// Draw action bar
		const actionWidth = Math.max(Math.floor(this.width * (actionChargePercent / 100)), 0)
		this.bar.fillStyle(0x0000ff, 0.8)
		this.bar.fillRect(this.x, this.y, actionWidth, this.height)

		// Draw border
		this.bar.lineStyle(2, 0x222222)
		this.bar.strokeRect(this.x, this.y, this.width, this.height)

		// Draw action count
		for (let i = 0;i < actions;i++) {
			this.bar.fillStyle(0x4499ff)
			this.bar.fillCircle(this.x + 20 + i * 20, this.y + 22, 6)
			this.bar.lineStyle(1, 0x2277bb)
			this.bar.strokeCircle(this.x + 20 + i * 20, this.y + 22, 6)
		}
	}

	clear() {
		this.bar.clear()
	}
}