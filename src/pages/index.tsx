import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import trpc from '../utils/trpc'

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(['hello']);

  if(isLoading) {
    return <div>
      <h1>Loading</h1>
    </div>
  }

  if(error) {
    return <div>
      <h1>{JSON.stringify(error)}</h1>
    </div>
  }

  return <div className={styles.container}>
    <h1>{JSON.stringify(data)}</h1>
  </div>
}

export default Home
