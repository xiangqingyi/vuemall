
const removeByValue = (arr, val) => {
    let index = arr.indexOf(val);
    arr.splice(index, 1);
    return arr;
}

const formatPrice = (number) => {
    return parseFloat(number).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
}

const sortByUp = (arr, propertyName) => {
    return arr.sort((a, b) => {
        if (a.hasOwnProperty(propertyName) && b.hasOwnProperty(propertyName)) {
            if (typeof a[propertyName] === 'number' && typeof b[propertyName] === 'number') {
                return a[propertyName] - b[propertyName];
            } else {
                return a[propertyName].localeCompare(b[propertyName]);
            }
        }
    })
}

export {removeByValue, formatPrice, sortByUp};