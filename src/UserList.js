import React, { Component } from 'react';
import styled from 'styled-components';
import UserTile from './UserTile';


class UserList extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    try {
      const results = await fetch('http://localhost:3001/api/v1/users');
      const users = await results.json();
      this.setState({
        users,
      })
    }
    catch(e) {
      console.log(e);
    }
  }


  render() {
    return (
      <UsersContainer>
        { this.state.users.map(user => <UserTile key={user.id} user={user} onDelete={this.deleteUser} />) }
      </UsersContainer>
    );
  }
}

export default UserList;

const UsersContainer = styled.div`
  width: 62%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
  margin-left:19%;
`;
