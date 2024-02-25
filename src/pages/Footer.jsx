import Logo from "../components/Logo"



function Footer(){
    return ( 
        <div>

<footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              <a href="#0" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Terms</a> · <a href="#0" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Privacy Policy</a>
              <div className="text-sm text-gray-600 mr-4">&copy; Errordeve. All rights reserved.</div>

            </div>
          </div>

       

          {/* Copyrights note */}
         

        </div>

      </div>
    </footer>
        </div>
    )
}
export default Footer;