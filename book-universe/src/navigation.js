import React, { useContext } from 'react'
import {
  BrowserRouter,
  Switch,
  Redirect,
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
import UserContext from './Context'

const Navigation = () => {
  const context = useContext(UserContext)
  const loggedIn = context.user && context.user.loggedIn
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={TopBooksList} />
        <Route path="/all">
          {!loggedIn ? (<Redirect to="/login" />) : (<BooksList />)}
        </Route>
        <Route path="/liked">
          {!loggedIn ? (<Redirect to="/login" />) : (<FavouriteBooksList />)}
        </Route>
        <Route path="/myBooks">
          {!loggedIn ? (<Redirect to="/login" />) : (<AddedByMeBooksList />)}
        </Route>
        <Route path="/login">
          {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
        </Route>
        <Route path="/register">
          {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
        </Route>
        <Route path="/addBook">
          {!loggedIn ? (<Redirect to="/login" />) : (<AddNewBook />)}
        </Route>
        <Route path="/books/:bookId" exact component={BookDetails}/> 
        <Route path="/books/:bookId/edit">
          {!loggedIn ? (<Redirect to="/login" />) : (<EditBookPage />)}
        </Route> 
        <Route path="/books/:bookId/comment/:commentId">
          {!loggedIn ? (<Redirect to="/login" />) : (<EditCommentPage />)}
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation