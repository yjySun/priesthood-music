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
          <div class="hint">{{ state.hint }}</div>
          <div class="login-button">
            <el-button color="#ec4141" @click="handlePhoneLogin">登录</el-button>
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
  import { phoneLogin, getQRcodeKey, generateQRcode, checkQRcode } from '@/api/login'
  import { Lock } from '@element-plus/icons-vue'
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()

  const state = reactive(source())
  function source() {
    return {
      visible: false,
      phone: '',
      password: '',
      qrCode: '',
      qrLogin: true, //默认显示扫码登录
      qrCodeExpired: false,
      hint: ''
    }
  }

  onMounted(() => {})

  /**
   * @description: 生成二维码
   * @return {*}
   */
  const QRcode = () => {
    getQRcodeKey({ timestamp: new Date().getTime() }).then((res) => {
      let key = res.data.unikey

      generateQRcode({ key, qrimg: true, timestamp: new Date().getTime() }).then((res) => {
        state.qrCode = res.data.qrimg

        checkQRcodeStatus(key)
      })
    })
  }

  /**
   * @description: 定时检查二维码状态
   * @return {*}
   */
  const checkQRcodeStatus = (key) => {
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
        userStore.setIsLogin(true)
        // await this.getLoginStatus(statusRes.cookie)
        // localStorage.setItem('cookie', statusRes.cookie)
      }
    }, 2000)
  }

  const handlePhoneLogin = () => {
    if (!state.phone) {
      state.hint = '请输入手机号'
    } else if (!state.password) {
      state.hint = '请输入登录密码'
    } else {
      phoneLogin({ phone: state.phone, password: state.password, timestamp: new Date().getTime() }).then((res) => {
        console.log(res)
        if (res) {
          if (res.data.code === 200) {
            console.log('登陆成功')
            userStore.setIsLogin(true)
          } else if (res.data.code === 400) {
            state.hint = '手机号错误'
          } else if (res.data.code === 502) {
            state.hint = res.data.message
          } else {
            state.hint = '登录失败，请稍后重试'
          }
        } else {
          state.hint = '该手机号尚未注册'
        }
      })
    }
  }

  const open = () => {
    state.visible = true

    QRcode()
  }

  /**
   * @description: 重置数据
   * @return {*}
   */
  const reset = () => {
    const originalSource = source()
    for (let key in originalSource) {
      state[key] = originalSource[key]
    }
  }

  const close = () => {
    reset()
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

        .hint {
          margin-top: 10px;
          color: red;
          font-size: 12px;
          text-align: left;
        }
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
