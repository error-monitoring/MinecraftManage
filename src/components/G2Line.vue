<template>
  <!--此处的id用变量，方便同一页面引用多次相同的组件-->
  <div id="c1"></div>
</template>

<script>
import G2 from "@antv/g2";
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
    this.drawChart();
  },
  methods: {
    drawChart() {
      var data = [
        {
          year: "1",
          value: 3
        },
        {
          year: "2",
          value: 4
        },
        {
          year: "3",
          value: 3.5
        },
        {
          year: "4",
          value: 5
        },
        {
          year: "5",
          value: 4.9
        },
        {
          year: "6",
          value: 6
        },
        {
          year: "7",
          value: 7
        },
        {
          year: "8",
          value: 9
        },
        {
          year: "9",
          value: 13
        },
        {
          year: "10",
          value: 6
        },
        {
          year: "11",
          value: 7
        },
        {
          year: "12",
          value: 9
        },
        {
          year: "13",
          value: 13
        },
        {
          year: "14",
          value: 6
        },
        {
          year: "15",
          value: 7
        },
        {
          year: "16",
          value: 9
        },
        {
          year: "1999",
          value: 13
        },
        {
          year: "1996",
          value: 6
        },
        {
          year: "1997",
          value: 7
        },
        {
          year: "1998",
          value: 9
        },
        {
          year: "2000",
          value: 13
        },
      ];
      var chart = new G2.Chart({
        container: "c1",
        forceFit: true,
        height: 400
      });
      chart.source(data);
    //   chart.scale("value", {
    //     min: 0
    //   });
    //   chart.scale("year", {
    //     range: [0, 1]
    //   });
    //   chart.tooltip({
    //     crosshairs: {
    //       type: "line"
    //     }
    //   });
      chart.line().position("year*value");
      chart
        .point()
        .position("year*value")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    }
  }
};
</script>
