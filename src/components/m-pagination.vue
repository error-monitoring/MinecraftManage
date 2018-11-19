<!--公用组件
/**
* 组件名称：统一的分页组件
* @module 
* @desc 统一的分页组件
* @author 文全
* @date 2018年08月16日17:22:43
* @param {Object} [value] - 双向绑定 返回选择的时间 返回对象 page_number: 1,page_size: 10
* @param {Number} [total] - 总页数
* @param {function} [funcName] - 改变分页 回调上级的函数名
* @param {Boolean} [isAction] - 是否调用上级方法
* @example 调用示例
*  <pagination v-model="params" :total="total"></pagination>
  */
-->


<template>
  <div class="pagination">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_number" :page-sizes="[10, 20, 50, 100]" :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  // import pagination from '../mixin/pagination'
  export default {
    name: 'pagination',
    props: {
      value: {
        type: Object
      },
      total: {
        type: Number,
        default: 0
      },
      funcName: {
        type: String,
        default: "getList"
      },
      isAction: {
        type: Boolean,
        default: false
      },
      hasParent: {
        type: Boolean,
        default: false
      },
      action: {
        type: Function,
        default: function() {}
      }
  
    },
    data() {
      return {
        page_number: 1,
        page_size: 20,
      }
    },
    mounted() {
      if (this.value.page_number) {
        this.page_number = this.value.page_number
      }
      if (this.value.page_size) {
        this.page_size = this.value.page_size
      }
  
      this.$emit('input', Object.assign(this.value, {
        page_number: this.page_number,
        page_size: this.page_size
      }))
  
  
    },
    methods: {
      handleSizeChange(val) {
        this.page_size = val
        this.$emit('input', Object.assign(this.value, {
          page_number: this.page_number,
          page_size: this.page_size
        }))
        this.getFunc()
      },
      handleCurrentChange(val) {
        this.page_number = val
        this.$emit('input', Object.assign(this.value, {
          page_number: this.page_number,
          page_size: this.page_size
        }))
        this.getFunc()
      },
      getFunc() {
        if (this.action) {
          this.action()
          return
        }
        if (this.isAction) {
          this.$emit('action')
        } else {
          if (this.hasParent) {
            if (this.$parent.$parent[this.funcName]) {
              this.$parent.$parent[this.funcName]()
            } else {
              throw new Error(`${this.funcName}方法不存在`)
            }
          } else {
            if (this.$parent[this.funcName]) {
              this.$parent[this.funcName]()
            } else {
              throw new Error(`${this.funcName}方法不存在`)
            }
          }
        }
  
      }
    }
  }
</script>

<style scoped>
  
</style>
