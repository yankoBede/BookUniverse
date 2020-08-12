# Book Universe #

This is a simple React project used for educational purposes only. It is a website oriented to the books fans. Here they can find brief information about a lot of books and have the opportunity to add a new movie to the site or leave a comment on an existing one. They can like/unlike books which are not created by them. Also they can edit/delete the books created by them. The 5 most favourite books are listed after successful login in the site. Also they can navigate to all the books in the site, these ones added by them and their favourite ones. 

The project consists of several pages. Unauthenticated users have an access to: 
  - welcome page
  - login
  - register
  - top 5 read books page
  - book details pages
Authenticated users have an access to: 
  - top 5 read books page
  - add new book page
  - book details pages with ability to leave comments 
  - edit a book pahe
  - edit a comment page
  - favourite book page 
  - books added by them page

All of the pages are constructed using react components. All of them are functional components except the Error Boundary one.

The backend part is achieved using REST api with MongoDB.

The essential functionlity is covered with UI e2e tests using Cypress. 
