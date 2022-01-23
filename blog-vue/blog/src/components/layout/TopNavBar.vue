<template>
  <v-app-bar app height="55" color="white" flat>
    <div class="d-md-none nav-mobile-container">
      <div style="font-size: 18px;font-weight: bold;color:#17A1FF">Def·Game</div>
      <div style="margin-left: auto">
        <a @click="openDrawer" style="margin-right: 5px; font-size: 20px">
          <i class="iconfont icon-caidan" style="font-size: 22px"></i>
        </a>
      </div>
    </div>
    <div class="d-md-block d-none nav-container">
      <div class="float-left blog-title">
        <router-link style="color:#17A1FF" to="/">
          Def·Game
        </router-link>
      </div>
      <div class="float-right nav-title">
        <div v-for="item in menus" :key="item.id" class="menus-item">
          <router-link :to="item.url">
            <i class="iconfont" :class="item.icon" /> {{item.message}}
          </router-link>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          url: '/',
          icon: 'icon-shouye-shouye',
          message: '首页'
        },
        {
          id: 2,
          url: '/categories',
          icon: 'icon-fenlei',
          message: '分类'
        },
        {
          id: 3,
          url: '/archives',
          icon: 'icon-guidang',
          message: '归档'
        },
        {
          id: 4,
          url: '/message',
          icon: 'icon-liuyan',
          message: '留言'
        },
        {
          id: 5,
          url: '/links',
          icon: 'icon-icon_xinyong_xianxing_jijin-',
          message: '友链'
        }
      ]
    }
  },
  methods: {
    openDrawer() {
      this.$store.state.drawer = true
    }
  }
}
</script>
<style scoped>
i {
  margin-right: 4px;
}
ul {
  list-style: none;
}
/* 手机端样式 */
.nav-mobile-container {
  width: 100%;
  display: flex;
  align-items: center;
}
/* 博客标题和导航列表 */
.nav-container {
  font-size: 14px;
  width: 100%;
  height: 100%;
}
.blog-title {
  margin-left: 10px;
}
.blog-title,
.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}
.blog-title a {
  font-size: 20px;
  font-weight: bold;
}
.menus-item {
    position: relative;
  display: inline-block;
  margin-right: 0.875rem;
}
.menus-item a {
  transition: all 0.2s;
}
.menus-item a:hover:after {
  /* width: 100%; */
  opacity: 1;
}
.menus-item a:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: -1;
  width: 100%;
  opacity: 0;
  height: 2px;
  background-color: #17A1FF;
  content: "";
  transition: all 0.3s ease-in-out;
}

</style>
