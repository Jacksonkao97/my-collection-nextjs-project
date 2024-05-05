import Link from 'next/link'
import HomeSVG from '@/app/assets/homeSVG'
import ItemSVG from '@/app/assets/tableSVG'
import SettingSVG from '@/app/assets/settingSVG'

const NavBar = () => {
  return (
    <nav className="navbar bg-neutral rounded-box drop-shadow-xl w-full min-w-[400px]">
      <div className='navbar-start'></div>
      <div className="hidden navbar-center sm:block">
        <Link className="btn btn-ghost text-xl" href='/'>
          <h1 className='hidden sm:block'>My Collections</h1>
        </Link>
      </div>
      <div className="navbar-center sm:navbar-end gap-2">
        <Link className="btn btn-ghost btn-circle" href='/'>
          <div className="indicator">
            <HomeSVG />
          </div>
        </Link>
        <Link className='btn btn-ghost btn-circle' href='/item'>
          <div className="indicator">
            <ItemSVG />
          </div>
        </Link>
        <label className="cursor-pointer grid place-items-center">
          <input type="checkbox" value="dark" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
          <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
          <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>
      </div>
      <div className='navbar-end sm:hidden'></div>
    </nav>
  )
}

export default NavBar