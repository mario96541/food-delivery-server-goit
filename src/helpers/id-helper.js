const getID = url => {
    const idIndex = url.lastIndexOf("/");
    if (idIndex !== -1) {
        return url.slice(idIndex + 1).trim();
    }
};
module.exports = getID;