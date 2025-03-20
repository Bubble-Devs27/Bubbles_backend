function randomNumGen(){
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = randomNumGen