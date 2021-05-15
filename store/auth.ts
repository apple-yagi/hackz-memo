import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CurrentUser } from '~/types/entity'
import { RootState } from '.'

export interface AuthState {
  currentUser: CurrentUser | null
}

export const state = (): AuthState => ({
  currentUser: null,
})

export type AuthModuleState = ReturnType<typeof state>

export const getters: GetterTree<AuthModuleState, RootState> = {
  isLogin: (state) => !!state.currentUser,
  uid: (state) => state.currentUser?.uid,
}

export const mutations: MutationTree<AuthModuleState> = {
  SET_USER(state, payload: CurrentUser) {
    state.currentUser = payload
  },

  RESET(state) {
    state.currentUser = null
  },
}

export const actions: ActionTree<AuthModuleState, RootState> = {
  onAuthStateChanged({ commit, getters, state }, { authUser, claims }) {
    if (!authUser) {
      commit('RESET')
      return
    } else if (getters.isLogin) {
      console.log(state.currentUser)
      return
    }
    commit('SET_USER', {
      uid: authUser.uid,
      displayName: authUser.displayName,
      photoUrl: authUser.photoURL,
    } as CurrentUser)
    console.log(state.currentUser)
  },

  async signIn({ commit }): Promise<void> {
    try {
      // Google認証用のプロバイダーを生成
      const provider = new this.$fireModule.auth.GoogleAuthProvider()

      // Google認証を実行
      const userCredential = await this.$fire.auth.signInWithPopup(provider)

      // ユーザー情報がない場合、例外を投げる
      if (userCredential.user === null) {
        throw 'empty user!'
      }

      // Stateにユーザー情報をセット
      const currentUser: CurrentUser = {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName as string,
        photoUrl: userCredential.user.photoURL as string,
      }
      commit('SET_USER', currentUser)

      // firestoreにログインしたユーザーの情報があるか確認しなければ、登録
      const user = await this.$userRepository.getById(userCredential.user.uid)
      if (user) return

      await this.$userRepository.store(currentUser)
    } catch (err) {
      alert(err)
    }
  },

  async signOut({ commit }): Promise<void> {
    try {
      await this.$fire.auth.signOut()
      commit('RESET')
    } catch (err) {
      alert(err)
    }
  },
}
