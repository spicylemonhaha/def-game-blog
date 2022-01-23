<template>
  <v-navigation-drawer app v-model="drawer" width="220" right>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem;font-weight: bold;">文章</div>
          <div style="font-size: 1.125rem;">
            25
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/categories">
          <div style="font-size: 0.875rem;font-weight: bold;">分类</div>
          <div style="font-size: 1.125rem">
            3
          </div>
        </router-link>
      </div>
    </div>
    <hr />
    <div class="menu-container">
      <div v-for="item in menus" :key="item.id" class="menus-item">
        <router-link :to="item.url">
          <i class="iconfont" :class="item.icon" /> {{ item.message }}
        </router-link>
      </div>
    </div>
  </v-navigation-drawer>
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
  computed: {
    drawer: {
      set(value) {
        this.$store.state.drawer = value
      },
      get() {
        return this.$store.state.drawer
      }
    }
  }
}
</script>

<style scoped>
.blog-info-wrapper {
  display: flex;
  align-items: center;
  padding: 12px 10px 0;
}
.blog-info-data {
  flex: 1;
  line-height: 2;
  text-align: center;
}
hr {
  border: 2px dashed #d2ebfd;
  margin: 20px 0;
}
.menu-container {
  padding: 0 10px 40px;
  animation: 0.8s ease 0s 1 normal none running sidebarItem;
}
.menus-item a {
  padding: 6px 30px;
  display: block;
  line-height: 2;
}
.menus-item i {
  margin-right: 2rem;
}
</style>
