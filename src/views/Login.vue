<template>
  <div class="-mt-32">
    <div class="border-grey-light p-4">
      <div class="bg-white mx-auto max-w-sm shadow rounded-lg p-4">
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.6.0/firebaseui.css" />
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  </div>
</template>
<script>

import {auth, googleAuthProviderId, emailAuthProviderId} from '@/firebase'
import firebaseui from 'firebaseui'
export default {
  name: 'Login',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        googleAuthProviderId,
        emailAuthProviderId,
      ],
    }
    const ui = new firebaseui.auth.AuthUI(auth)
    ui.start('#firebaseui-auth-container', uiConfig)
  },
}
</script>
