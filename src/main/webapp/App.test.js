import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render, configure } from 'enzyme';

import App from './App';
import AppNav from './AppNav'



describe("App", () => {
    configure({ adapter: new Adapter() })

    let props;
    let mountedApp;

    const app = function() {
        if (!mountedApp) {
            mountedApp = mount(<App/>);

            return mountedApp
        }
    }

    beforeEach(() => { mountedApp = undefined });

    // always renders a navbar
    it("always renders a navbar", () => {
        const nav = app().find("div");
        expect(nav.length).toBeGreaterThan(0);
    });

    // only shows upload queue
    // if it's not empty


    // only lets user upload
    // if online and logged in


    // only lets user see their catches
    // if online and logged in


    // only shows catch table
    // if there are catches in the database


    // only renders the catch detail modal
    // after a row from the catch table is clicked
})


// it('renders without crashing', () => {
//     configure({ adapter: new Adapter() })
//
//     render(<AppNav/>)
// });



