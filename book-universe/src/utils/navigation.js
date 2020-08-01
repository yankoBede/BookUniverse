const getNavigation = (user) => {
  const authLinks = [
    {
      title: "Add a new book",
      link: "/addBook",
      position: "left"
    },
    {
      title: `Hello,  ${ user ? user.username : null}`,
      link: "/",
      position: "right"
    },
    {
      title: "Logout",
      link: "/",
      position: "right"
    }
  ]

  const guestLinks = [
    {
      title: "Books",
      link: "/",
      position: "left"
    },
    {
      title: "Register",
      link: "/register",
      position: "right"
    },
    {
      title: "Login",
      link: "/login",
      position: "right"
    }
  ]

    const loggedIn = user && user.loggedIn
    return loggedIn ? authLinks : guestLinks
  }
  
  export default getNavigation