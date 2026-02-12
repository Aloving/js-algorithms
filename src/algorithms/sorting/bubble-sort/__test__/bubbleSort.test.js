const bubbleSort = require('../bubbleSort');

describe('bubbleSort', () => {
  it('should sort numbers in ascending order', () => {
    expect(bubbleSort([])).toEqual([]);
    expect(bubbleSort([1])).toEqual([1]);
    expect(bubbleSort([2, 1])).toEqual([1, 2]);
    expect(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not mutate original array', () => {
    const input = [3, 1, 2];
    bubbleSort(input);
    expect(input).toEqual([3, 1, 2]);
  });

  it('should sort with custom comparator', () => {
    const byValue = (a, b) => a.value - b.value;
    const input = [{ value: 3 }, { value: 1 }, { value: 2 }];
    expect(bubbleSort(input, byValue)).toEqual([
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ]);
  });

  it('should sort negative numbers', () => {
    expect(bubbleSort([-1, -3, 2, 0, 1])).toEqual([-3, -1, 0, 1, 2]);
  });
});
