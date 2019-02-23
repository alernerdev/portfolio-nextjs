import React from 'react';
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';

class Portfolios extends React.Component {

    static async getInitialProps() {
        let posts = [];

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = response.data;
        } catch (err) {
            console.error(err);
        }

        // notice that attrs that are returned from getInitialProps end up as props
        return { posts: posts.splice(0, 10) }
    }

    renderPosts(posts) {
        return posts.map((post) => {
            return (
                <li>{post.title}</li>
            )
        })
    }

    render() {
        const { posts } = this.props;
        return (
            <BaseLayout>
                <p>Portfolios Page</p>
                <ul>
                    {this.renderPosts(posts)}
                </ul>
            </BaseLayout>
        )
    }
}

export default Portfolios;