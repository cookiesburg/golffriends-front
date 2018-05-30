import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class ScoreForm extends Component {
  state = {
    courses: [],
    course:'',
    strokes:null
  }


  async componentDidMount() {
    try {
      const results = await fetch('http://localhost:3001/api/v1/courses');
      const courses = await results.json();
      this.setState({
        courses,
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  handleSubmit = () => {
    const score = { strokes:this.state.strokes, user_id: this.props.user.id, course_id: this.state.course}
    axios.post(
      `http://localhost:3001/api/v1/scores`, {score: score})
    .then(response => {
      console.log(response);
      this.props.updateScores(this.props.selectPlayer)
    })
    .catch(error => console.log(error))
  }

  selectCourse(){
    this.setState( {course: this.refs.courseSelector.value} );
  }

  enterStrokes(){
    this.setState({strokes: this.refs.strokesBox.value});
  }

  render() {
      var courseOptions = (this.state.courses.map((course) => {
        return <option key={course.id} value={course.id}>{course.name}</option> ;
      }));
      return (
        <ModalBody>
          <form>
            <input ref='strokesBox' placeholder='enter score' onChange={(e) => {this.enterStrokes(); } } />
            <select ref='courseSelector' onChange={(e) => { this.selectCourse(); } }>
              <option value="" disabled selected>select course</option>
              {courseOptions}
            </select>
          </form>
          <button className='submitButton' onClick={this.handleSubmit}>SUBMIT</button>
        </ModalBody>
    );
  }
}

const ModalBody = styled.div`
  display: flex;
  flex-direction:column;
  flex-grow: 8;

    form {
      display:flex;
      flex-direction:column;
      flex-grow:1;
    }

    select {
      height: 3rem;
      min-height: 20px;
      margin: 1rem;
      font-size:1.3rem;
      text-align:center;
    }
    input {
      height: 3rem;
      min-height: 20px;
      margin: 1rem;
      width: 50%;
      align-self:center;
      font-size:1.8rem;
      text-align:center;
    }

`;
