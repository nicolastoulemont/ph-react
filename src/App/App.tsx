import { UploadForm, UploadedList } from './components'
import { InMemoryStoreProvider } from '../lib'

export function App() {
  return (
    <InMemoryStoreProvider>
      <main className='App'>
        <UploadForm />
        <UploadedList />
      </main>
    </InMemoryStoreProvider>
  )
}
