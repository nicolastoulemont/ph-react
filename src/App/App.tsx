import { UploadForm, UploadedList } from './components'
import { InMemoryStoreProvider } from '../lib'

export function App() {
  return (
    <InMemoryStoreProvider>
      <main className='flex'>
        <UploadForm />
        <UploadedList />
      </main>
    </InMemoryStoreProvider>
  )
}
