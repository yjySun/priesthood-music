<template>
  <div class="discover">
    <el-tabs v-model="state.activeName" class="discover-tabs" @tab-click="handleClick">
      <el-tab-pane
        :label="DiscoverEnum.properties[DiscoverEnum.RECOMMEND].title"
        :name="DiscoverEnum.properties[DiscoverEnum.RECOMMEND].path"
      >
        <Recommend />
      </el-tab-pane>
      <el-tab-pane
        :label="DiscoverEnum.properties[DiscoverEnum.SONG_LIST].title"
        :name="DiscoverEnum.properties[DiscoverEnum.SONG_LIST].path"
      >
        <SongList />
      </el-tab-pane>
      <el-tab-pane
        :label="DiscoverEnum.properties[DiscoverEnum.RANKING_LIST].title"
        :name="DiscoverEnum.properties[DiscoverEnum.RANKING_LIST].path"
      >
        <RankingList />
      </el-tab-pane>
      <el-tab-pane
        :label="DiscoverEnum.properties[DiscoverEnum.SINGER].title"
        :name="DiscoverEnum.properties[DiscoverEnum.SINGER].path"
      >
        <Singer />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { DiscoverEnum } from './discoverEnum'
  import Recommend from './recommend/index.vue'
  import SongList from './song-list/index.vue'
  import RankingList from './ranking-list/index.vue'
  import Singer from './singer/index.vue'

  const router = useRouter()

  const state = reactive({
    activeName: DiscoverEnum.properties[DiscoverEnum.RECOMMEND].path
  })

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    state.activeName = tab.paneName
    router.push({
      path: tab.paneName //目标路由地址
    })
  }

  const generatePane = () => {
    moduleRoutes.forEach((item) => {})
  }
</script>
<style lang="scss">
  .discover {
    background-color: #03776a;
    // width: 100%;
    height: 100%;
  }
</style>
