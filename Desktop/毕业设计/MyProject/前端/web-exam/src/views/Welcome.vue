<template>
  <div>
      
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      exam_num: 0,
      user_num: 0,
      selsubject_num: 0,
      fillsubject_num: 0,
      judgesubject_num: 0,
      record_num: 0
    }
  },
  methods: {
    getData() {
      Http.exam_alllist()
        .then(rst => {
          console.log(rst)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>