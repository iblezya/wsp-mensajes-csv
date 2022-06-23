const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');

const fs = require('fs');
const Papa = require('papaparse');
const dbPath = './data/test.csv';

const country_code = "51";
const mensaje = `Este Plan es para ti!
😎 LLÉVATE TODO ILIMITADO POR TAN SOLO 💥24.90 😱:
😎 Y goza de todos estos beneficios:

+🎁 30 GB en alta velocidad 😉
+🎁 30 GB adicionales para TIKTOK
+🎁 30 GB para BITEL VIDEO GRATIS 
+🎁 Internet , Llamadas y mensajes ILIMITADOS
+🎁  1 chip prepago de regalo 
PROMOCION VALIDA SOLO ONLINE (POR ESTE MEDIO)EN PORTABILIDAD O LINEA NUEVA
APROVECHA CAMBIATE A BITEL.!!`;
const media = MessageMedia.fromFilePath('./data/promo.jpeg');

const gersonSalas = new Client({
  authStrategy: new LocalAuth({ clientId: "vendedor-uno" })
});

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

  gersonSalas.on('qr', qr => {
    qrcode.generate(qr, {small: true});
  });


  gersonSalas.on('ready', () => {
  console.log('Cliente iniciado.')

    for (let index = 1; index < numbersRaw.length; index++) {

      let number = String(numbersRaw[index]);
      let chatId = country_code + number + "@c.us";

      gersonSalas.sendMessage(chatId,mensaje)
        .then( response => {
          if (response.id.fromMe) {
            console.log('Mensaje enviado.')            
          }
        })
      gersonSalas.sendMessage(chatId, media)
        .then( response => {
          if (response.id.fromMe) {
            console.log('Imagen enviada.')
          }
        })
    }
  })
  gersonSalas.initialize();

};


numbers();

///////////////////////////////////////
  //
  //


/* const number = "959733651"; */
// const numbersss = ['959733651','936733798'];


    // numbersss.forEach(numero => {
    //   let chatId = country_code + numero + "@c.us";
    //   gersonSalas.sendMessage(chatId, msg)
    //     .then( response => {
    //       if (response.id.fromMe) {
    //         console.log('Mensaje enviado')
    //       }
    //     })
    // })





