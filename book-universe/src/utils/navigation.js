const getNavigation = (loggedIn, user) => {

  const authLinks = [
    {
      title: "Add a new book",
      link: "/addBook",
      position: "left"
    },
    {
      title: `Hello,  ${ user ? user.username : "Azis"}`,
      link: "/",
      position: "right"
    },
    {
      title: "Logout",
      link: "/logout",
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
    console.log(loggedIn)
    return loggedIn ? authLinks : guestLinks
  }
  
  export default getNavigation