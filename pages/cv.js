import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class CV extends React.Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <p>CV Page</p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default CV;