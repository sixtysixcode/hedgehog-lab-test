# Welcome to my Hedgehog Lab Tech Test

## Technologies

### React with Typescript

- I have some experience with Typescript, I would love some specific feedback on any areas for improvement in regards to typing/interfaces etc.
- Routes are under /pages, re-usable components are under /components.
- I formatted the codebase using Prettier and formatted imports using the 'sort-imports' extension in VSCode.

### SCSS for styling

- I created /\_utils.scss to hold theme colours/re-usable classes for common elements such as buttons/icons/fonts.
- Component specific scss files we're created for additional styling.
- I took hex codes from elements on the Hedgehog Lab website and applied them to elements within this project.
- The application is fully responsive, achieved using a mixture of flexbox, rem values and media queries where necessary.
- I used toastify for notifications (you'll see these when you perform actions such as logging in and registering or deleting a user).

### LocalStorage for holding Auth Token

- I created a private route which relies on the existence of the token in LocalStorage.
- This token is cleared on logout.

### User flow

- Registering a new user successfully will redirect you to /login. Logging in successfully will redirect you to '/' which will display the Private Route (<Home /> component).
- You can add new users, delete users and browse users with the pagination element below the user table.
