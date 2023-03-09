function getRandomValue(min, max) {{
    return Math.floor(Math.random() * (max - min) + min)
}}

let currentRound = 0 

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100, 
            monsterHealth: 100 ,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecial(){
            return this.currentRound % 3 !== 0 
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <=  0) {
                // A draw 
                this.winner = 'draw'
            } else if(value <0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <=  0) {
                // A draw 
                this.winner = 'draw'
            } else if(value < 0) {
                this.winner = 'Player'
            }
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100
            this.monsterHealth = 100 
            this.currentRound = 0
            this.winner = null
            this.logMessages= []
        },
        attackMonster() {
            this.currentRound ++
            const attackValue = getRandomValue(5, 12)
            this.monsterHealth -= attackValue
            this.addLogMessage('Player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
            this.addLogMessage('monster', 'attack', attackValue)

        },
        specialAttackMonster(){
            this.currentRound ++
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue
            this.attackPlayer()
            this.addLogMessage('Player', 'special-attack', attackValue)

        },
        healPlayer(){
            const healValue = getRandomValue(10, 17)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessage('Player', 'heal', healValue)

            this.attackPlayer()
            this.currentRound ++
        },
        surrender(){
            this.winner = 'monster'
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
})

app.mount('#game')