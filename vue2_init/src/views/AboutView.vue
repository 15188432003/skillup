<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!--  1、上传word文档 -->
    <input class="hide" type="file" id="wordFile" @change="getWordFile" accept=".docx" />
    <label for="wordFile" class="editor-export cur-p c-hover">{{ loading? '转换中，请稍后': '导入word' }}</label>
  </div>
</template>


<script>
// var mammoth = require("mammoth");
import mammoth from "mammoth";
export default {

  data: () => {
    return {

    }
  },
  methods: {
    getWordFile(e) {
      console.log(mammoth);
      const _this = this
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function (evt) {
        let arrayBuffer = evt.target.result
        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(_this.displayResult)
          .done()
      }
    },
  }
}
</script>
