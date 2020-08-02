import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import BooksList from './pages/books-list'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ErrorPage from './pages/error'
import AddNewBook from './pages/add-book'
import BookDetails from './pages/book-details'
import EditCommentPage from './pages/edit-comment'

const Navigation = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={BooksList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/addBook" component={AddNewBook} />
        <Route path="/books/:bookId" exact component={BookDetails}/> 
        <Route path="/books/:bookId/comment/:commentId" component={EditCommentPage}/> 
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation