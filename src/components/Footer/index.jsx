import logo from '../../assets/amazon_logo.svg'

export default function Footer() {

  return (
    <footer className="absolute bottom-4 left-[45%] p-4 flex justify-center items-center flex-col gap-2">
        <img src={logo} width={75} alt="logo" />
        <p>© 1990-2025 by IMDb.com, Inc.</p>        
    </footer>
  )
}

