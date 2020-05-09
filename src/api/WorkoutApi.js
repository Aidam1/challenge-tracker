import db from './firebase';


class WorkoutApi {
    static get_workouts() {
        return this.collectionRef.orderBy("date", "desc").get();
    }

    static put_workout(workout) {
        workout = Object.assign({}, workout);
        let workoutRef = null;
        if (workout.id) {
            workoutRef = this.collectionRef.doc(workout.id);
            delete workout.id;
        } else {
            workoutRef = this.collectionRef.doc();
        }
        return workoutRef.set(workout);
    }
}

export default WorkoutApi;