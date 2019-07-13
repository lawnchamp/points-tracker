import AddNewWeight from '@/components/AddNewWeight'
import {createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AddNewWeight.vue', () => {
  let actions
  let store
  let wrapper
  beforeEach(() => {
    actions = {
      addWeight: jest.fn(),
    }
    store = new Vuex.Store({
      actions,
    })
    wrapper = mount(AddNewWeight, {store, localVue})
  })

  describe('.invalidWeight', () => {
    it('returns false with valid name and value', () => {
      wrapper.vm.name = 'dodgeball'
      wrapper.vm.value = 100

      expect(wrapper.vm.invalidWeight).toEqual(false)
    })

    it('does not allow empty, null, or undefined string name', () => {
      wrapper.vm.value = 100
      const badNames = ['', null, undefined]
      badNames.forEach((name) => {
        wrapper.vm.name = name
        expect(wrapper.vm.invalidWeight).toEqual(true)
      })
    })

    it('does not allow null, undefined, non number name', () => {
      wrapper.vm.name = 'soccer'
      const badValues = [null, undefined, 'string', '']
      badValues.forEach((value) => {
        wrapper.vm.value = value
        expect(wrapper.vm.invalidWeight).toEqual(true)
      })
    })

    it('does not allow string value', () => {
      wrapper.vm.name = 'soccer'
      wrapper.vm.value = '100'

      expect(wrapper.vm.invalidWeight).toEqual(true)
    })
  })

  describe('actually using inputs', () => {
    let inputs, weightNameInput, weightValueInput, submitButton
    beforeEach(() => {
      inputs = wrapper.findAll('input')
      weightNameInput = inputs.at(0)
      weightValueInput = inputs.at(1)
      submitButton = wrapper.find('button')
    })

    it('can not submit invalid weight', () => {
      weightNameInput.element.value = ''
      weightValueInput.element.value = ''
      weightNameInput.trigger('input')
      weightValueInput.trigger('input')

      submitButton.trigger('click')

      expect(actions.addWeight).not.toHaveBeenCalled()
    })

    it('can submit valid weight', () => {
      weightNameInput.element.value = 'soccer'
      weightNameInput.trigger('input')

      weightValueInput.element.value = 100
      weightValueInput.trigger('input')

      submitButton.trigger('click')

      expect(actions.addWeight).toHaveBeenCalled()
    })
  })
})
