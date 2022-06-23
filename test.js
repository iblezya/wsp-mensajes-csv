

const fs = require('fs');
const Papa = require('papaparse');



const dbPath = './data/test.csv';

const readDB = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      worker: true,
      header: false,
      complete: (results) => {
        const numbers = results.data  
        
        return resolve(numbers)
      }
    });
  });
};

const numbers = async() => {
  const numbersRaw = await readDB(dbPath);



  for (let index = 1; index < numbersRaw.length; index++) {
    let number = String(numbersRaw[index]);
    console.log(number)
  }


};


numbers();


