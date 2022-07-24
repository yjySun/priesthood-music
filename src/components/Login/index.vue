<template>
  <div class="login-dialog">
    <el-dialog v-model="state.visible" width="350px" draggable destroy-on-close @close="close">
      <div v-if="state.qrLogin" class="scan-QRcode">
        <div class="title">扫码登录</div>
        <img class="qr-img" :src="state.qrCode" alt="" />
      </div>

      <div v-else class="phone-login">
        <i class="iconfont icon-priesthood-music-logo"></i>
        <div class="account">
          <el-input v-model="state.phone" placeholder="请输入手机号" class="input-phone">
            <template #prepend>
              <span>+86</span>
            </template>
          </el-input>
          <el-input
            v-model="state.password"
            placeholder="请输入密码"
            type="password"
            show-password
            class="input-password"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
          <div class="login-button">
            <el-button color="#ec4141">登录</el-button>
          </div>
        </div>
      </div>

      <div class="choose-other">
        <span @click="state.qrLogin = !state.qrLogin"> 选择其他登录模式 > </span>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, defineExpose, onMounted } from 'vue'
  import { getQRcodeKey, generateQRcode } from '@/api/login'
  import { Lock } from '@element-plus/icons-vue'

  const state = reactive({
    phone: '',
    password: '',
    visible: false,
    qrLogin: true, //默认显示扫码登录
    qrCode: ''
  })

  onMounted(() => {})

  const QRcode = () => {
    getQRcodeKey().then((res) => {
      let key = res.data.data.unikey

      generateQRcode({ key, qrimg: true }).then((res) => {
        state.qrCode = res.data.data.qrimg
      })
    })
  }

  const open = () => {
    state.visible = true

    QRcode()
  }

  const close = () => {
    state.qrLogin = true
    state.phone = ''
    state.password = ''
  }

  defineExpose({
    open
  })
</script>
<style lang="scss">
  .login-dialog {
    position: relative;
    .scan-QRcode {
      .title {
        font-size: 30px;
      }

      .qr-img {
        margin-top: 20px;
      }
    }

    .phone-login {
      .icon-priesthood-music-logo {
        color: #ec4141;
        font-size: 80px;
      }

      .account {
        margin-top: 50px;
      }

      .login-button {
        margin-top: 40px;
      }
    }

    .choose-other {
      position: absolute;
      bottom: 50px;
      left: 115px;

      span {
        cursor: pointer;
      }
    }
  }
</style>
