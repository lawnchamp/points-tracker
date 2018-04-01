import Vue from 'vue'
import { shallow } from '@vue/test-utils'
import Points from '@/components/Points.vue'

describe('Points.vue', () => {
  // do people do this? does this properly seperate each test?
  // should this be in a beforeEach type of thing?
  const vm = new Vue(Points).$mount();  

  it('properly loads team names', () => {
    expect(vm.teamNames).toEqual(['red', 'blue', 'brown', 'black', 'orange', 'purple']);
  });

  describe('.validTeamName', () => {
    it('detects bad team name', () => {
      expect(vm.validTeamName('bad name')).toBe(false);
      expect(vm.validTeamName('')).toBe(false);
      expect(vm.validTeamName('blue')).toBe(true);
      expect(vm.validTeamName('red')).toBe(true);
    });
  });

  describe('.missingCompetitionData', () => {
    it('detects empty competition data', () => {
      expect(vm.missingCompetitionData({
        name: '',
        winningTeam: '',
        pointsAwarded: '',
      })).toBe(true);
    });

    it('detects missing competition data', () => {
      expect(vm.missingCompetitionData({
        name: 'Dodge Ball',
        winningTeam: 'blue',
        pointsAwarded: '',
      })).toBe(true);
    });

    it('passes when all fields are filled', () => {
      expect(vm.missingCompetitionData({
        name: 'Dodge Ball',
        winningTeam: 'blue',
        pointsAwarded: '350',
      })).toBe(false);
    });
  });

  // learning testing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  describe('learning specs lifted from https://vuejs.org/v2/guide/unit-testing.html', () => {
    it('has a created hook', () => {
      expect(typeof Points.created).toBe('function');
    });

    it('sets the correct default data', () => {
      expect(typeof Points.data).toBe('function');
      const defaultData = Points.data();
      expect(defaultData.message).toBe('hello!');
    })

    it('correctly sets the message when created', () => {
      const vm = new Vue(Points).$mount()
      expect(vm.message).toBe('bye!')
    })

    // how does this last test work?
    // https://vuejs.org/v2/guide/unit-testing.html
    // it('renders the correct message', () => {
    //   const Constructor = Vue.extend(Points)
    //   const vm = new Constructor().$mount()
    //   expect(vm.$el.textContent).toBe('bye!')
    // })
  });
});