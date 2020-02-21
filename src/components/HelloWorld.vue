<template>
  <div class="hello">
    
    <h1>Your favorites recipes</h1>
    <div v-for="textBlock in this.textBlocks" v-bind:key="textBlock.id">
      <div>
      {{textBlock.text}}
      </div>
    </div>
    <mugen-scroll :handler="getRecipes" :should-handle="!loading">
    </mugen-scroll>
  </div>
</template>

<script>
const axios = require('axios')
  import MugenScroll from 'vue-mugen-scroll'

const extractTextBlocks = (text) => {

  const currentTextBoxMatrix = {};

  let currentColumns = [];
  const textBlocks = [];

  const addTextBlock = textBlock => {
    textBlocks.push(textBlock)
    currentTextBoxMatrix[`textBlock_${textBlock.startColumn}`]
  }

  const getTextBlock = column => {
    return currentTextBoxMatrix[`textBlock_${column}`]
  }

  const buildTextBlock = (startLine, startColumn, endColumn) => {
    return {
      startLine: startLine,
      endLine: startLine,
      startColumn: startColumn,
      endColumn: endColumn,
      text: ''
    }
  }
  const findColumns = (lineOfText) => {
    // eslint-ignore 
    console.log(lineOfText) // eslint-disable-line
    const columns = [];
    let numberOfConcurrentSpaces = 0;
    for (var i = 0; i < lineOfText.length; i++) {
      if(lineOfText.charAt(i) === ' '){
        numberOfConcurrentSpaces ++
      }
      else if(lineOfText.charAt(i) !== ' ' && numberOfConcurrentSpaces > 2) {
        columns.push(
            {startColumn: i
          })
        columns[columns.length - 1].endColumn ++
      }
    }
    return columns
  }

  const lines = text.split('\n');

  lines.forEach(line => {
    let thisLinesColumns = findColumns(line)
    thisLinesColumns.forEach( (column, index) => {
      if(column.startColumn === currentColumns[index].startColumn){
        getTextBlock(column.startColumn)
      } else {
        addTextBlock(buildTextBlock(column.startLine, column.startColumn, column.endColumn))
      }
    })
    currentColumns = thisLinesColumns
  })

  return textBlocks
}

export default {
  name: 'HelloWorld',
  components: {
    MugenScroll
  },
  data() {
    return {
      recipes: [],
      page: 0,
      loading: false,
      recipeContent: '',
      textBlocks: [{id:1, text: 'hahah'}]
    }
  },
  props: {
    msg: String
  },
  methods:{
    getRecipes(){
      this.page ++;
      this.loading = true;
      axios.get(`http://localhost:8080/api/result_frikadellen.txt`, {
        page: this.page
      })
          .then((response)=>{
            // myThat.recipes = [] 
            // console.log(response.data);
            this.recipeContent = response.data;
            this.textBlocks = extractTextBlocks(this.recipeContent)
            this.loading = false;
          }
      )
    }
  },

  mounted: function() {
    // var myThat = this;
    // this.getRecipes();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  width: 200px;
  border: 1px solid #aaa;
  padding: 40px 10px;
  margin: 5px;
}
a {
  color: #42b983;
}
</style>
