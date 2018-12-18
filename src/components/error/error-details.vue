<template>
  <div class="error-details">
    <div class="top">
      <div class="left">
        <div class="info">
          <h1>概要信息</h1>
          <div class="list">
            <div class="list-left">时间</div>
            <div class="list-right">{{details.created_at | date}}</div>
          </div>
          <div class="list">
            <div class="list-left">类型</div>
            <div class="list-right">{{details.error_type}}</div>
          </div>
          <div class="list">
            <div class="list-left">用户</div>
            <div class="list-right">{{details.m_user_id}}</div>
          </div>
          <div class="list">
            <div class="list-left">URL</div>
            <div class="list-right">
              <a :href="details.error_url" target="_blank">{{details.error_url}}</a>
            </div>
          </div>
        </div>

        <div class="info" v-for="(item, index) in details.real_error" :key="index">
          <h1>错误信息- {{index + 1}}</h1>
          <div class="list">
            <div class="list-left">名称</div>
            <div class="list-right">{{item.callee_short}}</div>
          </div>
          <div class="list">
            <div class="list-left">文件名称</div>
            <div class="list-right a">{{item.file_name}}</div>
          </div>
          <div class="list">
            <div class="list-left">行号</div>
            <div class="list-right">{{item.column}}</div>
          </div>
          <div class="list">
            <div class="list-left">列号</div>
            <div class="list-right">{{item.line }}</div>
          </div>
        </div>
      </div>
      <div class="right">


        <div class="info">
          <h1>设备信息</h1>
          <div class="list">
            <div class="list-left">浏览器</div>
            <div
              class="list-right"
              v-if="details.brower_info"
            >{{details.brower_info.browser_type}} - {{details.brower_info.browser_version}}</div>
          </div>
          <div class="list">
            <div class="list-left">微信</div>
            <div class="list-right" v-if="details.brower_info">{{details.brower_info.wechat}}</div>
          </div>
          <div class="list">
            <div class="list-left">操作系统</div>
            <div class="list-right" v-if="details.os_info">{{details.os_info.os_name}} - {{details.os_info.os_version}}</div>
          </div>
        </div>


        <div class="info">
          <h1>位置信息</h1>
          <div class="list">
            <div class="list-left">IP</div>
            <div class="list-right">{{details.ip}}</div>
          </div>
          <div class="list">
            <div class="list-left">地点</div>
            <div class="list-right"></div>
          </div>
          <div class="list">
            <div class="list-left">运营商</div>
            <div class="list-right"></div>
          </div>
        </div>

        <div class="info">
          <h1>其他信息</h1>
          
          <div class="list">
            <div class="list-left">userAgent</div>
            <div class="list-right">{{details.user_agent}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    details: {
      default: {}
    }
  },
  watch: {
    details(a) {
      console.log(a);
    }
  }
};
</script>
<style scoped lang='scss'>
.error-details {
  height: 100%;
  .top {
    display: flex;
    height: 100%;
    .left {
      flex: 1;
      height: 100%;
      margin-right: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      border-right: 1px solid #f2f3f3;
    }
    .right {
      width: 400px;
      height: 100%;
      
    }
  }

  .info {
    margin-bottom: 40px;
    font-size: 14px;
    & > h1 {
      color: #4a4a4a;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .list {
      border-bottom: 1px solid #f2f3f3;
      display: flex;
      padding: 6px;
      .list-left {
        width: 110px;
        color: #9d9da1;
        flex-shrink: 0;
      }
      .list-right {
        color: #4a4a4a;
      }
      .a{
        color: #564FC1;
        cursor: pointer;
      }
    }
  }
}
</style>
