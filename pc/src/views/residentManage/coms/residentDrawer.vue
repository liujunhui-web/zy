<template>
  <a-drawer
    :visible="visible"
    width="1000"
    title="居住人合并"
    @close="handelClose"
  >
    <a-row>
      <a-button type="primary" :loading="loadingBtn" @click="handelMerge">
        合并
      </a-button>
      <a-button type="danger" class="m-l-24" @click="handelMergeOver">
        合并完成
      </a-button>
    </a-row>
    <XTable
      :columns="column"
      :data-source="tableData"
      :scroll="{x:true}"
      class="m-t-24"
      :loading="loading"
      :total="total"
      @getData="getData"
      @getValues="getValues"
    />
  </a-drawer>
</template>

<script>
import { loading, confirm } from '@/decorator'
import { dateFormat } from '@/utils'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      column: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          width: 100
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          fixed: 'left',
          width: 150
        },
        {
          title: '身份证',
          dataIndex: 'idCard',
          key: 'idCard'
        },
        {
          title: '街镇',
          dataIndex: 'townStreetName',
          key: 'townStreetName'
        },
        {
          title: '村社',
          dataIndex: 'villageName',
          key: 'villageName'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime'
        }

      ],
      tableData: [],
      loading: false,
      total: 0,
      params: { pageNum: 1, pageSize: 10 },
      postdocsIds: [],
      disabled: true,
      loadingBtn: false
    }
  },
  watch: {
    mobile () {
      this.getData()
    }
  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selPostdocs({
        mobile: this.mobile,
        pageNo: pageNum,
        pageSize
      }) ?? []
      this.total = res.total
      console.log(res)
      const list = res.rows.map(item => {
        return {
          ...item,
          createTime: dateFormat(item.createTime),
          updateTime: dateFormat(item.updateTime)
        }
      })
      this.postdocsIds = list.map(item => item.id)
      this.tableData = list
      console.log('poc', this.postdocsIds)
    },
    getValues (params) {
      this.params = params
    },
    handelClose () {
      this.$emit('update:visible', false)
    },
    @confirm({
      title: '确认合并',
      content: '请确认合并信息,完成后请点击确定按钮确定'
    })
    handelMerge () {
      this.loadingBtn = true
      const postdocsIds = this.postdocsIds.join(',')
      this.$apis.mergePostdocs({
        postdocsIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
        this.loadingBtn = false
      })
    },
    // 合并完成
    @confirm({
      title: '确认合并完成',
      content: '请确认合并后信息是否正确,确认后请点击确定按钮确定'
    })
    handelMergeOver () {
      this.$apis.delPostdocs({
        mobile: this.mobile
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$emit('update:visible', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style>

</style>
