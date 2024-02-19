import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from 'react-router-dom'
import AddCardPage from './pages/AddCardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
//Import av komponenterna
import Top from './components/top/Top';
import Button from './components/button/Button';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    < Route path='/' element={<HomePage />} />
    < Route path='/error' element={<ErrorPage />} />
    < Route path='/add-card' element={<AddCardPage />} />

    < Route path='/top' element={<Top />} />
    < Route path='/button' element={<Button />} />
  </Route>
)
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