import { shallowMount } from '@vue/test-utils'
import WeatherApp from '@/components/WeatherApp.vue'

describe('WeatherApp.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Testing Weather App Msg'
    const wrapper = shallowMount(WeatherApp, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
