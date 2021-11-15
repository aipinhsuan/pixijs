namespace tetris {
  export class tetrisAction {
    public _setTimeoutId: number = 0;
    public _rotation: number = 0;
    public _isPause: Boolean = true;
    public _currentTetromino: any[] = [];
    public _nextTetromino: any[] = [];
    public _gridData: number[][] = [];
    public _specialCount: number = 1;
    public _currentScore: number = 0;
   

    constructor() {
      for (var i = 0; i < 12; i++) {
        this._gridData.push([]);
        for (var j = 0; j < 24; j++) {
          this._gridData[i].push(0);
        }
      }
    }

    public randomType():any {
      const tetrominoTypes = {
        I: {
          name: 'I', 
          color: 0xff8000, 
          size: 4, 
          isSpecial: false,
          specialType:0,
          shapes: [ 
            [
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
            [
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0]
            ],
            [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0]
            ],
            [
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0]
            ]
          ]
        },
        J: {
          name: 'J',
          color: 0x2cc990,
          size: 3,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [1, 0, 0],
              [1, 1, 1],
              [0, 0, 0]
            ],
            [
              [0, 1, 1],
              [0, 1, 0],
              [0, 1, 0]
            ],
            [
              [0, 0, 0],
              [1, 1, 1],
              [0, 0, 1]
            ],
            [
              [0, 1, 0],
              [0, 1, 0],
              [1, 1, 0]
            ]
          ]
        },
        L: {
          name: 'L',
          color: 0xf34344,
          size: 3,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [0, 0, 1],
              [1, 1, 1],
              [0, 0, 0]
            ],
            [
              [0, 1, 0],
              [0, 1, 0],
              [0, 1, 1]
            ],
            [
              [0, 0, 0],
              [1, 1, 1],
              [1, 0, 0]
            ],
            [
              [1, 1, 0],
              [0, 1, 0],
              [0, 1, 0]
            ]
          ]
        },
        O: {
          name: 'O',
          color: 0xffdf00,
          size: 2,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [1, 1],
              [1, 1]
            ],
            [
              [1, 1],
              [1, 1]
            ],
            [
              [1, 1],
              [1, 1]
            ],
            [
              [1, 1],
              [1, 1]
            ]
          ]
        },
        S: {
          name: 'S',
          color: 0xffaad5,
          size: 3,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [0, 1, 1],
              [1, 1, 0],
              [0, 0, 0]
            ],
            [
              [0, 1, 0],
              [0, 1, 1],
              [0, 0, 1]
            ],
            [
              [0, 0, 0],
              [0, 1, 1],
              [1, 1, 0]
            ],
            [
              [1, 0, 0],
              [1, 1, 0],
              [0, 1, 0]
            ]
          ]
        },
        T: {
          name: 'T',
          color: 0x008aff,
          size: 3,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [0, 1, 0],
              [1, 1, 1],
              [0, 0, 0]
            ],
            [
              [0, 1, 0],
              [0, 1, 1],
              [0, 1, 0]
            ],
            [
              [0, 0, 0],
              [1, 1, 1],
              [0, 1, 0]
            ],
            [
              [0, 1, 0],
              [1, 1, 0],
              [0, 1, 0]
            ]
          ]
        },
        Z: {
          name: 'Z',
          color: 0xbe77ff,
          size: 3,
          isSpecial: false,
          specialType:0,
          shapes: [
            [
              [1, 1, 0],
              [0, 1, 1],
              [0, 0, 0]
            ],
            [
              [0, 0, 1],
              [0, 1, 1],
              [0, 1, 0]
            ],
            [
              [0, 0, 0],
              [1, 1, 0],
              [0, 1, 1]
            ],
            [
              [0, 1, 0],
              [1, 1, 0],
              [1, 0, 0]
            ]
          ]
        }
      }
      var types = [tetrominoTypes.I, tetrominoTypes.J, tetrominoTypes.L, tetrominoTypes.O, tetrominoTypes.S, tetrominoTypes.T, tetrominoTypes.Z];
      var type = types[Math.floor(Math.random() * 7)];
      type.isSpecial = this._specialCount % 20 == 0 ? true : false;
      type.specialType = type.isSpecial ? Math.ceil(Math.random() * 2) : 0;
      this._specialCount++;
      return type;
    }

    public calculateScore(line:number):void{
      if(line===1){
        this._currentScore+=100;
      }
      if(line===2){
        this._currentScore+=300;
      }
      if(line===3){
        this._currentScore+=500;
      }
      if(line===4){
        this._currentScore+=800;
      }
    }

    public specialCalculateScore(count:number):void{
      this._currentScore+=count*50;
    }

    public right(): void {
      if (this._isPause === false) {
        this._currentTetromino[0].x += 1 * 25;
        if (this.isCollision(this._currentTetromino[0])) {
          this._currentTetromino[0].x -= 1 * 25;
        }
      }
    }

    public left(): void {
      if (this._isPause === false) {
        this._currentTetromino[0].x -= 1 * 25;
        if (this.isCollision(this._currentTetromino[0])) {
          this._currentTetromino[0].x += 1 * 25;
        }
      }
    }

    public spin(): void {
      if (this._isPause === false) {
        this._rotation = (this._rotation + 1) % 4;
        if (this.isCollision(this._currentTetromino[0])) {
          this._rotation = (this._rotation - 1);
          if (this._rotation === -1) {
            this._rotation = 3;
          }
        }
      }
    }

    public isCollision(tetromino: any): boolean {
      for (let x = 0; x < tetromino.type.size; x++) {
        for (let y = 0; y < tetromino.type.size; y++) {
          if (tetromino.x / 25 + x < 0 || tetromino.x / 25 + x >= 12 || y >= 24 || tetromino.y / 25 >= 0 && this._gridData[tetromino.x / 25 + x][tetromino.y / 25 + y] !== 0) {
            if (tetromino.type.shapes[this._rotation][y][x] === 1) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }

}