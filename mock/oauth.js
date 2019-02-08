const clientDetails = [
  {
      "clientId": "81bcc3e1-b698-425b-be76-b415daefb1a7",
      "clientName": "QQ",
      "authorizedGrantTypes": [
          "password",
          "implicit"
      ],
      "scoped": true,
      "scope": [
          "user:read"
      ],
      "resourceIds": [],
      "clientSecret": "{pbkdf2}26c3ef9e67659d9dd16fa90d18539d2966c06e25793f02d903c3dc6b102ca3125936461dce16ccbf",
      "authorities": [
          {
              "authority": "NOTIFY"
          },
          {
              "authority": "ADMIN"
          }
      ],
      "registeredRedirectUri": [
          "http://localhost:8085/login"
      ],
      "accessTokenValiditySeconds": 7200,
      "refreshTokenValiditySeconds": null,
      "additionalInformation": {},
      "password": "{pbkdf2}26c3ef9e67659d9dd16fa90d18539d2966c06e25793f02d903c3dc6b102ca3125936461dce16ccbf",
      "secretRequired": true
  },
  {
      "clientId": "8978d06e-1484-4513-a711-5a4a361031ba",
      "clientName": '淘宝',
      "authorizedGrantTypes": [
          "client_credentials"
      ],
      "scoped": true,
      "scope": [
          "cart:read"
      ],
      "resourceIds": [],
      "clientSecret": "{pbkdf2}8db5fe5917e53a07d81fce6eeea2db50194f5921c4db3f136123f6f3212339f661e0b6b56fafac96",
      "authorities": [
          {
              "authority": "ADMIN"
          }
      ],
      "registeredRedirectUri": [
          "http://localhost:8084/login"
      ],
      "accessTokenValiditySeconds": 7200,
      "refreshTokenValiditySeconds": null,
      "additionalInformation": {},
      "password": "{pbkdf2}8db5fe5917e53a07d81fce6eeea2db50194f5921c4db3f136123f6f3212339f661e0b6b56fafac96",
      "secretRequired": true
  },
  {
      "clientId": "28c25d18-533a-4e9c-92a1-fe8ddec352d1",
      "clientName": '微信',
      "authorizedGrantTypes": [
          "authorization_code",
          "client_credentials"
      ],
      "scoped": true,
      "scope": [
          "cart:read"
      ],
      "resourceIds": [],
      "clientSecret": "{pbkdf2}8db5fe5917e53a07d81fce6eeea2db50194f5921c4db3f136123f6f3212339f661e0b6b56fafac96",
      "authorities": [
          {
              "authority": "PUBLISH"
          }
      ],
      "registeredRedirectUri": [
          "http://localhost:8088/login"
      ],
      "accessTokenValiditySeconds": 1800,
      "refreshTokenValiditySeconds": null,
      "additionalInformation": {},
      "password": "{pbkdf2}8db5fe5917e53a07d81fce6eeea2db50194f5921c4db3f136123f6f3212339f661e0b6b56fafac96",
      "secretRequired": true
  }
]

const getClientDetails = (req, res) => {
    return res.json({
        list: clientDetails,
        pagination: {
            total: clientDetails.length,
            pageSize: 20,
            current: 1
        },
    });
}

// {
//     "resourceIds": null,
//     "authorities": "ADMIN,NOTIFY",
//     "accessTokenValiditySeconds": 7200,
//     "refreshTokenValiditySeconds": null,
//     "additionalInformation": "",
//     "scope": "user:read",
//     "authorizedGrantTypes": "password",
//     "registeredRedirectUri": null,
//     "scoped": true,
//     "secretRequired": true
// }

const postClientDetails = (req, res, u, b) => {

    const body = (b && b.body) || req.body;
    const clientId =  Math.floor(Math.random() * 1000000000);
    const clientSecret =  Math.floor(Math.random() * 1000000000);
    const { resourceIds, accessTokenValiditySeconds, refreshTokenValiditySeconds, secretRequired,
        additionalInformation, scope, scoped, authorizedGrantTypes,
        authorities, registeredRedirectUri, clientName } = body;
    // clientDetails.push({
    //     clientName,
    //     clientId,
    //     clientSecret,
    //     resourceIds,
    //     accessTokenValiditySeconds,
    //     refreshTokenValiditySeconds,
    //     additionalInformation,
    //     scope: scope.split[','],
    //     scoped: eval(scoped),
    //     authorizedGrantTypes: authorizedGrantTypes.split(','),
    //     authorities: authorities.split(',').map(v => { authority: v }),
    //     registeredRedirectUri: registeredRedirectUri.split(','),
    //     secretRequired: eval(secretRequired),
    // });
    const first = clientDetails[0];
    clientDetails.push({
        ...first,
        clientId,
        clientName,
    });
    return res.json({
        clientId,
        clientSecret,
        list: clientDetails,
        pagination: {
            total: clientDetails.length,
            pageSize: 20,
            current: 1
        },
    });
}

export default {
  'GET /api/client': getClientDetails,
  'POST /api/client': postClientDetails,
}