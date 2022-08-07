<template>
  <div class="lyric-drawer">
    <el-drawer v-model="state.visible" :with-header="false" direction="btt">
      <div class="major">
        <div class="lyric">
          <div class="phonograph">
            <div class="needle">
              <img src="@/assets/img/needle.png" alt="" />
            </div>
            <div class="optical-disc">
              <img src="@/assets/img/disc.png" alt="" />
            </div>
          </div>
          <div class="lyric-scroll">
            <div class="title"></div>
            <div class="lyric-content"></div>
          </div>
        </div>
        <div class="comment">评论部分</div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'

  const state = reactive({
    visible: false
  })

  const open = (visible) => {
    state.visible = !state.visible
  }

  defineExpose({
    open
  })
</script>
<style lang="scss">
  .lyric-drawer {
    .major {
      display: flex;
      align-items: center;
      flex-direction: column;

      .phonograph {
        .needle {
          img {
            width: 150px;
            height: 150px;
          }
        }
        .optical-disc {
          img {
            width: 400px;
            height: 400px;
          }
        }
      }
    }
  }
</style>
