import { shallow } from 'enzyme';
import React from 'react';
import Header from '.';

describe('Header', () => {
  let header;
  beforeEach(() => header = shallow(<Header />));
  it('matches the snapshot', () => {
    expect(header).toMatchSnapshot();
  });
})
