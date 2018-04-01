import { shallow } from '@vue/test-utils'
import Points from '@/components/Points.vue'

describe('Points.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Points'
    const wrapper = shallow(Points, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})