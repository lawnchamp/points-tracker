import Points from '@/components/Points.vue'
import {mount} from '@vue/test-utils'

describe('Points.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Points)
    wrapper.setData({
      competitions: [{
        name: 'dodge ball',
        winner: 'black',
        loser: 'green',
        pointsAwarded: 3,
      }, {
        name: 'soccer',
        winner: 'red',
        loser: 'orange',
        pointsAwarded: 5,
      }, {
        name: 'soccer',
        winner: 'black',
        loser: 'purple',
        pointsAwarded: 10,
      }],
    })
  })

  fit('properly loads team names', () => {
    expect(wrapper.vm.teamNames).toEqual(['red', 'blue', 'green', 'black', 'orange', 'purple'])
  })

  fdescribe('.validTeamName', () => {
    it('detects bad team name', () => {
      expect(wrapper.vm.validTeamName('bad name')).toBe(false)
      expect(wrapper.vm.validTeamName('')).toBe(false)
      expect(wrapper.vm.validTeamName('blue')).toBe(true)
      expect(wrapper.vm.validTeamName('red')).toBe(true)
    })
  })

  describe('.removeCompetition', () => {
    it('removes competition given at index 1', () => {
      const originalLength = wrapper.vm.competitions.length
      wrapper.vm.removeCompetition(1)

      expect(wrapper.vm.competitions.length).toEqual(originalLength - 1)
    })
  })

  describe('removing competition', () => {
    it('checks dom for one less remove button', () => {
      // todo i should really check that the correct row was removed.
      const originalLength = wrapper.findAll('.removeButton').length
      wrapper.find('.removeButton').trigger('click')

      expect(wrapper.findAll('.removeButton').length).toBe(originalLength - 1)
    })
  })

  describe('.teamScores', () => {
    it('adds the score together for winner with the same name', () => {
      expect(wrapper.vm.teamScores).toMatchObject({
        black: 13,
        red: 5,
      })
    })

    it('returns empty object when competitions are empty', () => {
      wrapper.setData({competitions: []})

      expect(wrapper.vm.competitions).toEqual([])
      expect(wrapper.vm.teamScores).toMatchObject({})
    })
  })

  describe('.missingCompetitionData', () => {
    it('detects empty competition data', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: '',
        winner: '',
        pointsAwarded: '',
      })).toBe(true)
    })

    it('detects missing competition data', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: 'Dodge Ball',
        winner: 'blue',
        pointsAwarded: '',
      })).toBe(true)
    })

    it('passes when all fields are filled', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: 'Dodge Ball',
        winner: 'blue',
        pointsAwarded: '350',
      })).toBe(false)
    })
  })
})
