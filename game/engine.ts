export function server(target: any, propertyName: string) {
    if (target.serverVars === undefined) {
        target.serverVars = []
    }
    
    target.serverVars.push(propertyName)
}

export function client(target: any, propertyName: string) {
    if (target.clientVars === undefined) {
        target.clientVars = []
    }
    
    target.clientVars.push(propertyName)
}

/**
 * server type @decorator
 */
export function type(target: any) {
    target.className = target.name
}

// vector 2
export class Vector2 {
    
    /**
     * x axis
     */
    x: number
    
    /**
     * y axis
     */
    y: number
    
    /**
     * Create a new vector 2
     */
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    
    add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }
    
    subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }
    
    mul(float: number): Vector2 {
        return new Vector2(this.x * float, this.y * float)
    }
    
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    
    normalize(): Vector2 {
        return this.mul(1 / this.length())
    }
}

/**
 * the game object 
 */
export class GameObject {
    
    /**
     * If of the object
     */
    id: number
    
    /**
     * the owner of the object
     */
    owner: number
    
    /**
     * type of this object
     */
    className: string
       
    /**
     * Check if this object is local player's object
     */
    isLocalPlayer: boolean
    
    /**
     * Changed variable
     */
    changedSet: any = {}
    
    /**
     * Initialize 
     */
    serverInit() {
        
    }
    
    /**
     * Update server
     */
    serverUpdate(deltaTime: number) {
            
    }
    
    /**
     * init on client side
     */
    init() {
        
    }
    
    /**
     * Update the client side
     */
    update(deltaTime: number) {
        
    }
    
    /**
     * Render the object on canvas
     */
    render(canvas: CanvasRenderingContext2D) {
    }
    
    
    /**
     * Start watching on server
     */
    startWatchingServer() {
        var proto = this["__proto__"]
        this.watchFields(proto.serverVars)
    }
    
    /**
     * Start watching on client
     */
    startWatchingClient() {
        var proto = this["__proto__"]
        this.watchFields(proto.clientVars)
    }
    
    /**
     * Start watching fields
     */
    watchFields(fields: string[]) {
        for (var i = 0; i < fields.length; i++) {
            this.watchField(fields[i])
        }
    }
    
    /**
     * 
     */
    watchField(field: string) {
            
        Object.defineProperty(this, field, {
            get: function() {
                return this["_" + field]
            },
            set: function(value) {
                this["_" + field] = value
                this.changedSet[field] = value
            }
        })
    }
}

/**
 * player class
 */
export class Player {
    /**
     * if of the player
     */
    id: number
    
    /**
     * in comming messages to handle
     */
    incomingMessages: any[]
}

/**
 * the common game class
 */
export class Game {
    
    /**
     * List of game object
     */
    public objects: GameObject[] = []
}

/**
 * The game in server side
 */
export class ServerGame extends Game {
    
    /**
     * list of players
     */
    public players: Player[] = []
    
    /**
     * generator
     */
    idGenerator = 0
    
    /**
     * Initialize the game
     */
    init() {
        
    }
    
    /**
     * a player join the game
     */
    public join(player: Player) {
        
    }
    
    
    /**
     * register an object
     */
    public registerObject(object: GameObject) {
        object.id = this.generateId()
        this.objects.push(object)
    }
    
    
    /**
     * generate and id
     */
    public generateId(): number {
        return this.idGenerator++
    }
}