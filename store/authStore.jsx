import { create } from "zustand";
import { persist } from "zustand/middleware";



//persist가 새로고침해도 로그아웃이 안 된다.
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,//사용자정보
      token: null,//JWT 토큰
      isAuthenticated: false,//로그인여부

      //로그인처리
      login: (user, token) => {
        set({
          user, token, isAuthenticated: true
        });
      },

      //로그아웃처리
      logout:()=>{
        set({user:null,token:null,isAuthenticated:false});

      //추가로 로컬스토리지에서 삭제 (보안 강화)
      localStorage.removeItem("auth-storage");
    },

    //상태를 초기화하는 기능 추가
    reset:()=>{
      set({user:null,token:null,isAuthenticated:false});
    },
  }),
  {name:"auth-storage",//로컬스토리지 키 이름 
    getStorage:()=>localStorage,// 로컬스토리지 사용
  }
  )
);

export default useAuthStore;