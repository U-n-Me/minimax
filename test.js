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
