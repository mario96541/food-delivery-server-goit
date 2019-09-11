const fs = require('fs');
const path = require('path');

const userRouter = (request, response) => {
    const pathForSave = path.join(__dirname, '../', 'db', 'user.json');

    if (request.method === 'POST') {
        const createFile = fs.createWriteStream(pathForSave);
        createFile.write(JSON.stringify({ status: 'sucsess', user }));
        createFile.end()

        fs.readFile(pathForSave, (error, data) => {
            if (error) throw error;
            console.log(error)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.write(data);
            response.end()
        })
    }
}

module.exports = userRouter;
