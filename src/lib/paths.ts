export const paths = {
  // public / landing
  home: {
    label: `Home`,
    path: () => `/`,
  },
  // protected / app
  app: [
    {
      label: `Dashboard`,
      path: () => `/dashboard`,
    },
    {
      label: `Account`,
      path: () => `/account`,
    },
  ],
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
