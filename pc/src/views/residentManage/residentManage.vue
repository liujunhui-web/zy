<template>
  <section>
    <a-form-model>
      <a-row :span="24" :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="居住人姓名或手机号">
            <a-input v-model="name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12" class="h-40 align-items-center display-flex">
          <a-button @click="handelReset">重置</a-button>
          <a-button class="m-l-8 bg-0089FF c-fff" @click="handelSubmit">查询</a-button>
        </a-col>
      </a-row>
    </a-form-model>
    <XTable
      :columns="column"
      :data-source="tableData"
      class="m-t-16"
      :scroll="{x:true}"
      :loading="loading"
      :total="total"
      @getData="getData"
      @getValues="getValues"
    >
      <template #action="{ mobile }">
        <a @click="handelDetail(mobile)">查看</a>
      </template>
    </XTable>
    <residentDrawer :visible.sync="visible" :mobile.sync="mobile" />
  </section>
</template>
<script>
import { loading } from '@/decorator'
import { dateFormat } from '@/utils'
import residentDrawer from './coms/residentDrawer'
export default {
  components: { residentDrawer },
  data () {
    return {
      column: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: '身份证',
          dataIndex: 'idCard',
          key: 'idCard'
        },
        {
          title: '是否重复',
          dataIndex: 'isRepeat',
          key: 'isRepeat'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: [],
      total: 0,
      loading: false,
      name: '',
      params: { pageNum: 1, pageSize: 10 },
      visible: false,
      mobile: ''
    }
  },
  watch: {
    visible () {
      this.getData()
    }
  },
  mounted () {

  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selAllPostdocs({
        name: this.name,
        pageNo: pageNum,
        pageSize: pageSize
      })
      this.total = res.total
      const list = res.rows.map(item => {
        return {
          ...item,
          isRepeat: '是',
          createTime: dateFormat(item.createTime)
        }
      })

      this.tableData = list
    },
    getValues (params) {
      this.params = params
    },
    handelReset () {
      this.name = ''
    },
    handelSubmit () {
      this.getData()
    },
    handelDetail (mobile) {
      this.mobile = mobile
      this.visible = true
    }
  }
}
</script>

<style scoped lang="less">
.ant-form-item {
  display: flex;
}

/deep/.ant-col.ant-form-item-control-wrapper{
    flex:1;
}
</style>
