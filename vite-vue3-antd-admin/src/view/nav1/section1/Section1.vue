<template>
  <div id='section1'>
    123
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  setup () {
    function sumMatrix (matrix) {
      var sum = 0;
      for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
          sum += currentRow[i];
        }
      }

      return sum;
    }
    console.log(sumMatrix([[1, 2, 3], [4, 5, 6]]))

  }
})

</script>
<style>
</style>