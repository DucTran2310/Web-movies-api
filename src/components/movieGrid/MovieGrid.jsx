import React, { useEffect, useState } from 'react'

import './movieGrid.scss'
import { useParams } from 'react-router-dom'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import MovieCard from '../movieCard/MovieCard'
import { OutlineButton } from '../button/Button'

const MovieGrid = props => {

  const [items, setItems] = useState([])

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const { keyword } = useParams()

  useEffect(() => {
    const getList = async () => {
      let response = null

      if (keyword === undefined) {
        const params = {}
        switch (props.category) {
          case category.movie:
            // Nếu category là movie thì trả về list movie upcoming
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
            break
          default:
            // Còn mặc định là trả về list tv là popular
            response = await tmdbApi.getTvList(tvType.popular, { params })
        }
      } else {
        // Nếu search
        const params = {
          query: keyword
        }
        // Trả về result search
        response = await tmdbApi.search(props.category, { params })
      }
      setItems(response.results)
      setTotalPages(response.total_pages)
    }
    getList()
  }, [props.category, keyword])

  const loadMore = async () => {
    let response = null

    if (keyword === undefined) {
      const params = {
        page: page + 1
      }
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
          break
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params })
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword
      }
      response = await tmdbApi.search(props.category, { params })
    }
    // set lại item bằng các kết quả của search
    setItems([...items, ...response.results])
    setPage(page + 1)
  }

  return (
    <>
      <div className="movie-grid">
        {
          items.map((item, i) => <MovieCard category={props.category} item={item} key={i} />)
        }
      </div>
      {page < totalPages ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
        </div>
      ) : null}
    </>
  )
}

export default MovieGrid
