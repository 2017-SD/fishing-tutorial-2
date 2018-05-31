import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render, configure } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
    configure({ adapter: new Adapter() })

    render(<App/>)
});
