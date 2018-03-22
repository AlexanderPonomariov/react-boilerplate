import moment from 'moment';

export const getTime = () => {
    moment.locale('ru');

    return moment().utc()
        .format('LLLL');
};