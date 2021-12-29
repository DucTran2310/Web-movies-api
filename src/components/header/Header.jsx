import React, { useRef, useEffect } from 'react'

import './header.scss'

import logo from '../../assets/tmovie.png'
import { Link, useLocation } from 'react-router-dom'

const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'TV Series',
    path: '/tv'
  }
]

const Header = () => {

  // useLocation sẽ trả về location object hiện tại.
  const { pathname } = useLocation()
  // useRef hook là một function trả về một object với thuộc tính current được khởi tạo thông qua tham số truyền vào.
  // Dùng useRef để truy cập DOM nodes hoặc React elements
  const headerRef = useRef(null)

  // Tìm phần tử đầu tiên thỏa mãn điều kiện
  const active = headerNav.findIndex(e => e.path === pathname)

  // mỗi khi có gì đó ảnh hưởng đến components của bạn thì dùng useEffect
  // useEffect chỉ gọi 1 lần khi render component
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink')
      } else {
        headerRef.current.classList.remove('shrink')
      }
    }
    window.addEventListener('scroll', shrinkHeader)
    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, [])

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">dMovies</Link>
        </div>
        <ul className="header__nav">
          {
            headerNav.map((e, i) => (
              <li key={i} className={`${i === active ? 'active' : ''}`}>
                <Link to={e.path}>
                  {e.display}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Header
