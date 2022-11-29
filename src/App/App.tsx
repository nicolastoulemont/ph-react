import { UploadForm, UploadedList } from './components'
import { InMemoryStoreProvider } from '../lib'

export function App() {
  return (
    <InMemoryStoreProvider>
      <header className='flex py-6 px-9 font-bold text-2xl border-b-2 border-gray-100'>Photoroom test</header>
      <main className='flex'>
        <UploadedList />
        <UploadForm />
      </main>
    </InMemoryStoreProvider>
  )
}
