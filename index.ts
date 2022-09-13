const express = require('express');
const { exec } = require("child_process");
const fs = require('fs');

const app = express();
app.use(express.json());

console.log('hello world');

function createHTML(inputFileName, outputFileName) {
  exec(`php ./escpos-tools/esc2html.php ./${inputFileName}.bin > ${outputFileName}.html`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

app.get('/', (req, res) => {
  createHTML('testfile', 'testfile');
  res.send('Successful response.\n');
});

app.post('/printNoFile', (req, res) => {
  const fileName = req.body.fileName;
  console.log(fileName);
  try {
    createHTML(fileName, fileName);
    res.send('Success\n');
  } catch (e) {

  }
})

app.post('/print', (req, res) => {
  if (fs.existsSync('./testfile.bin')) {
    fs.unlinkSync('testfile.bin');
  }
  if (fs.existsSync('./testfile.html')) {
    fs.unlinkSync('testfile.html');
  }
  var ticket = req.body.ticket;
  let date_ob = new Date();
  fs.writeFileSync('testfile.bin', Buffer.from(ticket), 'binary');
  const string = `${date_ob.toUTCString()}`.replace(/:|,| /g, '');
  createHTML('testfile', string);
  console.log(date_ob.toTimeString());
  res.send(`Successful`);
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
