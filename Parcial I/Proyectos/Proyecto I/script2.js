import readline from 'readline'

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(`Cuantas filas de la piramide de Pascal quiere generar?\n`, number => {
    generatePascalPyramidRow(number)
    rl.close();
  });


function generatePascalPyramidRow(columnSize){
  let pyramidRow = []
  if(columnSize == 0){
    pyramidRow.push(1)
    console.log(...pyramidRow)
    return
  }
  else{
    generatePascalPyramidRow(columnSize-1)
    for(let i = 0; i < (columnSize+1); i++){
      
        pyramidRow.push( generatePascalPyramidTerm(columnSize, i))
        if(i == columnSize){
          break;
        }
    }
    console.log(...pyramidRow)
    return
  }
}

function factorial(number){
  return (number == 1 || number == 0)
    ? 1
    :(number*factorial(number-1)) 
}

const generatePascalPyramidTerm = (row, number) => (factorial(row))/(factorial(number)*factorial(row-number))

