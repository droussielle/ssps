const prompt = require("prompt-sync")({ sigint: true });
var exec = require('child_process').exec;
var res
fetch("http://localhost:3000/queue/all?printer_id=656c8891837a9b271ed96a9e", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNwc29AZ21haWwuY29tIiwiX2lkIjoiNjU2ODhiZjVlYzY4N2Q4ZWRhNjY3ZjZlIiwiaWF0IjoxNzAxNjE3MTM2LCJleHAiOjE3MDIyMjE5MzZ9.eiVJPsWdcXAwShB1JrMYnpltJyS4O8Cw-SnWzJ-JYsY"
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(response); // assuming response is JSON
    })
    .then(data => {
        // Handle the data
        res = data;
        data.data.queue.map((el) => {
            console.log(el.fileName);
        })
        const i = prompt("Bạn muốn in file nào? ");

        if (i >= 1 && i <= data.data.queue.length) {
            var isWindows = process.platform === 'win32';
            var command = isWindows ? String(res.win_code[i - 1]) : String(res.linux_code[i - 1]);

            exec(command, function (error, stdout, stderr) {
                // Log the standard output
                console.log('stdout: ' + stdout);

                // Log the standard error
                console.log('stderr: ' + stderr);

                // Check for errors during execution
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
        else {
            console.log('File bạn cần in không tồn tại')
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

