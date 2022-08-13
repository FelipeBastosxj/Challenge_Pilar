<template>
  <q-page class="column flex flex-center">
    <q-page-container>
      <router-view />
    </q-page-container>

    <table-component
      :filter="pesquisa"
      :expandir="expandir"
      :genero="genero"
      @loading="changeLoading"
    >
      <template #filtro>
        <q-input
          style="width: 80%"
          class="q-mb-md"
          v-model="pesquisa"
          label="Pesquisar paciente"
          dense
          outlined
        >
          <template v-slot:append>
            <q-icon name="person" />
          </template>
        </q-input>
      </template>
      <template #genero>
        <q-select
          style="width: 18%"
          class="q-ml-sm"
          v-model="genero"
          :options="options"
          label="Genero"
          dense
          map-options
          emit-value
          outlined
        />
      </template>
    </table-component>
    <q-btn
      class="q-mb-md"
      flat
      style="color: #ff0080"
      label="Loading More"
      icon="refresh"
      :loading="loading"
      @click="expandir += 50"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
  </q-page>
</template>

<script>
import tableComponent from "../components/TableComponent.vue";
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    tableComponent,
  },
  setup() {
    const pesquisa = ref("");
    const expandir = ref(50);
    const loading = ref(false);
    const genero = ref("");

    const changeLoading = async (value) => {
      loading.value = value;
    };

    return {
      pesquisa,
      expandir,
      loading,
      changeLoading,
      genero,
      options: [
        {
          label: "Todos",
          value: "",
        },
        {
          label: "Homem",
          value: "male",
        },
        {
          label: "Mulher",
          value: "female",
        },
      ],
    };
  },
});
</script>
