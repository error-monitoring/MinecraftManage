<template>
    <div class="mw-markdown">
        <vue-markdown v-highlight :source="source"></vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
// import EventServing from "../serving/event.serving.js";
// import LangServing from "../serving/lang.serving.js";
export default {
  components: {
    VueMarkdown
  },
  // props: {
  //   md: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      source: ""
    };
  },
  created() {
    this.source = require(`../md/zh-cn/test.md`);
    // this.setSource(LangServing.getLang());
    // EventServing.subscribeLang().subscribe(lang => {
    //   this.setSource(lang);
    // });
  },
  methods: {
    // setSource(lang) {
    //   this.source = require(`../md/${lang}/${this.md}.md`);
    // }
  }
};
</script>

<style lang='scss'>
.mw-markdown {
  & img {
    width: 100%;
  }
}
</style>

