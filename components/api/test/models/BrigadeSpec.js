Brigade = require('../../models/Brigade.js');
describe('Brigade', function() {
  it('has a name', function() {
    hero = new Brigade({ name: 'Hercules' });
    expect(hero.name).toEqual('Hercules');
  });
});
