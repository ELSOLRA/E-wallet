import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from 'react-router-dom'
import AddCardPage from './pages/AddCardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Top from './components/top/Top';
import Button from './components/button/Button';

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<ErrorPage />}>
    < Route path='/' element={<HomePage />} />
    < Route path='/addcard' element={<AddCardPage />} />
    < Route path='/top' element={<Top />} />
    < Route path='/button' element={<Button />} />
  </Route>
)
)

function App() {
  return (
    <>
      < RouterProvider router={router} />
    </>
  )
}

export default App