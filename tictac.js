/*
	This is the entry function to this whole algorithm. Algorithm uses
	minimax with alpha-beta pruning to get the next move of 'player'
	player. Board will have values 1s and 0s and empty sites are filled
	with -1s. Thus if player = 1, algorithm will return the optimal 
	move which shall be taken by player who is filling the board with 1s.
	
	input--> board: a 3x3 matrix having values 0s, 1s and -1s.
		player: if 0, get optimal move for player filling the
				box with 0s, similarly if 1 get move for 1.
				
			e.g:	[1 0 -1
				 -1 -1 0
				 1 -1 -1]
				 player = 1
*/

let player, opponent;
let maxScore = 50;
let infinity = 10000;
function getMove(board, __player){
    player = __player;
    opponent = 1 - player;
    return bestMove(board);
}

/*
    Max has already taken its move in bestMove() function, so isMax 
    should be false when called from bestMove() method.
*/

function miniMax(board, depth, alpha, beta, isMax){
    if(beta <= alpha)
	return 0;
    const score = evaluate(board);
    if(score != 0)
        return score;
    if(isGameOver(board))
        return 0;
    const len = board.length;
    if(isMax){
        var best = -infinity;
        for(let row = 0; row < len; row++){
            for(let col = 0; col < len; col++){
                if(board[row][col] == -1){
                    board[row][col] = player;
                    best = Math.max(best, miniMax(board, depth + 1, alpha, beta, !isMax) - depth);
                    board[row][col] = -1;
		if(best > alpha)
		    alpha = best;
                }
            }
        }
        return best;
    }
    else{
    var best = infinity;
        for(let row = 0; row < len; row++){
            for(let col = 0; col < len; col++){
                if(board[row][col] == -1){
                    board[row][col] = opponent;
                    best = Math.min(best, miniMax(board, depth + 1, alpha, beta, !isMax) + depth);
                    board[row][col] = -1;
		 if(best < beta)
		    beta = best;
                }
            }
        }
        return best;
    }
}

function bestMove(board){
    /*Move the player to all available positions and
        choose the position on which evaluation is maximum.
    */
    let bestVal = -infinity;
    let bestPos = {'row': -1, 'col': -1};
    const len = board.length;
    for(let row = 0; row < len; row++){
        for(let col = 0; col < len; col++){
            if(board[row][col] == -1){
                board[row][col] = player;
                let evaluation = miniMax(board, 0,-infinity, infinity, false);
                // remove assigned value
                board[row][col] = -1;
                if(evaluation > bestVal){
                    bestVal = evaluation;
                    bestPos.row = row;
                    bestPos.col = col;
                }
            }
        }
    }
    return bestPos;
}

function evaluate(board){
	/*
		gets the score of board. It is positive if
		'player' (our player) wins, negative if we loss.
		Otherwise 0.
	*/
	
	// Check if a row is same
	const len = board.length;
	for(let row = 0; row < len; row++){
		let val = board[row][0];
		let allSame = true;
		for(let col = 1; col < len; col++){
      if(val != board[row][col])
         allSame = false;
		}
		if(allSame){
		    if(val == player)
		        return maxScore;
		    else if(val == opponent)
		        return -maxScore;		        
		}
	}
	
	// check if a column is same
	for(let col = 0; col < len; col++){
		let val = board[0][col];
		let allSame = true;
		for(let row = 1; row < len; row++){
      if(val != board[row][col])
        allSame = false;
		}
		if(allSame){
		    if(val == player)
		        return maxScore;
		    else if(val == opponent)
		        return -maxScore;
		}
	}
	
	// check if main diagonal is same
	let val = board[0][0];
	let allSame = true;
	for(let row = 1; row < len; row++){
	    if(val != board[row][row]){
	        allSame = false;
	        break;
	    }
	}
	if(allSame){
	    if(val == player)
	        return maxScore;
	    else if(val == opponent)
	        return -maxScore;
	}
	
	// check if off diagonal is same
	val = board[len-1][0];
	allSame = true;
	if(val == -1)	// it's last test case, no further checks required
	    return 0;
	for(let row = 0; row < len; row++){
	    if(val != board[row][len - row - 1])
	        allSame = false;
	}
	if(allSame){
	    if(val == player)
	        return maxScore;
	    else if(val == opponent)
	        return -maxScore;
	}	
	
	// Nobody wins, are we cool?
	return 0;
}


function isGameOver(board, player = 1){
    /*
        Checks if game is over, or there are still valid moves
    */
    
    // check if evaluate function returns 10 or -10 (i.e somebody already won)
    if(evaluate(board, player) != 0)
        return true;
    
    // if there's an empty box, game is not over
    const len = board.length;
    for(let row = 0; row < len; row++){
        for(let col = 0; col < len; col++)
            if(board[row][col] == -1)
                return false;
    }
    
    // Man!, no empty positions, it's over and yeah.. it's a draw
    return true;
}


function checkStuff(){
    const board1 = [
                    [1, 0, 0, 0],
                    [1, 1, -1, 0],
                    [0, -1, 1, 0],
                    [-1, 1, 0, 1]
                  ];
                  
     const board2 = [
                       [1, -1, 0],
                       [0, 1, -1],
                       [-1, -1, 1]
                    ];
    player = 1;
    opponent = 1 - player;
    console.log(evaluate(board1));
    console.log(evaluate(board2));
    console.log(board2);
    console.log(getMove(board2, 0));
}

checkStuff();
