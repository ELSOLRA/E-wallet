
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from 'react-router-dom'
import AddCardPage from './pages/AddCardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      < Route path='/' element={<HomePage />} />
      < Route path='/addcard' element={<AddCardPage />} />
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