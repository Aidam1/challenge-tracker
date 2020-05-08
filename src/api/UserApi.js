import db from './firebase';


class UserApi {
    static get_users() {
        return db.collection("users").get();
    }
}

export default UserApi;