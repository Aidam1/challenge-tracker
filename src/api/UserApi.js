import { firestore } from './firebase';


class UserApi {
    static get_users() {
        return firestore.collection("users").get();
    }
}

export default UserApi;