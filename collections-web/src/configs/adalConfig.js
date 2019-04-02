import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'f9e89b27-f2ff-4029-8aaa-9900f608fcda',
  clientId: '7c3ef25a-74f6-48de-b04f-982eedf0a7a7',
  endpoints: {
    api: '7c3ef25a-74f6-48de-b04f-982eedf0a7a7',
  },
  cacheLocation: 'localStorage',
  redirectUri: 'http://devo.neadmedia.com:5081',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) => adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);