/*
* 【上传文件】：支持各种格式，支持 antd 官网提供的3种基本样式
* disabled[props]：状态（true 代表预览 | false 代表需要上传）
* value[props]：文件列表（v-mode 绑定）
* len[props]：最大上传文件数量（默认 10）
* coverLen[props]：上传数量达到这个值时，隐藏上传按钮（默认 10，常用于封面图片上传）
* size[props]：文件大小限制（默认 10M）
* text[props]：上传文件文字（默认 上传文件）
* multiple[props]：是否支持多选（默认 不支持）
* accept[props]：上传文件格式（默认 .jpg,.jpeg,.png）
* intution[props]：底部说明文字（默认 只支持上传 .jpg .jpeg .png 格式）
* showUploadList[props]：是否展示文件列表（一般在只需要上传成功提示，而不展示文件列表时使用）"
* listType[props]：上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card(默认)（注意如果     listType != 'picture-card' 时，就不要设置 uploadClass 了）
* uploadClass[props]：外框class（主要是 listType = 'picture-card' 时，设置上传按钮宽高）
* 通过定义 uploadClass 来设置上传文件按钮的宽高（默认外框 宽*高=104*104， 注意：新开一个 style 标签，去掉 scoped 属性）

比如：<UploadFile v-model="fileList" upload-class="upload-wrap" />
.upload-wrap {
  $w: 300px;
  $h: 140px;
  .ant-upload {
    width: $w;
    height: $h;
  }
  .ant-upload-list-picture-card-container {
    width: $w;
    height: $h;
  }
  .ant-upload-list-item {
    width: $w;
    height: $h;
  }
}

* 引入方式：import UploadFile from '@/components/upload/index'
* 调用方式：
* <UploadFile
    v-model="文件列表"
    listType="上传列表的内建样式"
    uploadClass="外框class"
    disabled="预览 | 上传"
    text="上传文件文字"
    len="最大上传文件数量"
    coverLen="上传数量达到最大值时，隐藏上传按钮"
    size="文件大小限制"
    accept="上传文件格式限制"
    intution="底部说明文字"
    show-upload-list="是否展示文件列表"
  />
*/
<template>
  <div class="display-inline-block">
    <a-upload
      action="/volunteer/upload"
      :class="uploadClass"
      :multiple="multiple"
      :accept="accept"
      :headers="{sessionid}"
      :list-type="listType"
      :file-list="fileList"
      :disabled="disabled"
      :show-upload-list="showUploadList"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="!disabled && fileList.length < coverLen">
        <div v-if="listType === 'picture-card'">
          <div>
            <a-icon :type="loading ? 'loading' : 'plus'" class="fs-30" />
            <div class="ant-upload-text">{{ text }}</div>
          </div>
        </div>
        <div v-else>
          <a-button>
            <a-icon :type="loading ? 'loading' : 'upload'" />{{ text }}
          </a-button>
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage">
    </a-modal>
    <div v-if="!disabled && showUploadList">
      <p v-if="listType === 'text'" :class="{'p-t-8': listType !== 'picture-card'}">{{ intutionText }}</p>
      <p v-else :class="{'p-t-8': listType !== 'picture-card'}">{{ intutionText }}</p>
    </div>
  </div>
</template>
<script>
import { session } from '@/utils'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    len: {
      type: Number,
      default: 10
    },
    coverLen: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 10
    },
    text: {
      type: String,
      default: '上传文件'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.jpg, .jpeg, .png'
    },
    intution: {
      type: String,
      default: ''
    },
    uploadClass: {
      type: String,
      default: ''
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      previewVisible: false,
      loading: false,
      isUndefined: false,
      previewImage: '',
      intutionText: '请上传',
      sessionid: session.getSession('sessionid'),
      fileList: []
    }
  },
  watch: {
    value: {
      handler () {
        this.fileListInit()
      },
      immediate: true
    }
  },
  methods: {
    // 初始化
    fileListInit () {
      if (this.intution) {
        this.intutionText = this.intution
      } else {
        this.intutionText = `请上传 ${this.accept} 格式，最多上传 ${this.len} 个`
      }
      if (!this.value.length) return
      this.value.forEach((item) => {
        if (item === undefined) {
          this.isUndefined = true
        }
      })
      if (this.isUndefined) return
      this.value.forEach((item, index) => {
        const site = item.lastIndexOf('/')
        const name = item.substring(site + 1, item.length)
        this.fileList.push({
          uid: Math.random(),
          name: name,
          status: 'done',
          url: item,
          size: this.size * 1024 * 1024
        })
      })
    },

    // 关闭预览
    handleCancel () {
      this.previewVisible = false
    },

    // 上传文件之前的钩子
    beforeUpload (file) {
      this.loading = true
      // 重复文件验证
      const isRepeat = this.fileList.filter((item) => {
        return item.name === file.name
      })
      if (isRepeat.length) {
        this.$message.warning('不可重复上传!')
      }

      // 文件大小验证
      const isLtMax = file.size / 1024 / 1024 < this.size
      if (!isLtMax) {
        this.$message.warning(`上传文件大小不超过 ${this.size}MB!`)
      }

      return !isRepeat.length && isLtMax
    },

    // 上传文件改变时的状态
    handleChange (info) {
      let fileList = [...info.fileList]

      // 限制文件上传数量
      if (fileList.length > this.len) {
        this.$message.warning(`最多上传 ${this.len} 个文件!`)
      }

      // 文件去重
      fileList = this.unique(fileList, 'name')

      // 限制文件上传数量
      fileList = fileList.slice(0, this.len)

      // 获取上传数据
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response?.data?.fileUrl
        }
        return file
      })

      // 限制文件上传大小
      const arrList = fileList.filter((item) => {
        return item.size / 1024 / 1024 <= this.size
      })

      // 更新数据
      this.fileList = arrList
      this.emitParentFileList()

      setTimeout(() => { this.loading = false }, 600)
      if (!this.showUploadList && info.file.status === 'done') this.$message.success(`上传${this.text}成功!`)
    },

    // 数组去重
    unique (arr, attr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr[attr]) && res.set(arr[attr], 1))
    },

    // 预览文件
    async handlePreview (file) {
      if (this.listType === 'text') return
      const url = file?.url || file?.response?.data?.fileUrl
      this.previewImage = url
      this.previewVisible = true
    },

    // 上传完成后，处理数据,传递给父级
    emitParentFileList () {
      const arrList = []
      this.fileList.forEach((item) => {
        if (!item?.response) {
          arrList.push(item.url)
        } else {
          arrList.push(item.response?.data?.fileUrl)
        }
      })
      this.$emit('input', arrList)
    }
  }
}
</script>

<style lang="less">
.ant-upload-select-picture-card i {
  color: #999;
}

.ant-upload-list-picture {
  width: 400px;
}

.ant-upload-list-picture-card {
  float: left;
}

.ant-upload-list-item-name {
  color: #1890ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ant-upload-select-picture-card .ant-upload-text {
  color: #666;
}
</style>
