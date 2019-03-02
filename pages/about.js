import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class About extends React.Component {

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    <p>About Page</p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default About;