import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const dayParser = (dayjsDate) => {
    if (dayjsDate.isToday()) return 'Today';
    if (dayjsDate.isYesterday()) return 'Yesterday';

    if (dayjs().isoWeek() === dayjsDate.isoWeek()) {
        return dayjsDate.format('dddd');
    } else return dayjsDate.format('DD/MM/YYYY');
};

export default dayParser;
