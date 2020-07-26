import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import BookList from './pages/books-list'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ErrorPage from './pages/error'
import AddNewBook from './pages/add-book'
import BookDetails from './pages/book-details'
import AddCommentPage from './pages/add-comment'

const Navigation = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={BookList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/addBook" component={AddNewBook} />
        <Route path="/books/:id" component={BookDetails}/> 
        <Route path="/books/:id/comment" component={AddCommentPage}/> 
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation