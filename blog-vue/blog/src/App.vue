<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <top-nav-bar></top-nav-bar>
    <side-nav-bar></side-nav-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SideNavBar from '@/components/layout/SideNavBar.vue'
export default {
  components: {
    TopNavBar,
    SideNavBar
  }
}
</script>
    SideNavBar
