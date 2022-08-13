<template>
  <div style="width: 80%" class="q-pa-md q-mt-xl">
    <div class="row">
      <slot name="filtro" class="col-4"></slot>
      <slot name="genero" class="col-2"></slot>
    </div>

    <q-table
      class="tabela"
      :rows="rows"
      table-header-class="bg-secondary text-width-bold"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[0]"
    >
      <template #body-cell-name="props">
        <q-td>
          {{ props.row.name.first }}
        </q-td>
      </template>
      <template #body-cell-gender="props">
        <q-td>
          {{ props.row.gender }}
        </q-td>
      </template>
      <template #body-cell-dob="props">
        <q-td>
          {{ props.row.dob.date.split("T")[0].split("-").reverse().join("/") }}
        </q-td>
      </template>
      <template #body-cell-location="props">
        <q-td>
          {{ props.row.location.country }}
        </q-td>
      </template>
      <template #body-cell-details="props">
        <q-td>
          <q-btn
            round
            color="primary"
            icon="info"
            :disable="!props.row.id.value"
            @click="detalhes(props.row.id.value)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name.first,
    sortable: true,
  },
  {
    name: "nat",
    required: true,
    label: "Nacionalidade",
    align: "left",
    field: (row) => row.nat,
    sortable: true,
  },
  {
    name: "gender",
    align: "center",
    align: "left",
    label: "Gender",
    field: "gender",
    sortable: true,
  },
  { name: "dob", label: "Birth", align: "left", field: "dob", sortable: true },
  { name: "location", label: "Location", align: "left", field: "location" },
  { name: "details", label: "Details", align: "left", field: "details" },
];

export default {
  props: {
    filter: {
      type: String,
      default: "",
    },
    expandir: {
      type: Number,
    },
    genero: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    name: "TableComponent";

    const store = useStore();
    const rows = ref([]);
    const router = useRouter();

    const listar = async (quantidade = 50) => {
      emit("loading", true);
      try {
        let resposta = await store.dispatch("http/listar", {
          quantidade,
          genero: props.genero,
        });

        rows.value = resposta.data.results;
        emit("loading", false);
      } catch (error) {
        emit("loading", false);
        console.log(error);
      }
    };

    const detalhes = async (id) => {
      router.push({ name: "detalhes", params: { id: id } });
    };

    watch(
      () => props.genero,
      () => {
        listar();
      }
    );

    watch(
      () => props.expandir,
      () => {
        listar(props.expandir);
      }
    );
    onMounted(listar);
    return {
      columns,
      rows,
      listar,
      detalhes,
    };
  },
};
</script>