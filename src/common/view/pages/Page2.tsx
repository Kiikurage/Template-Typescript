import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export class Page extends React.Component {
    render() {
        return (
            <Wrapper>
                <Title>
                    Page2
                    <Link to={ './page1' }>Page1</Link>
                </Title>
            </Wrapper>
        );
    }
}

export default Page;
