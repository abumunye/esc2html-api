const express = require('express');
const { exec } = require("child_process");

const app = express();

function createHTML() {
	exec("php ./escpos-tools/esc2html.php ./escpos-tools/test.bin > test.html", (error, stdout, stderr) => {
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
	createHTML();
	res.send('Successful response.\n');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
