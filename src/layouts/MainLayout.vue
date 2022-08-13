<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img
          src="../assets/company.png"
          fit="contain"
          style="width: 50px; height: 50px"
        />
        <q-toolbar-title class="column">
          <div>
            <p>Company</p>
          </div>
          <div class="text-subtitle2">
            {{ userData.displayName }}
          </div>
        </q-toolbar-title>

        <div class="container-left">
          <img
            class="profile"
            :src="userData.photoURL"
            alt=""
            referrerpolicy="no-referrer"
          />
          <q-icon name="logout" size="md" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../ultils/firebase";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const userData = ref("");
    const router = useRouter();
    const nivelAcc = ref("");
    const insertData = async () => {
      userData.value = JSON.parse(sessionStorage.user);
    };
    const logout = async () => {
      window.sessionStorage.clear();
      router.push({ name: "login" });
    };
    onMounted(insertData);
    return {
      userData,
      logout,
      nivelAcc,
    };
  },
});
</script>

<style scoped>
.profile {
  width: 30%;
  height: 30%;
  border-radius: 50%;
}
.container-left {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container-left .q-icon {
  cursor: pointer;
}

p {
  margin: 0;
}
</style>