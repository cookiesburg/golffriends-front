import React, { Component } from 'react';
import styled from 'styled-components';

export default class RoundHistory extends Component {

  render() {
    return(
      <HistoryBody>
        <table>
          <thead>
            <tr>
              <th>SCORE</th>
              <th>COURSE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scores.map((score) => {
              let timestamp = score.created_at;
              let day = timestamp.slice(5, 10);
              return(
                <tr key={score.strokes}>
                  <td>{score.strokes}</td>
                  <td>{score.course.name}</td>
                  <td>{day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryBody>
    );
  }
}

const HistoryBody = styled.div`
  display: flex;
  flex-direction:column;
  flex-grow: 1;
`;
