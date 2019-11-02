
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        author: 'superxqy',
        carList: null,
        userInfo: {
            isLogin: false,
            name: ''
        },
        mutations: {
            change(state, time) {
                state.author += time;
            },
            updateCart(state, obj) {
                state.carList = obj;
            },
            updateUserInfo(state, obj) {
                state.userInfo = Object.assign({}, obj);
            }
        },
        actions: {
            updateActionsUser(context, obj) {
                context.commit('updateUserInfo', obj);
            },
            updateActonsCart(context, obj) {
                context.commit('updateCart', obj)
            }
        }
    }
});

export default store;