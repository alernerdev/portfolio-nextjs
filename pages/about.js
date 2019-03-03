import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class About extends React.Component {

    render() {
        // auth propagated from _app.js
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <p>About Page</p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default About;