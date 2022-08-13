import { mount } from '@vue/test-utils'
import Table from '../../../src/components/TableComponent.vue'

describe('Testando propriedades da tabela', () => {
  it('Propriedade Filter', async () => {


    const wrapper = mount(Table)

    await wrapper.setProps({ filter: "filter passou" })


    expect(wrapper.props('filter')).toBe('filter passou')
  })
  it('Propriedade genero', async () => {


    const wrapper = mount(Table)

    await wrapper.setProps({ genero: "genero passou" })


    expect(wrapper.props('genero')).toBe('genero passou')
  })
  it('Testa se a expandir', async () => {


    const wrapper = mount(Table)

    await wrapper.setProps({ expandir: "expandir passou" })


    expect(wrapper.props('expandir')).toBe('expandir passou')
  })
})



describe('Testando variavel', () => {

  it('Verificando se a tabela existe', async () => {


    const wrapper = mount(Table)

    const tabela = await wrapper.find('.tabela')


    expect(tabela.exists()).toBe(true)
  })

  it('Verificando a variavel de linhas', async () => {


    const wrapper = mount(Table)



    expect(wrapper.vm.rows).toEqual([])

  })
})
