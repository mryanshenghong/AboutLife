<template>
  <div class="footer">
    <el-row>
      <el-col>
        <div class="email">
          ©2020<a href="mailto:mryanshenghong@gamil.com"
            >&nbsp; Shenghong Yan</a
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/styles/webfont/cerepf/mainFont.css";
@import "~@/styles/consts.scss";
@import "~@/styles/font/iconfont.css";

.footer {
  .footer-nav {
    display: inline-block;
    padding: 0 20px 0 0;
    line-height: 38px;
    a {
      text-decoration: none;
      color: black;
      font-weight: 700;
    }
  }
  .flex-left {
    display: flex;
    justify-content: flex-start;
    opacity: 0;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-weight: 700;
    .first-letter {
      font-size: 30px;
      color: #000;
    }
    .reset-letter {
      background: #000;
      color: #fff;
    }
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    line-height: 38px;
    .iconfont {
      font-weight: normal;
    }
  }
  .email {
    display: flex;
    justify-content: center;
    line-height: 38px;
    a {
      padding: 0 0 0 5px;
      text-decoration: none;
      color: black;
      font-weight: 700;
    }
  }
}
</style>
