export const paths = {
  // public / landing
  home: {
    label: `Home`,
    path: () => `/`,
  },
  // protected / app
  app: {
    dashboard: {
      label: `Dashboard`,
      path: () => `/app/dashboard`,
    },
    account: {
      label: `Account`,
      path: () => `/app/account`,
    },
  },
  // auth
  signup: {
    label: `Sign up`,
    path: () => `/signup`,
  },
  login: {
    label: `Log in`,
    path: () => `/login`,
  },
};
