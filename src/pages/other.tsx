import type { NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../../types/page'
import AppLayout from '../components/Layouts/AppLayout'

const Other: Page = () => {
  return <div>
    <Link href="/"><a>Another CUM</a></Link>
    <Link href="/login"><a>Login</a></Link>
  </div>
}

Other.Layout = AppLayout;

export default Other

