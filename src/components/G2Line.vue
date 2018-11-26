<template>
  <!--此处的id用变量，方便同一页面引用多次相同的组件-->
  <div id="c1"></div>
</template>

<script>

export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    id: String
  },
  //   watch: {
  //     charData: function(val, oldVal) {
  //       // 监听charData，当放生变化时，触发这个回调函数绘制图表
  //       console.log("new: %s, old: %s", val, oldVal);
  //       this.drawChart(val);
  //     }
  //   },
  mounted() {
    // this.drawChart();
  },
  methods: {
    drawChart() {
      // var data = [
      // ];
      // var chart = new G2.Chart({
      //   container: "c1",
      //   forceFit: true,
      //   height: 400
      // });
      // chart.source(data);

      // chart.line().position("year*value");
      // chart
      //   .point()
      //   .position("year*value")
      //   .size(4)
      //   .shape("circle")
      //   .style({
      //     stroke: "#fff",
      //     lineWidth: 1
      //   });
      // chart.render();
    }
  }
};
</script>
