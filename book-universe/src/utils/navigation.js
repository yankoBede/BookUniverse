const getNavigation = (user) => {
  const authLinks = [
    {
      title: "Home",
      link: "/",
      position: "left"
    },
    {
      title: "Add a new book",
      link: "/addBook",
      position: "left"
    },
    {
      title: "My favourite books",
      link: "/liked",
      position: "left"
    },
    {
      title: "All books",
      link: "/all",
      position: "left"
    },
    {
      title: `Hello,  ${ user ? user.username : null}`,
      link: "/myBooks",
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
      title: "Home",
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