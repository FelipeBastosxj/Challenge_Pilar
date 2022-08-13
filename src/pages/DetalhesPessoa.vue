<template>
  <q-page class="column flex flex-center absolute-center">
    <q-dialog
      v-model="modal"
      :persistent="true"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="column" style="width: 800px; height: 705px">
        <div class="row justify-center" style="height: 30%; width: 100%">
          <q-avatar
            style="height: 150px; width: 150px"
            class="q-mt-sm row justify-center"
          >
            <img :src="informacoes.foto" />
          </q-avatar>
          <q-icon
            class="cursor"
            name="close"
            size="md"
            color="red"
            @click="voltar"
          />
        </div>
        <div style="width: 100%" class="row q-mt-xl">
          <div class="q-ml-sm" style="width: 50%">
            <p class="text-bold">Nome:</p>
            <span
              >{{ informacoes.primeiroNome }}
              {{ informacoes.segundoNome }}</span
            >
          </div>
          <div style="width: 45%">
            <p class="text-bold">E-mail:</p>
            <span>{{ informacoes.email }}</span>
          </div>
        </div>
        <div style="width: 100%" class="row q-mt-md">
          <div class="q-ml-sm" style="width: 50%">
            <p class="text-bold">Gênero:</p>
            <span>{{ informacoes.genero }} </span>
          </div>
          <div style="width: 45%">
            <p class="text-bold">Data de nascimento:</p>
            <span>{{
              informacoes.nascimento
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")
            }}</span>
          </div>
        </div>
        <div style="width: 100%" class="row q-mt-md">
          <div class="q-ml-sm" style="width: 50%">
            <p class="text-bold">Telefone:</p>
            <span>{{ informacoes.telefone }} </span>
          </div>
          <div style="width: 45%">
            <p class="text-bold">Nacionalidade:</p>
            <span>{{ informacoes.nacionalidade }}</span>
          </div>
        </div>
        <div class="q-mt-md" style="width: 100%">
          <div class="column justify-center">
            <p style="margin: 0 auto" class="text-bold text-h6">Endereço:</p>
            <div class="row q-mt-md justify-around">
              <div class="col-3" v-if="informacoes.endereco.street">
                <p class="text-bold">Rua:</p>
                <span class="col-2"
                  >{{ informacoes.endereco.street.name }},{{
                    informacoes.endereco.street.number
                  }}
                </span>
              </div>
              <div class="col-2">
                <p class="text-bold">Cidade:</p>
                <span>{{ informacoes.endereco.city }} </span>
              </div>
              <div class="col-2">
                <p class="text-bold">Estado:</p>
                <span>{{ informacoes.endereco.state }} </span>
              </div>
              <div class="col-2">
                <p class="text-bold">Pais:</p>
                <span>{{ informacoes.endereco.country }} </span>
              </div>
            </div>
          </div>
        </div>

        <div style="width: 100%" class="row q-pt-md">
          <div style="width: 50%" class="col-2 q-ml-sm">
            <p class="text-bold">Compartilhar:</p>
            <span style="width: 50%">
              <q-btn color="primary" label="copiar Link" @click="copiar"
            /></span>
          </div>
          <div class="col-2" style="width: 45%">
            <p class="text-bold">Número de identificação:</p>
            <span style="margin: 0 auto">{{ informacoes.identificacao }}</span>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "DetalhesPessoa",

  setup() {
    const route = useRoute();
    const modal = ref(true);
    const id = route.params.id;
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const informacoes = ref({
      primeiroNome: "",
      segundoNome: "",
      foto: "",
      email: "",
      genero: "",
      nascimento: "",
      telefone: "",
      nacionalidade: "",
      endereco: "",
      numeroCasa: "",
    });

    const getPessoa = async () => {
      try {
        if (!store.state.http.dados) {
          await store.dispatch("http/salvarDados");
        }

        let dados = await store.state.http.dados.find((e) => {
          return e.id.value == route.params.id;
        });

        if (!dados) {
          $q.notify({
            message: "Usuario não encontrado",
            color: "negative",
          });
        }

        informacoes.value.foto = await dados.picture.large;
        informacoes.value.primeiroNome = await dados.name.first;
        informacoes.value.segundoNome = await dados.name.last;
        informacoes.value.email = await dados.email;
        informacoes.value.genero = await dados.gender;
        informacoes.value.nascimento = await dados.dob.date;
        informacoes.value.telefone = await dados.phone;
        informacoes.value.nacionalidade = await dados.nat;
        informacoes.value.endereco = await dados.location;
        informacoes.value.identificacao = await dados.id.value;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(getPessoa);

    const voltar = async () => {
      router.push({ name: "principal" });
    };

    const copiar = async () => {
      let link = window.location.href;
      await navigator.clipboard.writeText(link);
      $q.notify({
        message: "Link copiado com sucesso",
        color: "positive",
      });
    };

    return {
      id,
      modal,
      getPessoa,
      informacoes,
      voltar,
      copiar,
    };
  },
});
</script>

<style scoped>
p {
  margin-bottom: 3px;
}

.cursor {
  cursor: pointer;
  padding-left: 90%;
  position: absolute;
}
</style>