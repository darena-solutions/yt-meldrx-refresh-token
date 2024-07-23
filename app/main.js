import { UserManager } from "oidc-client-ts";

const mgr = new UserManager({
  client_id: '837533a4f7a044eab43ef4f81ab0bef3',
  redirect_uri: 'http://localhost:5173/signin-callback',
  authority: 'https://app.meldrx.com/',
  scope: 'openid patient/*.* offline_access',
  extraQueryParams: {
    'aud': 'https://app.meldrx.com/api/fhir/d2192fd3-e91c-4e13-808b-d78f4679b7f5'
  }
});

document.getElementById('signin-btn')
  .addEventListener('click', (event) => {
    mgr.signinRedirect()
  })

mgr.getUser().then(tokenResponse => {
  console.log(tokenResponse)

  document.getElementById('app').innerHTML = `
    <button id="refresh-btn">Refresh</button>
  `
  document.getElementById('refresh-btn')
    .addEventListener('click', (event) => {
      mgr.signinSilent()
    })
})
