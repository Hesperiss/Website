import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Home from '../Components/Home/Home';

configure({adapter: new Adapter()});

describe('Test Buttons component', () => {
  it('Test chat click', async () => {
    const wrapper = shallow(<Home />)
    // const button = wrapper.find('button');
    //
    // expect(button.length).toBe(1);
    //
    // button.simulate('click');

    var anchorHref = wrapper.find('#chat').prop('href');

    expect(anchorHref).toEqual('/chat')

    //expect(window.location.pathname).toBe("/chat");
  })

  it('Test map click', () => {
    const wrapper = shallow(<Home />)

    var anchorHref = wrapper.find('#map').prop('href');

    expect(anchorHref).toEqual('/map')
  })
});
