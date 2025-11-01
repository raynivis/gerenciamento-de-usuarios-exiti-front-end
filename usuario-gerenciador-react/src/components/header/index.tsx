function Header() {
     return (
          <header className="bg-gray-700 shadow-md">
               <nav className="flex items-center justify-between px-1 py-1">
                    <div className="flex items-center ps-60">
                         <img
                              src="/exitifull2.svg"
                              alt="Logo"
                              width="100"
                              className="cursor-pointer"
                         />
                    </div>
               </nav>
          </header>
     );
}

export default Header;
