/*
* 【调用通讯录选择用户、部门】组件
*  props[decorator]：对应的校验参数
*  props[userList]：默认已选的用户，用户列表统一使用钉钉返回的参数名称{ emplId:"", name:"", avatar:"" }
*  props[departmentList]：默认已选的部门,部门列表统一使用钉钉返回的参数名称{ id:"", name:"" }
*
*/

<template>
  <div>
    <!-- 纯显示文字 -->
    <a-input
      v-if="viewType==='input'"
      v-model="inputValue"
      allow-clear
      :placeholder="placeholder"
      @click="getComplex"
    />
    <!-- 显示文字和删除 -->
    <div v-if="viewType==='div'">
      <div v-if="type==='complex'" class="divWrap">
        <a-tag v-if="uList.length < number" class="addButton" @click="getComplex"><a-icon type="plus" />添加</a-tag>
        <span v-for="(item, index) in uList" :key="item.emplId">
          <a-tag v-if="index < 2" closable :after-close="() => userClose(item.emplId)">{{ item.name }}</a-tag>
        </span>
        <span v-if="uList.length>2">...</span>
      </div>

      <div v-else class="divWrap">
        <a-tag v-if="dList.length< number" class="addButton" @click="getComplex"><a-icon type="plus" />添加</a-tag>
        <span v-for="(item, index) in dList" :key="item.id">
          <a-tag v-if="index<2" closable :after-close="() => userClose(item.id)">{{ item.name }}</a-tag>
        </span>
        <span v-if="dList.length>2">...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { complexPicker, departmentsPicker } from '@/utils/ddApi'
export default {
  name: 'GetUsers',
  props: {
    viewType: { // 显示类型：'input':直接输入，'div':默认
      type: String,
      default: 'div'
    },
    inputDefault: { // 输入的默认值
      type: String,
      default: ''
    },
    placeholder: { // 默认文字
      type: String,
      default: '请选择'
    },
    type: { // 调用通讯录类型：'complex':人员和部门，'departments':选择部门
      type: String,
      default: 'complex'
    },
    multiple: { // 是否多选
      type: Boolean,
      default: true
    },
    userList: { // 默认人员选择
      type: Array,
      default: () => []
    },
    departmentList: { // 默认部门选择
      type: Array,
      default: () => []
    },
    disabledUsers: { // 禁止选择用户
      type: Array,
      default: () => []
    },
    disabledDepartments: { // 禁止选择部门
      type: Array,
      default: () => []
    },
    selectTitle: { // 选择头部文字
      type: String,
      default: '请选择'
    },
    number: { // 可选择人数限制
      type: Number,
      default: 1000
    },
    departSelect: { // 是否可以选择部门
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputValue: '',
      uList: this.userList ? JSON.parse(JSON.stringify(this.userList)) : [], // 已选人员列表
      dList: this.departmentList ? JSON.parse(JSON.stringify(this.departmentList)) : [] // 已选部门列表
    }
  },

  watch: {
    userList: function (val) {
      this.$set(this, 'uList', this.userList)
    },
    departmentList: function (val) {
      this.$set(this, 'dList', this.departmentList)
    },
    inputDefault: function (val) {
      this.inputValue = this.inputDefault
    }
  },

  methods: {
    // 删除人员\部门, 删除后的用户列表，部门列表
    userClose (id, type) {
      let num = null
      if (this.type === 'complex') {
        this.uList.map((item, index) => { if (id === item.emplId) num = index })
        this.uList.splice(num, 1)
      } else {
        this.dList.map((item, index) => { if (id === item.id) num = index })
        this.dList.splice(num, 1)
      }

      this.$emit('getPicker', {
        param: this.decorator,
        userList: this.uList,
        departmentList: this.dList,
        inputValue: this.inputValue
      })
    },
    // 调用钉钉选人控件选择人员或者部门
    async getComplex () {
      if (this.type === 'complex') {
        const { users = [] } = await complexPicker({
          multiple: this.multiple,
          pickedUsers: this.uList.map(x => x.emplId ?? ''),
          responseUserOnly: true
        })
        this.uList = users
        if (this.viewType === 'input') this.inputValue = this.uList.map(item => item.name).join(',')
      } else {
        const { departments = [] } = await departmentsPicker({
          multiple: this.multiple,
          pickedDepartments: this.dList.map(x => x.id ?? '')
        })
        this.dList = departments
        if (this.viewType === 'input') this.inputValue = this.dList.map(item => item.name).join(',')
      }
      this.$emit('getPicker', {
        param: this.decorator,
        userList: this.uList,
        departmentList: this.dList,
        inputValue: this.inputValue
      })
    }
  }
}
</script>

<style scoped lang="less">
 .addButton{
    background: #fff; border-style: dashed;
  }
  .divWrap{
    border-radius:4px;
    border:1px solid rgba(217,217,217,1);
    padding: 5px 8px 5px;
  }
</style>
