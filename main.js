const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationYRow = 0;
    this.locationXColumn = 0;

    // Setting the initial position before the game starts.
    this.field[0][0] = pathCharacter;
  }

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.askPromp();

      if (!this.isInBound()) {
        console.log('Out of bounds instruction!');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('You fell down a hole! Try again.');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('You found the hat, you win! Congratulation.');
        playing = false;
        break;
      }
      
      // Update the current location on the map
      this.field[this.locationYRow][this.locationXColumn] = pathCharacter
    }
  }

  askPromp() {
    const answer = prompt('Which way? ').toUpperCase();

    switch (answer) {
      case 'U':
        this.locationYRow -= 1;
        break;
      case 'D':
        this.locationYRow += 1;
        break;
      case 'L':
        this.locationXColumn -= 1;
        break;
      case 'R':
        this.locationXColumn += 1;
        break;
      default:
        console.log('Enter U, D, L or R to move 1 space at a time.');
        this.askPromp();
        break;
    };
  }

  isInBound() {
    return (
      this.locationYRow >= 0 && this.locationXColumn >= 0 &&
      this.locationYRow < this.field.length &&
      this.locationXColumn < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationYRow][this.locationXColumn] === hat;
  }

  isHole() {
    return this.field[this.locationYRow][this.locationXColumn] === hole;
  }

  print() {
    const printed = this.field.map(row => row.join('')).join('\n');
    console.log(printed);
  }

  static generateField(height, width, percentage = 0.1) {
    const field = Array(height).fill(0).map(el => Array(width));

    // define the elements present in the field randomly.
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      };
    };

    // set the hat location.
    const hatLocation = {
      y: Math.floor(Math.random() * height),
      x: Math.floor(Math.random() * width)
    };

    // make sure the hat does not appear at the starting point.
    while(hatLocation.y === 0 && hatLocation.x === 0) {
      hatLocation.y = Math.floor(Math.random() * height);
      hatLocation.x = Math.floor(Math.random() * width)
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
};

const yourField = new Field(Field.generateField(10, 10, 0.2));
yourField.runGame();




const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

// alternative to generateField const field matrix generator.
const arr = new Array(5);
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(4).fill(1);
};

// console.log(arr.join('\n'));

