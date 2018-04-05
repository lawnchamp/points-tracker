import Points from '@/components/Points.vue'
import { mount } from '@vue/test-utils'

describe('Points.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Points)
    wrapper.setData({
      competitions: [{
        name: 'dodge ball',
        winningTeam: 'black',
        pointsAwarded: 3
      }, {
        name: 'soccer',
        winningTeam: 'red',
        pointsAwarded: 5
      }, {
        name: 'soccer',
        winningTeam: 'black',
        pointsAwarded: 10
      }]
    })
  })

  it('properly loads team names', () => {
    expect(wrapper.vm.teamNames).toEqual(['red', 'blue', 'brown', 'black', 'orange', 'purple'])
  })

  describe('.validTeamName', () => {
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
    it('adds the score together for winningTeam with the same name', () => {
      expect(wrapper.vm.teamScores).toMatchObject({
        black: 13,
        red: 5
      })
    })

    it('returns empty object when competitions are empty', () => {
      wrapper.setData({ competitions: [] })

      expect(wrapper.vm.competitions).toEqual([])
      expect(wrapper.vm.teamScores).toMatchObject({})
    })
  })

  describe('.missingCompetitionData', () => {
    it('detects empty competition data', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: '',
        winningTeam: '',
        pointsAwarded: ''
      })).toBe(true)
    })

    it('detects missing competition data', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: 'Dodge Ball',
        winningTeam: 'blue',
        pointsAwarded: ''
      })).toBe(true)
    })

    it('passes when all fields are filled', () => {
      expect(wrapper.vm.missingCompetitionData({
        name: 'Dodge Ball',
        winningTeam: 'blue',
        pointsAwarded: '350'
      })).toBe(false)
    })
  })
})
