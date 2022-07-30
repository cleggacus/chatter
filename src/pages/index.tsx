import type { NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../../types/page'
import AppLayout from '../components/Layouts/AppLayout'

const Home: Page = () => {
  return <div>
    <Link href="/other"><a>CUM</a></Link>
  </div>
}

Home.Layout = AppLayout;

export default Home
