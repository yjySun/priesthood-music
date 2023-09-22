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
        <template #default="scope">
          <div class="operate-button">
            <i
              :class="{
                iconfont: true,
                'icon-xihuan': !hasLikeMusic(scope.row.id),
                'icon-hasxihuan': hasLikeMusic(scope.row.id)
              }"
              @click="handleLikeMusic(scope.row.id)"
            ></i>
            <i class="iconfont icon-download" @click="downloadSong(scope.row.id)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="400">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
          <span class="alia" v-for="(item, index) in scope.row.alia" :key="index"> （{{ item }}） </span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" min-width="150" />
      <el-table-column prop="al.name" label="专辑" min-width="200" />
      <el-table-column prop="dt" label="时间" min-width="80" :formatter="formatterMusicTime" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watch, getCurrentInstance } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/store/modules/user'
  import { useMusicStore } from '@/store/modules/music'
  import { prefixInteger } from '@/utils/number'
  import { getSongs, getSongDownloadUrl } from '@/api/song'
  import { likeMusic, getUserLikeList } from '@/api/user'
  import { handleMusicTimeMS } from '@/utils'
  import { storage } from '@/utils/Storage'
  import { IS_LOGIN, USER_ID } from '@/store/mutation-types'

  const { proxy } = getCurrentInstance()
  const emit = defineEmits(['completeLoading'])
  const userStore = useUserStore()
  const musicStore = useMusicStore()
  const { getLikeList } = storeToRefs(userStore)

  const state = reactive({
    trackIds: '',
    musicList: [],
    likeList: !!getLikeList ? getLikeList : '' //喜欢的音乐id
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
    const res = await getSongs(trackIdsStr, new Date().getTime())
    state.musicList = res.songs

    emit('completeLoading', state.musicList)
  }

  /**
   * @description: 接收传入过来的每日推荐的歌曲
   * @param {*} songs
   * @return {*}
   */
  const getDailyPlayList = (songs) => {
    state.musicList = songs
  }

  /**
   * @description: 双击播放音乐
   * @param {*} row
   * @param {*} column
   * @param {*} event
   * @return {*}
   */
  const handlePlayMusic = (row, column, event) => {
    musicStore.setProfile(row)
    //进行深拷贝，目的为了解决state.musicList赋值给store存储了，store中的值改变时state.musicList值也会改变
    const musicList = JSON.parse(JSON.stringify(state.musicList))
    musicStore.setPlayList(musicList)
    proxy.$bus.emit('handlePlayMusic')
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

  /**
   * @description: 判断音乐是否被用户喜欢
   * @param {*} id
   * @return {*}
   */
  const hasLikeMusic = (id): boolean => {
    if (!state.likeList) {
      return false
    }

    return state.likeList.includes(id)
  }

  /**
   * @description: 用户喜欢某个音乐
   * @return {*}
   */
  const handleLikeMusic = async (id): void => {
    if (!storage.get(IS_LOGIN)) {
      console.log('用户未登录')
      return
    }
    //此歌曲是否已经被喜欢
    const hasLike = hasLikeMusic(id) ? false : true
    const res = await likeMusic(id, hasLike, new Date().getTime())
    if (res.code === 200) {
      const msg = hasLike ? '已添加到我喜欢的音乐' : '取消喜欢成功'

      //更新喜欢列表ids
      /**
       * @description: 并没有使用getCurrentUserLikeList(), 做一个前端假的显示。目的：提升心变成红色速度，少一次接口访问
       */
      const likeList = getLikeList.value
      if (hasLike) {
        //添加id
        likeList.push(id)
      } else {
        //删除id
        const del_index = likeList.indexOf(id)
        likeList.splice(del_index, 1)
      }
      userStore.setLikeList(likeList)
    }
  }

  /**
   * @description: 获取用户喜欢的音乐id
   * @return {*}
   */
  const getCurrentUserLikeList = async () => {
    const res = await getUserLikeList(storage.get(USER_ID), new Date().getTime())
    if (res.code === 200) {
      userStore.setLikeList(res.ids)
    } else {
      console.log('获取用户喜欢的音乐失败')
    }
  }

  /**
   * @description: 下载歌曲
   * @param {*} id
   * @return {*}
   */
  const downloadSong = async (id) => {
    const res = await getSongDownloadUrl(id, new Date().getTime())
    if (res.code === 200) {
      let url = res.data.url
      //todo 跨域下载歌曲
    } else {
      console.log('下载歌曲失败')
    }
  }

  defineExpose({
    getTrackIds,
    getDailyPlayList
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

      .icon-xihuan:hover,
      .icon-download:hover {
        color: rgb(0, 0, 0);
      }

      i.icon-hasxihuan {
        color: #ec4141;
      }

      i.icon-download {
        margin-left: 10px;
      }
    }

    .alia {
      color: #9f9f9f;
    }
  }
</style>
