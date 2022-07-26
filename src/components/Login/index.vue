<template>
  <div class="login-dialog" v-if="state.visible">
    <el-dialog
      v-model="state.visible"
      width="350px"
      draggable
      :destroy-on-close="true"
      @close="close"
      :close-on-click-modal="false"
    >
      <div v-if="state.qrLogin" class="scan-QRcode">
        <div class="title">扫码登录</div>
        <img class="qr-img" :src="state.qrCode" alt="" />
        <div>使用网易云音乐APP扫码登录</div>
        <div v-if="state.qrCodeExpired" class="mask">
          <div class="mask-title">二维码已失效</div>
          <div class="mask-button">
            <el-button type="primary">点击刷新</el-button>
          </div>
        </div>
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
  import { reactive, ref, defineExpose, onMounted } from 'vue'
  import { getQRcodeKey, generateQRcode, checkQRcode } from '@/api/login'
  import { Lock } from '@element-plus/icons-vue'

  const state = reactive({
    visible: false,
    phone: '',
    password: '',
    qrCode: '',
    qrLogin: true, //默认显示扫码登录
    qrCodeExpired: false
  })

  onMounted(() => {})

  const QRcode = () => {
    getQRcodeKey({ timestamp: new Date().getTime() }).then((res) => {
      let key = res.data.unikey

      generateQRcode({ key, qrimg: true, timestamp: new Date().getTime() }).then((res) => {
        state.qrCode = res.data.qrimg

        //定时检查二维码状态
        const timer = setInterval(async () => {
          const statusRes = await checkQRcode({ key, timestamp: new Date().getTime() })

          if (statusRes.code === 800) {
            state.qrCodeExpired = true
            clearInterval(timer)
          }
          if (statusRes.code === 803) {
            console.log('等成功', statusRes.code)

            // 这一步会返回cookie
            clearInterval(timer)
            alert('授权登录成功')
            // await this.getLoginStatus(statusRes.cookie)
            // localStorage.setItem('cookie', statusRes.cookie)
          }
        }, 2000)
      })
    })
  }

  const open = () => {
    state.visible = true

    QRcode()
  }

  const close = () => {
    state.visible = false
    state.phone = ''
    state.password = ''
    state.qrCode = ''
    state.qrLogin = true
    state.qrCodeExpired = false
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

      .mask {
        position: absolute;
        top: 135px;
        left: 100px;
        height: 149px;
        width: 150px;
        background-color: rgba($color: #000000, $alpha: 0.8);
        padding-top: 40px;
        box-sizing: border-box;
        color: #ffffff;

        .mask-button {
          margin-top: 10px;
        }
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
