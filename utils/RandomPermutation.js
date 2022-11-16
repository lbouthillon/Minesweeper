const getrandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min)
}

const permute = (arr, i, j) => {
    var value = arr[i];
    arr[i] = arr[j];
    arr[j] = value;
}

const randomPermuteArray = (arr) => {
    for (var i = 0; i < arr.length; i++){
        var j = getrandomInt(0, arr.length);
        permute(arr, i, j);
    }
    return arr;
}

export default randomPermuteArray;

