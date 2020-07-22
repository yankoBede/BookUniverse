const getNavigation = (userid) => {

    const links = [
      {
        title: "Books",
        link: "/",
        position: "left"
      },
      {
        title: "Add a new book",
        link: "/addBook",
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
  
    return links
  }
  
  export default getNavigation