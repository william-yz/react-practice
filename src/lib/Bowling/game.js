export class Game {

    constructor(){
        this.score = 0
    }

    throw(pins){
        this.score += pins
    }

    getScore(){
        return this.score
    }
}