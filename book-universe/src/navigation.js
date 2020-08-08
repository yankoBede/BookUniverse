import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import BooksList from './pages/books-list'
import FavouriteBooksList from './pages/favourite-books'
import AddedByMeBooksList from './pages/my-books'
import TopBooksList from './pages/top-books'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ErrorPage from './pages/error'
import AddNewBook from './pages/add-book'
import BookDetails from './pages/book-details'
import EditCommentPage from './pages/edit-comment'
import EditBookPage from './pages/edit-book'

const Navigation = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/all" exact component={BooksList} />
        <Route path="/" exact component={TopBooksList} />
        <Route path="/liked" exact component={FavouriteBooksList} />
        <Route path="/myBooks" exact component={AddedByMeBooksList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/addBook" component={AddNewBook} />
        <Route path="/books/:bookId" exact component={BookDetails}/> 
        <Route path="/books/:bookId/edit" exact component={EditBookPage}/> 
        <Route path="/books/:bookId/comment/:commentId" component={EditCommentPage}/> 
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation