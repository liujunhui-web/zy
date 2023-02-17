<template>
  <section>
    <a-form-model>
      <a-row :span="24" :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="房东姓名或房东手机号">
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
      <template #action="text">
        <a @click="handelDetail(text)">查看</a>
      </template>
    </XTable>
    <houseDrawer :house-visible.sync="houseVisible" :landlord-info.sync="landlordInfo" />
  </section>
</template>

<script>
import { loading } from '@/decorator'
import { dateFormat } from '@/utils'
import houseDrawer from './coms/houseManageDrawer'
export default {
  components: { houseDrawer },
  data () {
    return {
      column: [
        {
          title: '房东姓名',
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
          key: 'idCard',
          width: 200
        },
        {
          title: '街镇',
          dataIndex: 'townStreet',
          key: 'townStreet',
          width: 200
        },
        {
          title: '村社',
          dataIndex: 'villageName',
          key: 'villageName',
          width: 200
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 200
        },
        {
          title: '登录时间',
          dataIndex: 'loginTime',
          key: 'loginTime',
          width: 200
        },
        {
          key: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          width: 100
        }
      ],
      tableData: [],
      total: 0,
      loading: false,
      name: '',
      params: { pageNum: 1, pageSize: 10 },
      landlordInfo: {},
      houseVisible: false
    }
  },
  watch: {
    houseVisible () {
      this.getData()
    }
  },
  mounted () {

  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selUserLogin({
        pageNo: pageNum,
        pageSize: pageSize,
        name: this.name,
        type: 0
      })
      this.total = res.total
      const list = res.rows.map(item => {
        return {
          ...item,
          isRepeat: '是',
          createTime: dateFormat(item.createTime),
          loginTime: dateFormat(item.loginTime)
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

    handelDetail ({ mobile, name }) {
      this.houseVisible = true
      this.landlordInfo = { mobile, name }
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
