import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children, title }) {
    return (
        <div>
            <Header />
            <h2>I am the page component {title}</h2>
            {children}
        </div>
    );
}

Page.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};
