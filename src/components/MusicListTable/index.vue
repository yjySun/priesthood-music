<template>
  <div class="music-list-table">
    <el-table
      :data="state.musicList"
      size="mini"
      stripe
      highlight-current-row
      style="width: 100%"
      @row-dblclick="handlePlayMusic"
    >
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
      <el-table-column prop="dt" label="时间" min-width="80" :formatter="formatterMusicTime" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watch, getCurrentInstance } from 'vue'
  import { prefixInteger } from '@/utils/number'
  import { getSongs } from '@/api/song'
  import { handleMusicTimeMS } from '@/utils'

  const { proxy } = getCurrentInstance()
  const emit = defineEmits(['completeLoading'])

  const state = reactive({
    trackIds: '',
    musicList: []
  })

  /**
   * @description: 接受歌曲ids
   * @return {*}
   */
  const getTrackIds = async (trackIds) => {
    state.trackIds = trackIds
    let trackIdsStr = ''

    trackIds.forEach((item, index) => {
      trackIdsStr = trackIdsStr.concat(item.id)

      if (index !== trackIds.length - 1) {
        trackIdsStr = trackIdsStr.concat(',')
      }
    })
    const res = await getSongs({ ids: trackIdsStr, timestamp: new Date().getTime() })
    state.musicList = res.songs
    emit('completeLoading')
  }

  /**
   * @description: 双击播放音乐
   * @param {*} row
   * @param {*} column
   * @param {*} event
   * @return {*}
   */
  const handlePlayMusic = (row, column, event) => {
    proxy.$bus.emit('handlePlayMusic', { profile: row, musicList: state.musicList })
  }

  /**
   * @description: 格式化音乐时间
   * @param {*} row
   * @param {*} column
   * @param {*} cellValue
   * @param {*} index
   * @return {*}
   */
  const formatterMusicTime = (row, column, cellValue, index) => {
    return handleMusicTimeMS(cellValue)
  }

  /**
   * @description: 序号格式化
   * @param {*} index
   * @return {*}
   */
  const indexMethod = (index) => {
    return prefixInteger(index + 1, 2)
  }

  defineExpose({
    getTrackIds
  })
</script>
<style lang="scss">
  .music-list-table {
    position: relative;
    width: 100%;
    height: 100%;

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
