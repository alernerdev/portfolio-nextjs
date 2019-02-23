import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';

class Index extends React.Component {

    constructor(props) {
        super(props);
        console.log("constructor");

        this.state = {
            title: 'state title index page'
        }
    }

    componentDidMount() {
        console.log("didMount");
    }

    render() {
        console.log("render");

        return (
            <BaseLayout>
                <p>Welcome Page</p>
                {this.state.title}
                <button onClick = { ()=> {this.setState({title: 'hello'})}}>Change Title</button>
            </BaseLayout>
        )
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
}

export default Index;