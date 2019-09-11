const fs = require("fs");
const path = require("path");

const createUser = (request, response) => {
  const src = path.join(__dirname, "../../", 'db', "all-user.json");
  const user = request.body;
  const userId = []
  fs.stat(src, (error, stat) => {
    if (error === null) {
      //file exist
      fs.readFile(src, (error, data) => {
        const prevData = JSON.parse(data);
        const userData = { ...user, id: Date.now() }
        const newUser = [...prevData, userData]
        fs.writeFile(src, JSON.stringify(newUser), (error) => { if (error) throw error; })
        response.set("Content-Type", "application/json")
        response.status(200);
        response.json({ status: "success", newUser });
      })
    }
    else if (error.code === 'ENOENT') {
      // file does not exist
      userId.push({ ...user, id: Date.now() })
      fs.writeFile(src, JSON.stringify(userId), (error) => { if (error) throw error; })
      response.set("Content-Type", "application/json")
      response.status(200);
      response.json({ status: "success", userId });
    }
  }
  )
}

module.exports = createUser;