import Vue from 'vue';
import Vuex from 'vuex';
import {getAdminInfo} from '@api/getData'
import createPersiste from 'vue-savedata';

Vue.use(Vuex)

const state = {
    adminInfo: {
        avatar: 'default.jpg'
    },
}

const mutations = {
    saveAdminInfo(state, adminInfo) {
        state.adminInfo = adminInfo;
    }
}

const actions = {
    async getAdminData({commit}) {
        try {
            const res = await getAdminInfo();
            if (res.status == 1) {
                commit('saveAddminInfo', res.data)
            } else {
                // 掉接口失败
                throw new Error(res.type);
            }
        } catch (error) {
            console.log(error.message);

        }
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    plugins: [createPersiste()]
})