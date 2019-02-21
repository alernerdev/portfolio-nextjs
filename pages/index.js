import React from 'react';

class Index extends React.Component {

    render() {
        return (
            <React.Fragment>
                <p>Welcome Page</p>
                <a href='/'> Home </a>
                <a href='/about'> About </a>
                <a href='/portfolios'> Portfolio </a>
                <a href='/blogs'> Blog </a>
                <a href='/cv'> CV </a>
            </React.Fragment> 
        )
    }
}

export default Index;