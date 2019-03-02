import React from 'react';
import {withRouter} from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import auth0Client from '../services/auth0';

class Callback extends React.Component {

    async componentDidMount() {
        await auth0Client.handleAuthentication();
        this.props.router.push('/');
    }

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    <p>Logging in</p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withRouter(Callback);