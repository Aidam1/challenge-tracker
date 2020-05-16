import React, { Component, createContext } from "react";
import UserApi from '../api/UserApi';
import WorkoutApi from '../api/WorkoutApi';


export const StateContext = createContext();

class StateProvider extends Component {
  state = {
    users: {},
    workouts: [],
    isLoadingUsers: true,
    isLoadingWorkouts: true
  };

  componentDidMount() {
    const setUserData = (users) => this.setState({users});
    const setWorkoutsData = (workouts) => this.setState({workouts});
    const setIsLoadingUserData = (isLoadingUsers) => this.setState({isLoadingUsers});
    const setIsLoadingWorkoutsData = (isLoadingWorkouts) => this.setState({isLoadingWorkouts});
    UserApi.connect_users(setUserData, setIsLoadingUserData);
    WorkoutApi.connect_workouts(setWorkoutsData, setIsLoadingWorkoutsData);
  };

  render() {
    return (
      <StateContext.Provider value={{
          users: this.state.users,
          workouts: this.state.workouts,
          isLoading: this.state.isLoadingUsers || this.state.isLoadingWorkouts
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateProvider;