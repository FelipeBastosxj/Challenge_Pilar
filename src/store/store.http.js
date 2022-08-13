import axios from "../http/index";

const state = {
    dados: false,
};

const mutations = {
    injectData(state, data) {
        state.dados = data;
        sessionStorage.dados = JSON.stringify(data)
    },
};

const actions = {
    listar: async ({ commit }, { quantidade, page, genero }) => {
        let seed = "abc"

        if (genero != "") {
            seed = ""
        }

        let resposta = await axios.get("", {
            params: {
                results: quantidade,
                seed: seed,
                gender: genero
            }
        })

        commit("injectData", resposta.data.results);
        return resposta
    },
    salvarDados: async ({ commit },) => {

        commit("injectData", JSON.parse(sessionStorage.dados));

    },

}

export const http = {
    namespaced: true,
    actions,
    mutations,
    state
};