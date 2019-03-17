// page aailable only for logged in users

import React from 'react';
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

class Secret extends React.Component {

    state = {
        secretData: []
    };

    static getInitialProps() {
        const someProp = "Prop from secret page";

        return { someProp };
    }

    constructor(props) {
        super();
    }

    async componentDidMount() {
        const res = await axios.get('/api/v1/secret');
        const secretData = res.data;
        this.setState({
            secretData
        });
    }

    displaySecretData = () => {
        const { secretData } = this.state;

        if (secretData && secretData.length > 0) {
            return secretData.map((data, index) => {
                return <div key={index}>
                    <p>{data.title}</p>
                    <p>{data.description}</p>
                </div>
            });
        }

        //return null;
    }

    render() {
        const { someProp } = this.props;
        console.log(`getInitialProps from secret page: '${someProp}'`);

        return <BaseLayout {...this.props.auth}>
            <BasePage>
                <h1>Secret Page</h1>
                {this.displaySecretData()}
            </BasePage>
        </BaseLayout>
    }
}

export default withAuth(Secret);