// helpers.js

/** Convert query string of nums to array of numbers */
function convertAndValidateNumsArray(numsAsString) {
  let result = [];

  for (let i = 0; i < numsAsString.length; i++) {
    let valToNumber = Number(numsAsString[i]);

    if (Number.isNaN(valToNumber)) {
      throw new Error(`${numsAsString[i]} is not a number.`);
    }

    result.push(valToNumber);
  }

  return result;
}

/** Find mean of array of numbers */
function findMean(nums) {
  if (nums.length === 0) return 0;
  let total = nums.reduce((acc, cur) => acc + cur, 0);
  return total / nums.length;
}

/** Find median of array of numbers */
function findMedian(nums) {
  nums.sort((a, b) => a - b);
  let middleIndex = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[middleIndex - 1] + nums[middleIndex]) / 2;
  } else {
    return nums[middleIndex];
  }
}

/** Find mode of array of numbers */
function findMode(nums) {
  let frequencyCounter = {};

  for (let num of nums) {
    frequencyCounter[num] = (frequencyCounter[num] || 0) + 1;
  }

  let count = 0;
  let mode;

  for (let key in frequencyCounter) {
    if (frequencyCounter[key] > count) {
      mode = Number(key);
      count = frequencyCounter[key];
    }
  }

  return mode;
}

module.exports = {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode
};
