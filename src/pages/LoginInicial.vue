<template>
  <main class="base">
    <q-card class="my-card">
      <img src="../assets/coodesh.jpg" />
      <q-card-section class="column justify-center">
        <div class="row justify-center text-h6">Bem-Vindo a o desafio</div>
        <div class="row justify-center text-subtitle2">
          Clike no botão para fazer o login via google
        </div>
        <q-btn
          class="margin"
          color="red"
          icon-right="send"
          label="Efetuar o login via google"
          @click="login"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>
  </main>
</template>



<script>
import {
  autenticacao,
  signInWithRedirect,
  provider,
  GoogleAuthProvider,
  getRedirectResult,
} from "../ultils/firebase";
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginInicial",
  setup() {
    const router = useRouter();
    const login = async () => {
      signInWithRedirect(autenticacao, provider);
    };
    const getStatus = async () => {
      getRedirectResult(autenticacao)
        .then((result) => {
          if (result != null) {
            router.push({ name: "principal" });
          }
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          window.sessionStorage.credential = JSON.stringify(credential);
          window.sessionStorage.nivelAcc = "Padrão";
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          window.sessionStorage.user = JSON.stringify(user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };
    onMounted(getStatus);
    return {
      login,
      getStatus,
    };
  },
});
</script>

<style scoped>
.base {
  display: flex;

  height: 100vh;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: cover;
}
img {
  height: 520px !important;
  width: 700px !important;
}
.margin {
  margin-top: 50px;
}
.sub,
.tite {
  text-align: center;
}
</style>