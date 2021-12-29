import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import React, { Fragment } from 'react'
import './App.scss'

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Routes from './config/Routes'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/*"
          element={<GroupRouter />}
        />
      </Switch>
    </BrowserRouter>
  )
}

function GroupRouter(props) {
  return (
    <Fragment>
      <Header {...props} />
      <Routes />
      <Footer />
    </Fragment>
  )
}

export default App
