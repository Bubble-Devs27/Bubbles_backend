function randomNumGen(){
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random4Gen(){
    return Math.floor(1000 + Math.random() * 9000);
}
module.exports = {randomNumGen , random4Gen}