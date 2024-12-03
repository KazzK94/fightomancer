
export function fadeOutTransition(contextScene: Phaser.Scene, callback?: () => void, duration: number = 500) {
	contextScene.cameras.main.fadeOut(duration)
	if (!callback) return
	contextScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
}

export function fadeInTransition(contextScene: Phaser.Scene, callback?: () => void, duration: number = 500) {
	contextScene.cameras.main.fadeIn(duration)
	if (!callback) return
	contextScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, callback)
}