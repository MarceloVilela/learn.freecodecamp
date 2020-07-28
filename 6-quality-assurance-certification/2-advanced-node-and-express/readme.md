# Advanced Node and Express

## Implementation of Social Authentication

>deprecated midllewares
app.use(express.cookieParser(process.env.SESSION_SECRET));
<https://github.com/senchalabs/connect#middleware/>
<https://www.npmjs.com/package/cookie-parser/>
var cookieParser = require('cookie-parser')
app.use(cookieParser())

---

>social auth
<https://www.npmjs.com/package/passport>
<http://www.passportjs.org/packages/passport-github/>

---

>manager oauth app (Client ID, Client Secret, callback URL)
<https://github.com/settings/developers>