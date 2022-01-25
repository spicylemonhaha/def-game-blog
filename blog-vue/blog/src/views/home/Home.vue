<template>
  <div>
    <!-- 主页文章 -->
    <v-row class="home-container">
      <v-col md="9" cols="12">
        <v-card
          class="animated zoomIn article-card rounded-sm"
          v-for="item of articleList"
          :key="item.id"
        >
          <!-- 文章封面图 -->
          <div class="article-cover rounded-sm">
            <router-link :to="'/articles/' + item.id">
              <v-img
                class="on-hover"
                width="100%"
                height="100%"
                :src="item.articleCover"
              />
            </router-link>
          </div>
          <!-- 文章信息 -->
          <div class="article-wrapper">
            <div style="line-height: 1.4;font-weight: bold">
              <router-link :to="'/articles/' + item.id">
                {{ item.articleTitle }}
              </router-link>
            </div>
            <div class="article-info">
              <!-- 是否置顶 -->

              <!-- 发表时间 -->
              <v-icon size="14">mdi-calendar-month-outline</v-icon>
              {{ item.createTime  }}
              <span class="separator">|</span>
              <!-- 文章分类 -->
              <router-link :to="'/categories/' + item.categoryId">
                <v-icon size="14">mdi-inbox-full</v-icon>
                {{ item.categoryName }}
              </router-link>
              <span class="separator">|</span>
              <!-- 文章标签 -->
              <router-link
                style="display: inline-block"
                :to="'/tags/' + tag.id"
                class="mr-1"
                v-for="tag of item.tagDTOList"
                :key="tag.id"
              >
                <v-icon size="14">mdi-tag-multiple</v-icon>{{ tag.tagName }}
              </router-link>
            </div>
            <!-- 文章内容 -->
            <div class="article-content">
              {{ item.articleContent }}
            </div>
          </div>
        </v-card>
        <!-- 无限加载
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more" />
        </infinite-loading> -->
      </v-col>
      <!-- 博主信息 -->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div class="blog-wrapper">
          <v-card class="animated zoomIn blog-card ">
            <!-- 收藏按钮 -->
            <div class="blog-message">
              <div style="font-size:24px;font-weight:bold;color:#17A1FF">Def·Game</div>
              <div style="font-size:18px">算法游乐场</div>
              <div style="font-size:14px;color:#A9A0A9">关于我们</div>
            </div>
            <a class="collection-btn" @click="tip = true">
              <v-icon color="#fff" size="18" class="mr-1">mdi-bookmark</v-icon>
              加入书签
            </a>
          </v-card>
          <!-- 网站信息 -->
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="web-info-title">
              <v-icon size="18">mdi-checkbox-outline</v-icon>
              公告
            </div>
            <div style="font-size: 0.875rem">
              博客上线，欢迎大家进来占沙发，源码在我的github
            </div>
          </v-card>
          <!-- 网站信息 -->
          <v-card class="blog-card animated zoomIn mt-5">
            <div class="web-info-title">
              <v-icon size="18">mdi-chart-line</v-icon>
              网站资讯
            </div>
            <div class="web-info">
              <div style="padding: 4px 0 0">
                运行时间:<span class="float-right">{{ time }}</span>
              </div>
              <div style="padding: 4px 0 0">
                总访问量:<span class="float-right">
                  {{ blogInfo.viewsCount }}
                </span>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- 提示消息 -->
    <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar>
  </div>
</template>

<script>
export default {
  created() {
    this.getBlogInfo()
    this.timer = setInterval(this.runTime, 1000)
    this.infiniteHandler()
  },
  data: function () {
    return {
      tip: false,
      time: '',
      obj: {
        output: '',
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true
      },
      articleList: [],
      blogInfo: {},
      current: 1
    }
  },
  methods: {
    getBlogInfo() {
      this.axios.get('/api/').then(({ data }) => {
        this.blogInfo = data.data
        // this.$store.commit('checkBlogInfo', data.data)
      })
    },
    infiniteHandler($state) {
      const md = require('markdown-it')()
      this.axios
        .get('/api/articles', {
          params: {
            current: this.current
          }
        })
        .then(({ data }) => {
          if (data.data.length) {
            // 去除markdown标签
            data.data.forEach((item) => {
              item.articleContent = md
                .render(item.articleContent)
                .replace(/<\/?[^>]*>/g, '')
                .replace(/[|]*\n/, '')
                .replace(/&npsp;/gi, '')
            })
            this.articleList.push(...data.data)
            this.current++
            // $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.blog-contact a {
  color: #fff !important;
}
.card-info-social {
  line-height: 40px;
  text-align: center;
  font-size: 1.5rem;
  margin: 6px 0 -6px;
}
.article-wrapper {
  font-size: 14px;
}
@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }
  .blog-intro {
    font-size: 1.5rem;
  }
  .blog-contact {
    display: none;
  }
  .home-container {
    max-width: 1000px;
    margin: 0 auto 28px auto;
    padding: 0 5px;
  }
  .article-card {
    display: flex;
    align-items: center;
    height: 230px;
    width: 100%;
    /* margin-top: 20px; */
  }
  .article-cover {
    overflow: hidden;
    height: 45%;
    width: 25%;
    order: 1;
    margin-left: 35px;
  }
  .article-wrapper {
    padding: 0 2.5rem;
    width: 65%;
  }
  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
  .blog-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8px;
  }
}
@media (max-width: 759px) {
  .blog-title {
    font-size: 26px;
  }
  .blog-contact {
    font-size: 1.25rem;
    line-height: 2;
  }
  .home-container {
    width: 100%;
    margin: 0 auto 0 auto;
  }
  .article-card {
    margin-top: 1rem;
  }
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }
  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }
  .article-wrapper {
    padding: 1.25rem 1.25rem 1.875rem;
  }
  .article-wrapper a {
    font-size: 1.25rem;
    transition: all 0.3s;
  }
}
.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.scroll-down i {
  font-size: 2rem;
}
.article-wrapper a:hover {
  color: #17A1FF;
}
.article-info {
  font-size: 95%;
  color: #858585;
  line-height: 2;
  margin: 0.375rem 0;
}
.article-info a {
  font-size: 95%;
  color: #858585 !important;
}
.article-content {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.blog-wrapper {
  position: sticky;
  top: 68px !important;
}
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}
.author-wrapper {
  text-align: center;
}
.blog-info-wrapper {
  display: flex;
  justify-self: center;
  padding: 0.875rem 0;
}
.blog-info-data {
  flex: 1;
  text-align: center;
}
.blog-info-data a {
  text-decoration: none;
}
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  transition-duration: 1s;
  transition-property: color;
}
.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: '';
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
.web-info {
  padding: 0.25rem;
  font-size: 0.875rem;
}
.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
.big i {
  color: #17A1FF;
  animation: big 0.8s linear infinite;
}
@keyframes big {
  0%,
  100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>
