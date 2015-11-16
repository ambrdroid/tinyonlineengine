export function server(target: GameObject, propertyName: string) {
    if (target.serverVars === undefined) {
        target.serverVars = []
    }
    
    target.serverVars.push(propertyName)
}

export function client(target: GameObject, propertyName: string) {
    if (target.clientVars === undefined) {
        target.clientVars = []
    }
    
    target.clientVars.push(propertyName)
}

/**
 * server type @decorator
 */
export function type(type: string) {
    return function(target: Function) {
        target.prototype.className = type
    }
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
    isLocalPlayer: boolean = false
    
    /**
     * Server variable
     */
    serverVars: string[]
    
    /**
     * Client variable
     */
    clientVars: string[]
    
    /**
     * Create an object
     */
    constructor() {
    }
    
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