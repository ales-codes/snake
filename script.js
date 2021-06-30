class Game {
    constructor(cells) {
        this.cells = cells;

        this.x = 1;
        this.y = 1;        

        // Set default length of the snake.
        this.snakeLength = 5;

        // No pressed key yet.
        this.arrowKeyPressed = '';
        this.arrowKeyNotAllowed = '';

        // Set default coordinates of the snake.
        this.snake = [[this.x, this.y]];

        // Set default position of the food.
        // Set this.eaten to false = the food has not been eaten yet.
        this.randomCell = 55;
        this.eaten = false;

        // Set counter.
        this.counter = 1;

        // Invoke the start method.
        this.start();
    }
    
    //=========\\
    // start() \\
    //=========\\
    
    start() {          

        // Keydown event: User presses arrow key. 1) Check whether
        // pressing this key is allowed. (If the snake is moving to the left,
        // the game will not respond to pressing the right arrow key.)
        // 2) If pressed key is ok, set this.arrowKeyPressed to the new value.        
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case "ArrowUp": 
                    if(this.arrowKeyNotAllowed != 'UP') {
                        this.arrowKeyPressed = 'UP';      
                    }              
                    break;
                case "ArrowDown": 
                    if(this.arrowKeyNotAllowed != 'DOWN') {
                        this.arrowKeyPressed = 'DOWN';       
                    }             
                    break;
                case "ArrowLeft": 
                    if(this.arrowKeyNotAllowed != 'LEFT') {
                        this.arrowKeyPressed = 'LEFT';                    
                    }
                    break;
                case "ArrowRight": 
                    if(this.arrowKeyNotAllowed != 'RIGHT') {
                        this.arrowKeyPressed = 'RIGHT';                    
                    }
                    break;
            }           
        });                
        
        // Set interval, the snake is moving.        
        this.stopInterval = setInterval(() => {

        // If the snake is inside the game area, continue.
        if((this.snake[0][0] <= 12 && this.snake[0][0] > 0) && (this.snake[0][1] <= 10 && this.snake[0][1] > 0)) {

           // Invoke the clearGameArea method to keep the background orange.
           // (Only the cells with the snake body and with the food
           // will have different colors.)
           this.clearGameArea();
            
            // Render the snake body: 
            // If the cell data value equals the value from the snake array, 
            // turn the cell background to dark green.
            for(let cell of this.cells) {
                for(let i = 0; i < this.snake.length; i++) {            
                    if(cell.getAttribute('data-coord') == this.snake[i].toString()) {
                        cell.style.backgroundColor = '#168645';
                        cell.style.borderRadius = "2px";                        
                    }
                }        
             }
            
            // The user pressed the arrow key and this.arrowKeyPressed was set. 
            // Now check the value of this.arrowKeyPressed and change direction
            // of the snake based on the pressed key. Set the value of 
            // this.arrowKeyNotAllowed to the arrow key to which the game 
            // should not respond.
            if(this.arrowKeyPressed == '') {
                this.y = this.y;
                this.x++;
            } 
            else if(this.arrowKeyPressed == 'RIGHT') {   
                this.y = this.y;
                this.x++;                
                this.arrowKeyNotAllowed = 'LEFT';
            }
            else if(this.arrowKeyPressed == 'DOWN') {               
                this.x = this.x;
                this.y++;
                this.arrowKeyNotAllowed = 'UP';
            }
            else if(this.arrowKeyPressed == 'LEFT') {        
                this.y = this.y;
                this.x--;
                this.arrowKeyNotAllowed = 'RIGHT';
            }
            else if(this.arrowKeyPressed == 'UP') {
               this.x = this.x;
               this.y--;
               this.arrowKeyNotAllowed = 'DOWN';
            }

        // If the snake hits itself, quit the game
        if(this.snake.join('*').indexOf('*' + this.snake[0].toString() + '*', 1) < 0) {            
        } else {             
            this.gameOver(); 
        }
        
        this.snake.unshift([this.x, this.y]);
 
        if(this.snake.length > this.snakeLength){
            this.snake.pop();
        }

        // Invoke the method that will randomly show the food for the snake.        
        this.showPrey();       

        // If the snake hits the border of the game area, quit the game
        } else {            
            this.gameOver();
        }

        // End of the setInterval. Make step every 200ms.        
        }, 200);
    }


    //============\\
    // showPrey() \\
    //============\\
        
    // Displays snake's food randomly     
    showPrey() {
        
        // If the food hasn't been eaten (this.eaten = false), keep the food cell purple.        
        if(this.eaten == false) {            
            this.cells[this.randomCell].style.backgroundColor = '#5d0574';
            this.cells[this.randomCell].style.borderRadius = '2px';

            // If the snake catches the food, increase snake's length by one and set this.eaten to true.
            if(this.cells[this.randomCell].getAttribute('data-coord') == this.snake[0].toString()) {
                this.snakeLength++;
                this.eaten = true;
            }

        // If the food has been eaten (this.eaten = true), choose new position for the food.         
        } else {        
            
            // Choose new position for the food. If the newly choosen position lies inside
            // the snake's body, try again and choose new one (do - while).
            do {   

                // save randomly choosen position
                this.randomCell = Math.floor(Math.random() * 120);                

            } while(this.snake.join('*').indexOf(this.cells[this.randomCell].getAttribute('data-coord').toString()) != -1);            

            // increase the counter number
            counter.innerHTML = this.counter++;
            
            // set this.eaten to false
            this.eaten = false;
        }
    }

    //=================\\
    // clearGameArea() \\
    //=================\\
    
    // Keeps the background of the game area orange    
    clearGameArea() {        
        for(let defaultCellColor of this.cells) {
            defaultCellColor.style.backgroundColor = '#ffad16';
        }
    }

    //============\\
    // gameOver() \\
    //============\\
    
    // The game is over - set counter to 0,
    // clear interval, show menu and clear game area
    gameOver() {
        counter.innerHTML = '0';
        clearInterval(this.stopInterval);
        menu.style.display = 'flex';
        this.clearGameArea();
    }
}


const cells = document.querySelectorAll('[data-coord]');

const button = document.querySelector('.new-game-button');

const menu = document.querySelector('.menu');

const counter = document.querySelector('.counter');

button.addEventListener('click', () => {
    let newGame = new Game(cells);
    menu.style.display = 'none';
});




