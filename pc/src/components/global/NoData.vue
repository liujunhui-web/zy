<script>
import noDataImg from '@/assets/image/no_data.png'
export default {
  name: 'NoData',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  render () {
    return (
      <section class="text-center p-t-16">
        <img src={noDataImg} class="w-97" />
        <p class="c-black-25 lh-22">暂无数据</p>
      </section>
    )
  }
}
</script>
