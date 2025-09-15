import AccessEnum from "@/access/accessEnum";
import { getLoginUserUsingGet } from "@/api/userController";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  async function fetchLoginUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      // 防止重复获取未登录用户信息

      // 测试
      // setTimeout(() => {
      //   loginUser.value = {
      //     userRole: AccessEnum.ADMIN,
      //     id: 1,
      //     userName: "管理员",
      //   };
      // }, 3000);
      loginUser.value = { userRole: AccessEnum.NOT_LOGIN };
    }
  }

  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
