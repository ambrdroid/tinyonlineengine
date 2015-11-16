
import engine = require("./engine")


/**
 * The agar body game object
 */
@engine.type("AgarBody")
export class AgarBody extends engine.GameObject {
    
    @engine.server
    position: engine.Vector2
    
    @engine.server
    maxVelocity: number = 0.0
    
    @engine.server
    point: number = 0
    
    @engine.server
    isAlive: boolean
    
    @engine.client
    mousePosition: engine.Vector2
    
    /**
     * initialize
     */
    init() {
        if (this.isLocalPlayer) {
            document.body.onmousemove = this.mouseEvent.bind(this)
        }
    }
    
    /**
     * Handle mouse event
     */
    mouseEvent(event: MouseEvent) {
        this.mousePosition = new engine.Vector2(event.pageX, event.pageY)
    }
    
    /**
     * update position
     */
    serverUpdate(deltaTime: number) {
        var distance = this.mousePosition.subtract(this.position)
        if (distance.length() > this.maxVelocity) {
            this.position = this.position.add(
                                 distance.normalize().mul(this.maxVelocity)
                            );
        }
    }
    
    /**
     * canvas rendering context
     */
    render(canvas: CanvasRenderingContext2D) {
        canvas.arc(this.position.x, this.position.y, this.point, 0, 360)
    }
}

/**
 * the server game object
 */
export class AgarServerGame extends engine.ServerGame {
    
    // a player join the game
    public join(player: engine.Player) {
        super.join(player)
        
        var agarBody = new AgarBody()        
        agarBody.owner = player.id
    }
}