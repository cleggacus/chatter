import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../../types/page'
import Auth from '../components/Auth'
import AppLayout from '../components/Layouts/AppLayout'

const Home: Page = () => {
  return <Link href="/other"><a>CUM</a></Link>
}

Home.Layout = AppLayout;

export default Home
