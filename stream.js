const fs = require('fs');

const readStream = fs.createReadStream('./data/dummyText.txt');
const writeStream = fs.createWriteStream('./data/dummyText2.txt');

// readStream.on('data', (buffer) => {
//     // Read Stream
//     console.log('***************** New Buffer ****************');
//     console.log(buffer.toString());

//     // Write Stream
//     writeStream.write('\nNew Buffer\n');
//     writeStream.write(buffer);
// });

readStream.pipe(writeStream);
