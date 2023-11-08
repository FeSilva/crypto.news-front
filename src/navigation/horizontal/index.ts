// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Noticias',
    path: '/news',
    auth: false,
    icon: 'tabler:news'
  },
  {
    title: 'Mercado Cripto',
    path: '/coin-ranking',
    auth: false,
    icon: 'tabler:quality'
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
    auth: false,
    title: 'Gráficos de Mercado',
    icon: 'tabler:shield'
  },
  {
    path: '/wallet-test',
    action: 'read',
    subject: 'acl-page',
    auth: false,
    title: 'Portfolio Balance Test',
    icon: 'tabler:shield'
  }
]

export default navigation
