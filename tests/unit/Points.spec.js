import Points from '@/components/Points.vue'
import seedCompetitions from '@/data/seedCompetitions.js'

import { mount } from '@vue/test-utils'

describe('Points.vue', () => {
  const wrapper = mount(Points)

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

  // pretty weak test
  describe('.removeCompetition', () => {
    it('removes competition given at index 1', () => {
      wrapper.vm.competitions = seedCompetitions
      const originalLength = wrapper.vm.competitions.length

      wrapper.vm.removeCompetition(1)

      expect(wrapper.vm.competitions.length).toEqual(originalLength - 1)
    })
  })

  describe('.teamScores', () => {

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
