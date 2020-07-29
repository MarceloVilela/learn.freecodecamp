# Advanced Node and Express

## Implementation of Social Authentication

>deprecated midllewares
app.use(express.cookieParser(process.env.SESSION_SECRET));__
<https://github.com/senchalabs/connect#middleware/>__
<https://www.npmjs.com/package/cookie-parser/>__
var cookieParser = require('cookie-parser')__
app.use(cookieParser())

---

>social auth
<https://www.npmjs.com/package/passport>__
<http://www.passportjs.org/packages/passport-github/>__

---

>manager oauth app (Client ID, Client Secret, callback URL)
<https://github.com/settings/developers>