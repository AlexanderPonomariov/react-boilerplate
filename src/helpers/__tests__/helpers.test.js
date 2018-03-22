import { getFullApiUrl, getUniqueID, getRandomColor } from '../';

const GROUP_ID = 'test';
const api = 'https://lab.lectrum.io/react/api';

describe('getFullApiUrl test js: ', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl should throw an err for wrong aruments', () => {
        const getFullApiNameWithError = () => {
            getFullApiUrl(null, 1);
        };

        expect(getFullApiNameWithError).toThrowError(
            'api and GROUP_ID should be a string'
        );
    });

    test('getFullApiUrl should return full api URL', () => {
        expect(getFullApiUrl(api, GROUP_ID)).toBe(`${api}/${GROUP_ID}`);
    });

});

describe('getUniqueID test full api URLjs: ', () => {
    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID should return string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });

    test('getUniqueID should return string with length equal to length', () => {
        const length = 15;
        expect(getUniqueID(length)).toHaveLength(length);
    });
    test('getUniqueID should throw an err for wrong aruments', () => {
        const getUniqueIDWithError = () => {
            getUniqueID("wrong");
        };

        expect(getUniqueIDWithError).toThrowError(
            'The function argument should be a number!'
        );
    });
});

describe('getRandomColor test js: ', () => {
    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor should return string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('getRandomColor should return string with length equal to 15', () => {
        expect(getRandomColor()).toHaveLength(7);
    });
    test('getRandomColor should return string with # first symbol', () => {
        expect(getRandomColor().charAt(0)).toBe('#');
    });
});
