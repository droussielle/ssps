const prompt = require('prompt-sync')({ sigint: true });
const { exec } = require('child_process');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const url = 'http://127.0.0.1:3000';
async function main() {
  try {
    const response = await fetch(url + '/queue/all?printer_id=656f19cd329a7ea68bd0de64', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YWZmQGdtYWlsLmNvbSIsIl9pZCI6IjY1Njk1YTQ2OTVmMjM1ZWEzMmU3OWM0OSIsImlhdCI6MTcwMTcwMjA0MSwiZXhwIjoxNzAyMzA2ODQxfQ.jbcn6mP7q7eXIfyMyn5mNiYEdJMDJjQpf86yciOU2OQ',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.data.queue.length > 0) {
      data.data.queue.map((el, index) => {
        console.log((index + 1) + ". " + el.fileName);
      });
    }
    const i = prompt('Bạn muốn in file nào? ');

    if (i >= 1 && i <= data.data.queue.length) {
      const isWindows = process.platform === 'win32';
      linux_code = `lpr ../downloads/` +
        data.data.queue[i - 1]._id +
        `.pdf -o PageSize=` +
        data.data.queue[i - 1].printProperties.paperSize +
        ` CNCopies=` +
        data.data.queue[i - 1].printProperties.copies +
        ` Duplex=` +
        (data.data.queue[i - 1].printProperties.sided === "true"
          ? "DuplexTumble"
          : "DuplexNoTumble");
      win_code =
        `Start-Process -FilePath "lpr" -ArgumentList @(
            ../downloads/` +
        data.data.queue[i - 1]._id +
        `.pdf,
        "-o", PageSize=` +
        data.data.queue[i - 1].printProperties.paperSize +
        `,
        "-o", CNCopies=` +
        data.data.queue[i - 1].printProperties.copies +
        `,
        "-o", Duplex=` +
        (data.data.queue[i - 1].printProperties.sided === "true"
          ? "DuplexTumble"
          : "DuplexNoTumble") +
        `) - NoNewWindow - Wait`;
      const command = isWindows ? win_code : linux_code;

      await downloadFile(data.data.queue[i - 1].fileLocation, data.data.queue[i - 1]._id);
      await executeCommand(command);
    } else {
      console.log('File bạn cần in không tồn tại');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function downloadFile(file, filename) {
  const apiUrl = url + file;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YWZmQGdtYWlsLmNvbSIsIl9pZCI6IjY1Njk1YTQ2OTVmMjM1ZWEzMmU3OWM0OSIsImlhdCI6MTcwMTcwMjA0MSwiZXhwIjoxNzAyMzA2ODQxfQ.jbcn6mP7q7eXIfyMyn5mNiYEdJMDJjQpf86yciOU2OQ',
      },
    });

    const contentDisposition = response.headers.get('content-disposition');
    let fileName = `../downloads/` + filename + `.pdf`;

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch) {
        fileName = fileNameMatch[1];
      }
    }

    const fileContent = await response.buffer();
    await fs.writeFile(fileName, fileContent);

    console.log(`File downloaded as: ${fileName}`);
  } catch (error) {
    console.error('Error downloading file:', error.message);
  }
}

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('exec error:', error);
        reject(error);
      } else {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        resolve();
      }
    });
  });
}

main();
