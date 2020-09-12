test('adds 1 + 2 to equal 3', () => {
    const input: [first: number, second: number] = [1, 2];
    expect([input[0] + input[1]]).toEqual([3]);
});
