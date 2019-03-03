import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Blogs extends React.Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <p>Blogs Page</p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Blogs;