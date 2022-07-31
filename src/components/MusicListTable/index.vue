<template>
  <div class="music-list-table">
    <el-table :data="state.musicList" size="mini" stripe highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="indexMethod" />
      <el-table-column label="操作" min-width="50">
        <div class="operate-button">
          <i class="iconfont icon-xihuan"></i>
          <i class="iconfont icon-download"></i>
        </div>
      </el-table-column>
      <el-table-column prop="name" label="标题" min-width="400" />
      <el-table-column prop="ar[0].name" label="歌手" min-width="150" />
      <el-table-column prop="al.name" label="专辑" min-width="200" />
      <el-table-column prop="dt" label="时间" min-width="80" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { prefixInteger } from '@/utils/number'

  const state = reactive({
    musicList: [
      {
        name: '1',
        ar: [
          {
            name: '周杰伦#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !#f9f9f9 !'
          }
        ],
        al: {
          name: '听妈妈的话'
        },
        dt: '03:50'
      },
      {
        name: '1',
        ar: [
          {
            name: '周杰伦'
          }
        ],
        al: {
          name: '听妈妈的话'
        },
        dt: '03:50'
      }
    ]
  })

  const indexMethod = (index) => {
    return prefixInteger(index + 1, 2)
  }
</script>
<style lang="scss">
  .music-list-table {
    .operate-button {
      i {
        cursor: pointer;
      }

      i.icon-download {
        margin-left: 10px;
      }
    }
  }
</style>
