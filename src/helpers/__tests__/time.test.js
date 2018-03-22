import { getTime } from '../time';

Date.now = jest.fn()
    .mockImplementationOnce(() => new Date(Date.UTC(2017, 9, 23, 12, 0)).valueOf())
    .mockImplementationOnce(() => new Date(Date.UTC(2017, 9, 24, 13, 0)).valueOf());

describe('should return time', () => {
    it(`should return 'понедельник, 23 октября 2017 г., 12:00'`, () => {
        const time = getTime();

        expect(time).toBe('понедельник, 23 октября 2017 г., 12:00');
    });

    it(`should return 'вторник, 24 октября 2017 г., 13:00'`, () => {
        const time = getTime();

        expect(time).toBe('вторник, 24 октября 2017 г., 13:00');
    });
});