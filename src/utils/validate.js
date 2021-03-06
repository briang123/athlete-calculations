import { isNumber, containZeroValues, areNonNegativeValues } from './common.js';

export function processValidations(queue) {
  queue.forEach((v) => v);
}

export function checkForNumberTypes(arr) {
  arr.forEach(({ value, label }) => {
    if (!isNumber(value)) {
      throw new Error(`'${label}' must be a valid number.`);
    }
  });
}

export function checkForZeroValues(arr) {
  const result = containZeroValues(arr.map((v) => v.value));
  if (result) {
    throw new Error(
      `${labelJoiner(arr, lessThanOrEqualZero)} must be greater than 0`,
    );
  }
}

export function checkForNegativeValues(arr) {
  const valueIsAboveZero = areNonNegativeValues(arr.map((v) => v.value));
  if (!valueIsAboveZero) {
    throw new Error(
      `The following negative values are not allowed: '${labelJoiner(
        arr,
        lessThanZero,
      )}'`,
    );
  }
}

function lessThanZero(v) {
  return v.value < 0;
}

function lessThanOrEqualZero(v) {
  return v.value <= 1;
}

function labelJoiner(arr, filter) {
  return arr
    .filter(filter)
    .map((v) => v.label)
    .join(', ');
}

export function getLabelValueObject(label, value) {
  return { label, value };
}
