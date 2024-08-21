import fs from 'fs';

let arabicArray =[]
let romanArray=[]
let parseArray= []

const unparsedData =  fs.readFileSync("romanos.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

function parseData() {

  parseArray = unparsedData.split('\n')

  for(let i = 0; i < parseArray.length ; i++){
   
      if (!parseArray[i] == "") {
        arabicArray.push(parseInt(parseArray[i]));
      }
  }
}



function fillRomanArray(){
  for(let i = 0; i < arabicArray.length; i++){
    romanArray.push(arabicToRoman(arabicArray[i]))
  }
  

}

function arabicToRoman(arabicNumber){

  let romanNumber = ""
  const originalNumber = arabicNumber

  while(arabicNumber >0){
    switch (true) {
    case arabicNumber >= 1000:
      romanNumber += 'M'
      arabicNumber -=1000
      break;
    case arabicNumber >= 900:
      romanNumber += 'CM'
      arabicNumber -=900
      break;
    case arabicNumber >= 500:
      romanNumber += 'D'
      arabicNumber -=500
      break;
    case arabicNumber >= 400:
      romanNumber += 'CD'
      arabicNumber -=400
      break;
    case arabicNumber >= 100:
      romanNumber += 'C'
      arabicNumber -=100
      break;
    case arabicNumber >= 90:
      romanNumber += 'XC'
      arabicNumber -=90
      break;
    case arabicNumber >= 50:
      romanNumber += 'L'
      arabicNumber -= 50
      break;
    case arabicNumber >= 40:
      romanNumber += 'XL'
      arabicNumber -=40
      break;
    case arabicNumber >= 10:
      romanNumber += 'X'
      arabicNumber -=10
      break;
    case arabicNumber >= 9:
      romanNumber += 'IX'
      arabicNumber -= 9
      break;
    case arabicNumber >= 5:
      romanNumber += 'V'
      arabicNumber -=5
      break;
    case arabicNumber >= 4:
      romanNumber += 'IV'
      arabicNumber -= 4
      break;
    case arabicNumber >= 1:
      romanNumber += 'I'
      arabicNumber -= 1
      break;
    
  }
  
}
  return romanNumber + `    ${originalNumber}`
}



function writeFile() {

  const unparsedRomanArray = romanArray.join('\n')
  fs.writeFile('salidaRomanos.txt', unparsedRomanArray, (err) => {
    if (err) {
      console.error(err);
    } 
  });
};

(function run(){
  parseData()
  fillRomanArray(arabicArray)
  console.log(romanArray)
  writeFile();
    }
  )()

