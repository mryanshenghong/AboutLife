<template>
  <!-- 
    footer 分为两行 第一行 三列  左边为 nav导航 中间为 小号logo 右边为social connect
                   第二行 一列 个人邮箱
 -->
  <div class="footer">
    <el-row>
      <el-col :span="8">
        <div class="flex-left">
          <p class="footer-nav"><a href="">Anything</a></p>
          <p class="footer-nav"><a href="">Music</a></p>
          <p class="footer-nav"><a href="">Dota</a></p>
          <p class="footer-nav"><a href="">Bambi</a></p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-center">
          <h2 class="main-font first-letter">A</h2>
          <h2 class="main-font reset-letter">BOUT LIFE</h2>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flex-right">
          <p class="footer-nav">
            <a href="https://github.com/mryanshenghong">
              <i class="iconfont iconsocialgithub"></i>
            </a>
          </p>
          <p class="footer-nav">
            <a href="http://www.linkedin.com/in/shenghongyan">
              <i class="iconfont iconsociallinkedin"></i>
            </a>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="email">©2020<a href="mailto:mryanshenghong@gamil.com">&nbsp; Shenghong Yan</a></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/styles/webfont/cerepf/mainFont.css';
@import '~@/styles/consts.scss';
@import '~@/styles/font/iconfont.css';

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
