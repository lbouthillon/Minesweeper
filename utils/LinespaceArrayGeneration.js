const makeLinespaceArray = (startValue, stopValue, step) => {
    var arr = [];
    for (var i = 0; i < stopValue; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

export default makeLinespaceArray;