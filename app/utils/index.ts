import dayjs from 'dayjs'

import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import nl from 'dayjs/locale/nl'

dayjs.locale(nl)
dayjs.extend(tz)
dayjs.extend(utc)

function formattedDate(epoch: number, format?: string): string {
  const date = dayjs.unix(epoch).tz('Europe/Amsterdam')

  if (format) {
    return date.format(format)
  } else {
    return date.toISOString()
  }
}

export { formattedDate }
