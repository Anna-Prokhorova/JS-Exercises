export const sum = (nums, bound) => {
    let arr = new Set();
    [...Array(bound-1).keys()].map(el => el = el+1).forEach(i => {
      nums.forEach(num => {if (i % num === 0) {arr.add(i)}});
    });
    return Array.from(arr).reduce((a, b) => {return a + b;}, 0);
  }