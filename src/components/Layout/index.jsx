import { Outlet } from 'react-router'
import Header from '../Header'
import Footer from '../Footer'

export default function Layout({isDarkMode, toggleTheme}) {

  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div>
        <Outlet />
      </div>  
      <Footer />  
    </>
  )
}

