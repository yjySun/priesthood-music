<template>
  <div class="aside-menu">
    <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @select="selectMenuItem">
      <MenuTree :menuOptions="state.menuOptions" />
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  import { PageEnum } from '@/enums/pageEnum'
  import { MenuOption } from './type'
  import { generatorDynamicMenu } from '@/router/generator-router'
  import MenuTree from './MenuTree.vue'

  const router = useRouter()
  const { proxy } = getCurrentInstance()

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME,
    menuOptions: []
  })

  onMounted(() => {
    getMenuList()
  })

  /**
   * @description: 获取菜单数据
   * @return {*}
   */
  const getMenuList = () => {
    generatorDynamicMenu().then((res) => {
      state.menuOptions = res
    })
  }

  const selectMenuItem = (index, indexPath) => {
    const CREATED_PATH = '/created'
    const COLLECTED_PATH = '/collected'
    const CREATED_ROUTER_NAME = '/created-playlist'
    const COLLECTED_ROUTER_NAME = '/collected-playlist'

    let indexNum = index.indexOf('/')
    indexNum = index.indexOf('/', indexNum + 1) //查询第二个'/'所在位置
    const idPath = index.slice(indexNum)
    const originalPath = index.slice(0, indexNum)

    if (indexNum !== -1 && (originalPath === CREATED_ROUTER_NAME || originalPath === COLLECTED_ROUTER_NAME)) {
      const pathName = originalPath === CREATED_ROUTER_NAME ? CREATED_PATH : COLLECTED_PATH
      router.push({ path: pathName + originalPath + idPath })
    } else {
      router.push({ path: index })
    }
  }

  watchEffect(() => {
    router.getRoutes().map((item, index) => {
      const currentPath = router.currentRoute.value.path
      const indexNum = currentPath.indexOf('/', 2)
      const activePath = currentPath.slice(0, indexNum)

      if (activePath === '/discover') {
        state.defaultActive = activePath
      } else {
        state.defaultActive = router.currentRoute.value.path
      }
    })
  })

  proxy.$bus.on('haveLogin', async () => {
    await getMenuList()
  })
</script>
<style lang="scss"></style>
