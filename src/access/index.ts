import AccessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
// 进入页面前，进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登入用户
  const loginUserStore = useLoginUserStore();
  const loginUser = loginUserStore.loginUser;
  // 当前页面需要的权限
  const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // 要跳转的页面必须登录
  if (needAccess !== AccessEnum.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AccessEnum.NOT_LOGIN
    ) {
      next(`/user/login/redirect=${to.fullPath}`);
    }
    // 如果已经登录，判断权限是否足够，如果不足，则跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
