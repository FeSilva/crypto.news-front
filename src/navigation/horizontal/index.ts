// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Noticias',
    path: '/news',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Mercado Cripto',
    path: '/coin-ranking',
    icon: 'tabler:mail'
  },
  {
    title: 'Exchanges',
    path: '/exchanges',
    icon: 'tabler:mail'
  },
  {
    path: '/Conversor',
    action: 'read',
    subject: 'acl-page',
    title: 'Conversor',
    icon: 'tabler:shield'
  },
  {
    path: '/calculators-impost',
    action: 'read',
    subject: 'acl-page',
    title: 'Calculadora de Imposto',
    icon: 'tabler:shield'
  },
  {
    path: '/market-charts',
    action: 'read',
    subject: 'acl-page',
    title: 'Gráficos de Mercado',
    icon: 'tabler:shield'
  },
  {
    path: '/AssetTesting',
    action: 'read',
    subject: 'acl-page',
    title: 'Teste em Carteira',
    icon: 'tabler:shield'
  }
]

export default navigation
