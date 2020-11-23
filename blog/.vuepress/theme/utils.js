import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const relativeDate = date => dayjs(date).fromNow()
export const formatDate = date => dayjs(date).format('ll')
