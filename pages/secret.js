// page aailable only for logged in users

import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

class Secret extends React.Component {

    static getInitialProps() {
        const someProp = "Prop from secret page";

        return {someProp};
    }

    render() {
        const { someProp } = this.props;
        console.log(`getInitialProps from secret page: '${someProp}'`);

        return <BaseLayout {...this.props.auth}>
            <BasePage>
                <p>Secret Page</p>
            </BasePage>
        </BaseLayout>
    }
}

export default withAuth(Secret);