import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { GiHelp } from "react-icons/gi";
import { AiOutlineSearch, } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthContext";

export default function MainNavBar({ sticky }) {
  const [openNav, setOpenNav] = useState(false);

  const auth = useAuthContext()

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* recherche  */}
      <div className="hidden md:flex items-center gap-2">
        <div className="relative hidden lg:block">
          <input type="text" placeholder="Recherchez un article" className="m-0 rounded-lg border border-gray-200 p-2 text-xs font-sans w-full lg:w-64 focus:border-primary outline-none" />
          <button><AiOutlineSearch size="20" className='absolute z-10 top-2 right-2 text-primary' /></button>
        </div>
        <button className="rounded bg-primary w-auto shadow text-white hover:bg-blue-600 p-2 text-xs">Rechercher</button>
      </div>
      {/* recherche  */}

      {/* Compte utilisateur  */}
      <Menu placement="bottom-start">
        <MenuHandler>
          <button className='flex items-center gap-1 p-1 rounded text-gray-700 hover:text-primary'>
            <FaUserAlt />
            <Typography
              as="li"
              variant="small"
              // color="blue-gray"
              className="p-1 font-normal"
            >
              <a href="#" className="flex items-center">
                Compte
              </a>
            </Typography>
            <FaAngleDown />
          </button>
        </MenuHandler>
        <MenuList className='z-20'>
          <MenuItem className={auth.isAuthenticated ? 'hidden' : 'inline'}>
            <Link to="/login">Connexion</Link>
          </MenuItem>
          <MenuItem className={auth.isAuthenticated ? 'hidden' : 'inline'}>
            <Link to="/register">Créer un compte</Link>
          </MenuItem>
          <MenuItem className={auth.isAuthenticated ? 'inline' : 'hidden'}>
            <Link to="/dashboard">Tableau de bord</Link>
          </MenuItem>
          <MenuItem className={auth.isAuthenticated ? 'inline' : 'hidden'} onClick={() => { auth.setIsAuthenticated(false) }}>Déconnexion</MenuItem>
        </MenuList>
      </Menu>

      {/* Aide  */}
      <Menu placement="bottom-start">
        <MenuHandler>
          <button className='flex items-center gap-1 p-1 rounded text-gray-700 hover:text-primary'>
            <GiHelp />
            <Typography
              as="li"
              variant="small"
              className="p-1 font-normal"
            >
              <a href="#" className="flex items-center">
                Aide
              </a>
            </Typography>
            <FaAngleDown />
          </button>
        </MenuHandler>
        <MenuList className='z-20'>
          <MenuItem>Centre d'assistance</MenuItem>
          <MenuItem>Contact</MenuItem>
          <MenuItem>conditions d'utilisation</MenuItem>
          <MenuItem>politique de confidentialité</MenuItem>
        </MenuList>
      </Menu>

      {/* Panier  */}
      <Link to="/cart">
        <div className="flex gap-2 items-center text-gray-700 hover:text-primary hover:bg-gray-50">
          <div className="relative">
            <CgShoppingCart />
            <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-primary text-white flex items-center justify-center font-bold" style={{ fontSize: "0.5em" }}>2</span>
          </div>
          <span>Panier</span>
        </div>
      </Link>
    </ul>
  );

  return (
    <>
      <Navbar className={`mx-auto max-w-screen-xl ${sticky && 'fixed'} z-10 top-0 rounded-none bg-opacity-100 shadow-sm`}>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <NavLink href="/">
              <img src="/favicon.png" alt="click Resto" className="w-12"/>
            </NavLink>
          </Typography>

          <div className="hidden lg:block">{navList}</div>

          <div className="lg:hidden flex gap-2 items-center">
            <IconButton
              variant="text"
              className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>

          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        </Collapse>
      </Navbar>
    </>
  );
}