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

export class Page1 extends React.Component {
    render() {
        return (
            <Wrapper>
                <Title>
                    Page1
                    <Link to={ './page2' }>Page2</Link>
                </Title>
            </Wrapper>
        );
    }
}

export default Page1;
