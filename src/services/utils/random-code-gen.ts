

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomCodeGen(codeLen: number) {
    return new Array(codeLen).fill(0).map( (i) => `${getRandomInt(codeLen)}` ).join('')
    // crypto
    //   .randomBytes(codeLen)
    //   .toString() // convert to hexadecimal format
    //   .slice(0, codeLen) // return required number of characters
}
