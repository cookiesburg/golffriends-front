import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom';

export default class ModalToggle extends Component {

  render() {
    return (
      <LinkBar>
        <Link to='/score-form'>Post</Link>
        <Link to='/history'>History</Link>
      </LinkBar>
    );
  }
}

const LinkBar = styled.div`
  display:flex;
  justify-content: space-around;
  font-family:lato;
  font-weight: bold;
  font-size: 16px;
  align-items:center;
  height:3rem;
`;
