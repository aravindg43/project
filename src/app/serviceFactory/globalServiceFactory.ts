import { apiClient } from "./SessionTokenServiceFactory";

interface LoginPayload {
  context: string;
  ipAddress: string;
  password: string;
  systemId: string;
  userAgent: string;
  userName: string;
}

const GlobalServiceFactory = {
  memberLogin(requestData: LoginPayload): Promise<any> {
    return apiClient.post(
      "/DotComServices/misc/blueLogin/authenticate",
      requestData,
      {
        headers: {
          "Api-Key": "DOTCOM-WEB",
          "Content-Type": "application/json",
        },
      }
    );
  },

  getImage(id: string): Promise<any> {
    return apiClient.get(
      `https://cdn.contentful.com/spaces/byx14qhson65/assets/${id}`,
      {
        headers: {
          Authorization: `Bearer RPiW4kyE_91Kn-AYgN9_rZ719Kug9gyXrRoKhtXFYR4`,
        },
      }
    );
  },
};

export default GlobalServiceFactory;