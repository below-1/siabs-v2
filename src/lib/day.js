import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'

import 'dayjs/locale/id.js'

dayjs.extend(relativeTime)
dayjs.locale('id')

export default dayjs
