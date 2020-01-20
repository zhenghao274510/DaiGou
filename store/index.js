import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		userInfo:{
			face: '../../static/HM-PersonalCenter/face.jpeg',
			username: "VIP会员10240",
			integral: "1435",
			uid:'678687'
		},
		cartnum:0
    },
    mutations: {
        login(state, userInfo) {
            state.userInfo = userInfo;
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})

export default store
