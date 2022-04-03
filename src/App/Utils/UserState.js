import { ArcEvents } from 'arc-lib';

//At any given time, the user (whoever is controlling the requesting client) has some state. This is hydrated on initial load, and maintained appropriately.
//In the current kit, we have no auth/login state. So nothing really here.
class UserState {
    constructor() {
        ArcEvents.mixin(this);
        this.userId = "";
    }

    logout() {
        this.userId = "";
    }

    deserialize(_userData) {
        if(!_userData) {
            return;
        }
        this.userId = _userData.userId;
    }

    serialize() {
        return {
            userId: this.userId
        }
    }
}

export default new UserState();