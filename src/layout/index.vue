<template>
  <div class="layout">
    <el-scrollbar>
      <div class="common-layout">
        <el-container style="height: 100%">
          <el-header>Header</el-header>
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
  import { AsideMenu } from './components/Menu/index'
  import { PlayFooter } from './components/Footer/index'
  import { MainView } from './components/Main/index'
</script>
<style lang="scss">
  .layout {
    height: 100%;

    .el-header {
      background-color: #ec4141;
    }

    .el-aside {
      background-color: rgb(76, 0, 255);
    }

    .el-footer {
      background-color: green;
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
