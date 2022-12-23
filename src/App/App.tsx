import { UploadForm, UploadedList } from './components'
import { InMemoryStoreProvider } from '../lib'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

export function App() {
  return (
    <InMemoryStoreProvider>
      <header className='flex py-6 px-9 font-bold text-2xl border-b-2 border-gray-100'>Photoroom test</header>
      <main className='flex'>
        <UploadedList />
        <UploadForm />
      </main>
      <ToastContainer
        position='top-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </InMemoryStoreProvider>
  )
}
