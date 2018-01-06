import moment from 'moment'
export default {
  methods: {
    timeformat(row, col, val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}