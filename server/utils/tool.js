
const createCode = () => {
    // number 48-57;unicode编码
    const number = rangeArray(48, 57);
    // 
    const upperLetter = rangeArray(65, 90);

    const lowerLetter = rangeArray(97, 122);
    const codes = [...number, ...upperLetter, ...lowerLetter];
    const arr = [];
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * codes.length);
        let char = String.fromCharCode(codes[index]);
        arr.push(char)
    }
    return arr.join("");
}

const rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start);

module.exports = createCode; 