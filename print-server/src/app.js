const prompt = require("prompt-sync")({ sigint: true });

const express = require("express");
const { exec } = require("child_process");
const fs = require("fs").promises;
const cors = require("cors");
const fetch = require("node-fetch");
const url = "http://127.0.0.1:3000";
const app = express();
module.exports = async (app) => {
    app.get("/download", async (req, res) => {
        const token = req.headers.authorization;
        const { printer_id, model } = req.query;
        if (!token) {
            res.status(403).json({
                check: false,
                msg: "Forbidden",
            });
        }
        const result = await getFile(token, printer_id, model);
        if (result) {
            res.status(200).json({
                check: true,
            });
        } else {
            res.status(500).json({
                check: false,
                msg: "Lỗi máy chủ",
            });
        }
    });
    async function getFile(token, printer_id, model) {
        try {
            const response = await fetch(
                url + "/queue/all?printer_id=" + printer_id,
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.data.queue) {
                linux_code =
                    `lpr -P ` +
                    model +
                    ` ../downloads/` +
                    data.data.queue[0].fileName +
                    ` -o PageSize=` +
                    data.data.queue[0].printProperties.paperSize +
                    ` CNCopies=` +
                    data.data.queue[0].printProperties.copies +
                    ` Duplex=` +
                    (data.data.queue[0].printProperties.sided === "true"
                        ? "DuplexTumble"
                        : "DuplexNoTumble");
                const command = linux_code;

                const result = await downloadFile(
                    data.data.queue[0].fileLocation,
                    data.data.queue[0].fileName
                );
                if (result) {
                    await executeCommand(command);
                }
            }
            return false;
        } catch (error) {
            console.error("Error:", error.message);
            return false;
        }
    }
    async function downloadFile(file, filename, token) {
        const apiUrl = url + file;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });

            const contentDisposition = response.headers.get("content-disposition");
            let fileName = `./downloads/` + filename;

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch) {
                    fileName = fileNameMatch[1];
                }
            }

            const fileContent = await response.buffer();
            await fs.writeFile(fileName, fileContent);

            console.log(`File downloaded as: ${fileName}`);
            return true;
        } catch (error) {
            console.error("Error downloading file:", error.message);
            return false;
        }
    }
    async function executeCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("exec error:", error);
                    reject(error);
                    return false;
                } else {
                    console.log("stdout:", stdout);
                    console.log("stderr:", stderr);
                    resolve();
                    return true;
                }
            });
        });
    }
    app.use(
        cors({
            // origin: 'http://127.0.0.1:5500',
            methods: "GET,POST,PUT,DELETE,PATCH",
            credentials: true,
        })
    );
};
