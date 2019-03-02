import React from 'react';
import axios from 'axios';
import { Link } from '../routes';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';


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
        return posts.map((post, indexIteration) => {
            return (
                <li key={indexIteration}>
                    <Link route={`/portfolio/${post.id}`} >
                        <a> {post.title} </a>
                    </Link>
                </li>
            )
        })
    }

    render() {
        const { posts } = this.props;
        return (
            <BaseLayout>
                <BasePage>
                    <p>Portfolios Page</p>
                    <ul>
                        {this.renderPosts(posts)}
                    </ul>
                </BasePage>

            </BaseLayout>
        )
    }
}

export default Portfolios;