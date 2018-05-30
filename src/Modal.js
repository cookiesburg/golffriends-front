import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ScoreForm from './ScoreForm';
import RoundHistory from './RoundHistory';
import ModalToggle from './ModalToggle';

const routes = [
  {
    path: '/score-form',
    component: ScoreForm
  },
  {
    path: '/history',
    component: RoundHistory
  },
]

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.element = document.createElement('div')
    this.modalRoot = document.getElementById('modal-root')
    this.modalRoot.appendChild(this.element)
  }
  componentDidMount() {
    document.addEventListener('keyup', this.keyup, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyup, false)
    this.modalRoot.removeChild(this.element)
  }
  keyup = e => {
    if (e.key === 'Escape') {
      this.props.onClose()
    }
  }
  clickedBackground = () => {
    this.props.onClose()
  }

  calculateDiffs = (scores) => {
    scores.map(score => {
      return ((score.strokes - score.course.rating)*113 / score.course.slope);
    });
  }

  calculateHandicap = () => {
    if(this.props.scores.length < 5) {
      return 'N/A';
    };

    const scores = this.props.scores;
    const diffs = scores.map(score => {
      return ((score.strokes - score.course.rating)*113 / score.course.slope);
    });
    const sorted = diffs.sort((a, b) => a>b ? 1 : -1 );

    if (sorted.length < 11) {
      return Math.round(sorted[0]*.96);
    } else if (sorted.length < 20)  {
      const lowest = sorted.slice(0, 2);
      const lowestSum = lowest.reduce((a, b) => a+=b);
      return Math.round((lowestSum / 3)*.96)
    } else {
      const lowest = sorted.slice(0, 9);
      const lowestSum = lowest.reduce((a, b) => a+=b);
      return Math.round((lowestSum / 10)*.96)
    }
  }

  render() {
    return ReactDOM.createPortal( this._renderModal(), this.element )
  }
  _renderModal() {
    return (
      <div className='modal-background' onClick={this.clickedBackground}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <div className='modal-head'>{this.calculateHandicap()}</div>
          <Router>
          <div className='modal-body'>
              <ModalToggle />
              {routes.map(({ path, component: C }) => (
                <Route
                  key={path}
                  path={path}
                  render={(props) => <C {...props} scores={this.props.scores} user={this.props.user}/>}
                />
              ))}
          </div>
          </Router>
        </ModalContainer>
      </div>
    );
  }
}

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 25vw;
  min-width:350px;
  height: 70vh;

  color: green;
  display: flex;
  flex-direction: column;

`;
