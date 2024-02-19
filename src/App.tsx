import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from 'react-router-dom'
import AddCardPage from './pages/AddCardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';


  // <Route>
  //   {/* <Route path="/" element={<RootLayout />}> */}
  //     <Route index element={<HomePage />} />
  //     <Route path="/pages" element={<AddCardPage/>} />
  //     <Route path="/pages" element={<ErrorPage />} />
  //  {/* </Route>  */}
  // </Route>

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      < Route path='/' element={<HomePage />} />
      < Route path='/add-card' element={<AddCardPage />} />
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