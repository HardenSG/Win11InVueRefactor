import type { CustomComponentInter } from 'utils'
import { defineComponent, h, toRefs } from 'vue'

/**
 *  render All Packages
 */
export default defineComponent({
  props: {
    list: {
      type: Array<CustomComponentInter>,
    },
  },
  setup(props) {
    const { list } = toRefs(props)

    const render = () => {
      return (
        <div>
          {list?.value?.map((c) => {
            console.log('re run')
            return h(c)
          })}
        </div>
      )
    }
    return render
  },
})
