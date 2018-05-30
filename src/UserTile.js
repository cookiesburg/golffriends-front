import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Modal from './Modal';

class userTile extends Component {
  state = {
    showModal: false,
    scores: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/scores')
    .then(response => {
      const scores = response.data.filter(score => score.user_id === this.props.user.id);
      this.setState({ scores, })
    })
    .catch(error => console.log(error))
  }


  render() {
    return(
      <div>
        <Tile onClick={() => this.setState({showModal:true})}>
          <p>{this.props.user.name}</p>
        </Tile>
        { this.state.showModal && <Modal onClose={() => this.setState({showModal:false})} scores={this.state.scores} user={this.props.user}>modal</Modal> }
      </div>
    );
  }
}

export default userTile;

const Tile = styled.div`
  display: flex;
  width:150px;
  height:150px;
  background: #222;
  justify-content:center;
  align-items:center;
  font-size: 25px;
  cursor:pointer;
  box-shadow: 0 0 35px black;
  color:white;
  margin-top: 30px;
  transition: all .4s ease;

  :hover {
    transform: scale(1.1);
    box-shadow: 0 0 1rem #ffc600;
  }
`;
