<template>
  <div class="discover">
    <el-tabs class="discover-tabs" type="border-card" v-model="state.activeName" @tab-click="handleClick">
      <el-tab-pane :name="DiscoverEnum.properties[DiscoverEnum.RECOMMEND].path">
        <template #label>
          <div class="head-title">{{ DiscoverEnum.properties[DiscoverEnum.RECOMMEND].title }}</div>
        </template>
        <Recommend />
      </el-tab-pane>
      <el-tab-pane :name="DiscoverEnum.properties[DiscoverEnum.SONG_LIST].path">
        <template #label>
          <div class="head-title">{{ DiscoverEnum.properties[DiscoverEnum.SONG_LIST].title }}</div>
        </template>
        <SongList />
      </el-tab-pane>
      <el-tab-pane :name="DiscoverEnum.properties[DiscoverEnum.RANKING_LIST].path">
        <template #label>
          <div class="head-title">{{ DiscoverEnum.properties[DiscoverEnum.RANKING_LIST].title }}</div>
        </template>
        <RankingList />
      </el-tab-pane>
      <el-tab-pane :name="DiscoverEnum.properties[DiscoverEnum.SINGER].path">
        <template #label>
          <div class="head-title">{{ DiscoverEnum.properties[DiscoverEnum.SINGER].title }}</div>
        </template>
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
</script>
<style lang="scss">
  .discover {
    height: 100%;
  }
</style>
