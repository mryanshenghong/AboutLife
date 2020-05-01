import moment from 'moment'

import 'moment/src/locale/ca'
import 'moment/src/locale/zh-cn'

export const format = (time: string) => {
  return moment(time).format('YYYY-MM-DD')
}
