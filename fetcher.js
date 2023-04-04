const http = require('http');
const fs = require('fs');

// take input in terminal
const url = process.argv[2];
const localPath = process.argv[3];

// get request
http.get(url, (res) => {
  res.setEncoding('utf8');

  // storage all chunks of data as a string in variable data
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFile(localPath, data, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${data.length} bytes to ${localPath}`);
    });
  });
}).on('error', (err) => {
  console.error(`Got error: ${err.message}`);
});