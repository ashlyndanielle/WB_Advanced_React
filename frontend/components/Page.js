import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    :root {
        --darkBlue: #1f2840;
        --lightBlue: #133862;
        --sand: #faedc4;
        --offWhite: #e4e4e4;
        --yellow: #d1bf39;
        --black: #191919;
        --gray: #3a3a3a;
        --mediumGray: #707070;
        --lightGray: #e1e1e1;
        --maxWidth: 1000px;
        --boxshadow: 0 12px 24px 0 rgba(0,0,0,0.9);
    }
    html {
        box-sizing: border-box;
    }
    *, *::before, *::after {
        box-sizing: inherit;
    }
    body {
        font-family:'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
    }
    a {
        text-decoration: none;
        color: var(--black);
    }
    a:hover {
        color: var(--mediumGray);
    }
`;

const InnerStyles = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 2rem;
`;

export default function Page({ children, title }) {
    return (
        <div>
            <GlobalStyles />
            <Header />
            <InnerStyles>{children}</InnerStyles>
        </div>
    );
}

Page.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};
