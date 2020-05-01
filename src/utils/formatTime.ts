import moment from 'moment'

import 'moment/locale/ca'
import 'moment/locale/zh-cn'

export const format = (time: string) => {
  return moment(time).format('YYYY-MM-DD')
}
