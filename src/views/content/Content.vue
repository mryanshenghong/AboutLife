<template>
  <div v-loading="!hasContent">
    <div class="content-header">
      <div>
        <span>Tags:</span>
        <el-tag
          @close="handleClose(tag)"
          :disable-transitions="false"
          :closable="canEdit"
          size="small"
          type="info"
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
        >{{ tag }}</el-tag>
        <div
          class="edit-tag-box"
          v-if="canEdit"
        >
          <el-input
            class="new-tag-input"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="mini"
            @click="showInput"
          >+ New Tag</el-button>
        </div>
      </div>
      <div v-if="userInfo.role === 0">
        <el-button
          @click="toggleEdit"
          class="edit-btn"
          size="mini"
        >
          {{ $t('message.content.edit') }}
        </el-button>
      </div>
    </div>
    <Markdown
      :showToolBars="showToolBars"
      :canEdit="canEdit"
      v-loading="loading"
      :isSubField="isSubField"
      @saveContent="saveContent"
      :content="content"
    ></Markdown>
  </div>
</template>

<script>
const Markdown = (resolve) => require.ensure([], () => resolve(require('../../components/MarkDown.vue')), 'MarkDown')
// import { getBlog, saveBlog } from '@/api/blog'
import { mapGetters } from 'vuex'
export default {
  name: 'blogContent',
  data () {
    return {
      content: '',
      tags: [],
      allInfo: '',
      hasContent: false,
      loading: false,
      canEdit: false,
      showToolBars: false,
      isSubField: false,
      inputVisible: false,
      inputValue: '',
    }
  },
  components: {
    Markdown,
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    saveContent (content) {
      const { id } = this.$route.params
      const { token } = localStorage
      if (id && token) {
        saveBlog(
          {
            ...this.allInfo,
            content: content,
          },
          token
        )
          .then((res) => {
            // 写逻辑 判断成功保存没有
            if (res.data.code === 200) {
              this.getBlog()
              this.$message({
                message: 'save successfully!',
                type: 'success',
              })
            } else {
              this.$message({
                message: 'save failed',
                type: 'error',
              })
            }
          })
          .catch((err) => {
            this.$message({
              message: 'Can not save blog',
              type: 'error',
            })
          })
      } else {
        this.$message({
          message: 'No blog id',
          type: 'error',
        })
      }
    },
    toggleEdit () {
      this.canEdit = !this.canEdit
      this.showToolBars = !this.showToolBars
      this.isSubField = !this.isSubField
    },
    getBlog () {
      let id = this.$route.params.id
      this.loading = true
      getBlog(id)
        .then((res) => {
          this.content = res.data.result.content
          this.tags = res.data.result.tags
          this.allInfo = res.data.result
          this.hasContent = true
          this.loading = false
        })
        .catch((err) => {
          this.$router.push('/blog')
          throw new Error('Get blog failed' + err)
        })
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
  mounted () {
    // this.getBlog()
  },
  // deactivated() {
  //   this.content = ''
  // }
}
</script>
<style lang="scss" scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  .edit-tag-box {
    display: inline-block;
    .new-tag-input {
      width: 100px;
    }
    .button-new-tag {
      margin: 0 10px;
    }
  }
  .edit-btn {
    color: rgba(0, 0, 0, 0.7);
    background-color: #f2f3f7;
    border-color: #f2f3f7;
  }
  .tag {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
