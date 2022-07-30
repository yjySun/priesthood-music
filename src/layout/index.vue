<template>
  <div class="layout">
    <el-scrollbar>
      <div class="common-layout">
        <el-container style="height: 100%">
          <el-header height="55px">
            <Header />
          </el-header>
          <el-container>
            <el-aside>
              <AsideMenu />
            </el-aside>
            <el-main>
              <MainView />
            </el-main>
          </el-container>
          <el-footer>
            <PlayFooter />
          </el-footer>
        </el-container>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
  import { Header } from './components/Header/index'
  import { AsideMenu } from './components/Menu/index'
  import { PlayFooter } from './components/Footer/index'
  import { MainView } from './components/Main/index'
</script>
<style lang="scss">
  .layout {
    height: 100%;

    .el-header {
      padding: 0;
      margin: 0;
      background-color: #ec4141;
    }

    .el-aside {
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      border-right: 1px solid #cccccc;
    }

    .el-main {
      padding: 20px 0 0 0;
      position: relative;
    }

    .el-footer {
      padding: 0;
      margin: 0;
      height: 70px;
      border-top: 1px solid #ccc;
      box-sizing: border-box;
      background-color: #fff;
    }

    .common-layout {
      height: 100%;
      min-width: 1400px;
    }

    .el-scrollbar {
      width: 100%;
      height: 100%;

      .el-scrollbar__wrap.el-scrollbar__wrap--hidden-default .el-scrollbar__view {
        height: 100% !important;
      }
    }
  }
</style>
