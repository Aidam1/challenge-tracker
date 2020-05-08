import db from './firebase';


class WorkoutApi {
    static get_workouts() {
        return db.collection("workouts").get();
    }

    static get_performances(workout_id) {
        return db.collection("workouts").doc(workout_id).collection("user_workout").get();
    }
}

export default WorkoutApi;