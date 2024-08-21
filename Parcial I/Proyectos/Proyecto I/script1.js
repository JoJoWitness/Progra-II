import fs from 'fs';

let list = [];
let numberOfElements;
let outputList = []

const unparsedData =  fs.readFileSync("barajeo.in", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

function parseData() {
  const data = unparsedData.split("\n");
  
  numberOfElements = data.shift();

  for (let i = 0; i < data.length; i++) {
    if (!data[i] == "") {
    list.push(data[i]);
  }
}
}

function shuffleData(){
  const listMiddle = Math.ceil(numberOfElements/2)
  let topElements = list.slice(0,listMiddle)
  let bottomElements = list.slice(listMiddle, numberOfElements)
 
  let top = 0, bottom =0

  for (let i = 0; i < numberOfElements; i++) {
    if(i%2 == 0){
      outputList.push(topElements[top])
      top++
    }
    else{
      outputList.push(bottomElements[bottom])
      bottom++
    }
  }
}

function printOutput(){
  for(let i = 0; i < outputList.length; i++){
    console.log(outputList[i])
  }
};


(function run(){
  parseData();
  shuffleData();
  printOutput();
    }
  )()


