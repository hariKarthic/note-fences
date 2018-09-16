Storage.prototype.getArray = function (key) {
    var value = this.getItem(key)
    return value && JSON.parse(value)
}

Storage.prototype.setArrayItem = function (key, item) {
    let arr = [];
    if (this.getItem(key)) {
        arr = this.getArray(key);
        arr.push(item);
        this.setItem(key, JSON.stringify(arr));
    } else {
        this.setItem(key, JSON.stringify([item]))
    }
}

Storage.prototype.hasArrayItem = function (key, item) {
    let arr = [];
    if (this.getItem(key)) {
        arr = this.getArray(key);
        return arr.indexOf(item) >= 0
    }
    return false;
}