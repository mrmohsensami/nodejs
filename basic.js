// console.log('Hello World!')

// const sayHello = (name) => {
//     console.log(`Hello ${name}`);
// }
// sayHello('World')

// const int = global.setInterval(() => {
//     console.log('Hello');
// }, 1000);
// global.setTimeout(() => {
//     clearInterval(int);
// }, 6000);

// console.log(__dirname);
// console.log(__filename);

// const os = require('os');
// console.log(os.platform());
// console.log(os.homedir());

const fs = require('fs');
// Reading Files
// fs.readFile('./data/text.txt', (error, data) => {
//     if (error) console.log(error);
//     console.log(data.toString());
// });
// console.log('The End');

// Writing Files
// fs.writeFile('./data/text.txt', 'Hello World', () => {
//     console.log('file was written');
// });
// fs.appendFile('./data/text.txt', '\nHello World', () => {
//     console.log('file was written');
// });

// Directories
// fs.mkdir('./dir', (err)=> {
//     if(err)
//         console.log(err);
//     console.log('Folder Created');
// })
// fs.rmdir('./dir', (err)=> {
//     if(err)
//         console.log(err);
//     console.log('Folder Removed');
// })

// Deleting Files
fs.unlink('./data/test.txt', (err) => {
    if (err) console.log(err);
    console.log('File Removed');
});
