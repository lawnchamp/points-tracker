import WeightsPage from '@/views/WeightsPage'
import AddNewWeight from '@/components/AddNewWeight'
import {createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('WeightsPage.vue', () => {
  let actions, store, wrapper, addNewWeightVm, addNewWeightWrapper
  beforeEach(() => {
    actions = {
      addWeight: jest.fn(),
      getWeights: jest.fn(),
    }
    store = new Vuex.Store({
      state: {
        weights: {
          soccer: 500,
          stand: 400,
          quiz: 100,
        },
      },
      actions,
    })
    wrapper = mount(WeightsPage, {store, localVue})
    addNewWeightWrapper = wrapper.find(AddNewWeight)
    addNewWeightVm = addNewWeightWrapper.vm
  })

  describe('.invalidWeight', () => {
    it('returns false with valid name and values', () => {
      [
        {name: 'spud', pointsValue: 100},
        {name: 'soccer', pointsValue: 0},
        {name: 'stand', pointsValue: -10},
      ].forEach(({name, pointsValue}) => {
        addNewWeightVm.name = name
        addNewWeightVm.value = pointsValue

        expect(addNewWeightVm.invalidWeight).toEqual(false)
      })
    })

    it('does not allow empty, null, or undefined weight name', () => {
      addNewWeightVm.value = 100
      const badNames = ['', null, undefined, 100, 0]
      badNames.forEach((name) => {
        addNewWeightVm.name = name
        expect(addNewWeightVm.invalidWeight).toEqual(true)
      })
    })

    it('does not allow null, undefined, non number point value', () => {
      addNewWeightVm.name = 'soccer'
      const badPoints = [null, undefined, 'string', '']
      badPoints.forEach((pointValue) => {
        addNewWeightVm.value = pointValue
        expect(addNewWeightVm.invalidWeight).toEqual(true)
      })
    })

    it('does not allow string value', () => {
      addNewWeightVm.name = 'soccer'
      addNewWeightVm.value = '100'

      expect(addNewWeightVm.invalidWeight).toEqual(true)
    })
  })

  describe('actually using inputs', () => {
    function submitWeight(name, pointValue) {
      let nameWrapper, pointValueWrapper
      [nameWrapper, pointValueWrapper] = addNewWeightWrapper.findAll('input').wrappers

      giveInputData(nameWrapper, name)
      giveInputData(pointValueWrapper, pointValue)

      addNewWeightWrapper.find('button').trigger('click')
    }

    function giveInputData(input, data) {
      input.element.value = data
      input.trigger('input')
    }

    it('can not submit invalid weight', () => {
      [
        {name: '', pointValue: ''},
        {name: 'soccer', pointValue: ''},
        {name: 'soccer', pointValue: null},
        {name: null, pointValue: 500},
      ].forEach(({name, pointValue}) => {
        submitWeight(name, pointValue)
        expect(actions.addWeight).not.toHaveBeenCalled()
      })
    })

    it('can submit valid weight', () => {
      submitWeight('frizbo', 400)

      expect(actions.addWeight).toHaveBeenCalledWith(expect.anything(), {
        name: 'frizbo',
        value: 400,
      }, undefined)
    })

    it.skip('invalid weight disables submit button')
    it.skip('input fields are cleared after submit')
    it.skip('upon submission another list item is added')
    it.skip('actually check what firebase call is made')
    it.skip('check that you can edit points of old weights')
    it.skip('check that you can remove weights')
  })
})
