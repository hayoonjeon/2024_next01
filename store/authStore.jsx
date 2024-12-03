import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null, //사용자정보
  token: null, //JWT 토큰 
  isAuthenticated: false, //로그인여부
  login: (user, token) => set({ user, token, isAuthenticated: true }), //로그인 성공시 처리
  logout: () => set({ user: null, token: null, isAuthenticated: false }), //로그아웃 성공시 처리 
}))

export default useAuthStore;
