
const { v4: uuidv4} = require('uuid')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
// const argon = require('argon2');
// const bcrypt = require('bcrypt');
const validator = require('validator');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { userExists, validRegQuery, insertUser, validLoginQuery, getUserData, insertNote, getAllNotes, deleteNote, getAllUserNotes, searchNotesWith } = require('./queries.js');


// cookie config
const cookieConfig = {
    httpOnly: true,
    // secure: true,
    maxAge: 50000,
    sameSite: 'lax'
}



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public') );
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());



// cookie sessions to manage those logged in 
const SESSIONS = {}


// hashing + salting 

// setting bcrypt up
const hashSalt = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch(err) {
        console.error(err)
    }
}


const verifiedPass = async(hashedValue, value) => {
    try {
        const res = await bcrypt.compare(value, hashedValue)
        return res;
    } catch(err) {
        console.error(err);
        return false;
    }
}


// returns hashed and salted version of password
// const hashSalt = async (value) => {
//     try {
//         const hash = await argon2.hash(value);
//         return hash;
//     } catch(err) {
//         console.error(err)
//     }
// }

// checks password entered matches with one in db, returns boolean 
// const verifiedPass = async(hashedValue, value) => {
//     try {
//         return argon2.verify(hashedValue, value)
//     } catch(err) {
//         console.error(err)
//         return false;
//     }
// }





app.get('/', async (req, res) => {

    const sessionId = req.cookies.sessionId;
    const sessionUsername = SESSIONS[sessionId];
    const validUser = await userExists(sessionUsername);

    if (validUser === true) {
        const allNotesData = await getAllNotes()
        const allNotes = allNotesData.rows
        return res.render('pages/home', { notes: allNotes });
    } else {
        return res.render('pages/welcome');
    }

})

app.get('/welcome', async (req, res) => {
    const sessionId = req.cookies.sessionId;
    const sessionUsername = SESSIONS[sessionId];
    const validUser = await userExists(sessionUsername);

    if (validUser === true) {
        const allNotesData = await getAllNotes()
        const allNotes = allNotesData.rows
        return res.render('pages/home', { notes: allNotes });
    } else {
        return res.render('pages/welcome');
    }
})

app.get('/reg-error', (req, res) => {
    let errMessage = 'Unsuccessful registration, please try again'
    return res.render('pages/error', { errMessage });
})

app.get('/login-error', (req, res) => {
    let errMessage = 'Unsuccessful login, please try again'
    return res.render('pages/error', { errMessage });
})

app.get('/register', async (req, res) => {
    const sessionId = req.cookies.sessionId;
    const sessionUsername = SESSIONS[sessionId]
    const validUser = await userExists(sessionUsername)

    if (validUser === true) {
        const allNotesData = await getAllNotes();
        const allNotes = allNotesData.rows
        return res.render('pages/home', { notes: allNotes });
    } else {
        return res.render('pages/register');
    }
})

app.post('/register', async (req, res) => {

    let { 
        username: username,
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        confirmPassword: confirmPassword } = req.body

    // check valid registration 
    try {
        const validRegData = await validRegQuery(username, email)
        if (validRegData === true) {
            try {
                let hashedPass = await hashSalt(password);
                insertUser(username, email, hashedPass);
                return res.redirect('/login');
            } catch(err) {
                console.error(err)
                return res.redirect('/error');
            }
        } else {
            return res.redirect('/error');
        }

    } catch(err) {
        return res.redirect('/error');
    }
})


app.get('/login', async (req, res) => {
    const sessionId = req.cookies.sessionId;
    const sessionUsername = SESSIONS[sessionId]
    const validUser = await userExists(sessionUsername)

    if (validUser === true) {
        const allNotesData = await getAllNotes();
        const allNotes = allNotesData.rows
        return res.render('pages/home', { notes: allNotes });
    } else {
        return res.render('pages/login');
    }
})

app.post('/login', async(req, res) => {

    // handling timing-based account enumeration
    // set random timeout before sending response to client
    function getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }
    let randomNum = getRandomTime(300, 800)

    let {
        username: username,
        password: password } = req.body

    try {

        const allNotesData = await getAllNotes();
        const allNotes = allNotesData.rows


        // check if user exists - if they do - check passwords by comparing hashed passwords, if not redirect to generic login message 
        let validUsername = await userExists(username)
        if (validUsername === true) {
            let userRow = await getUserData(username)
            let userData = userRow.rows[0]
            let storedPass = userData.password;
            let verifiedCreds = await verifiedPass(storedPass, password)
            if (verifiedCreds === true) {
                setTimeout(() => {
                    const nextSessionId = crypto.randomBytes(16).toString('base64');
                    res.cookie('sessionId', nextSessionId, cookieConfig);
                    SESSIONS[nextSessionId] = username;
                    return res.render('pages/home', { notes: allNotes });
                }, randomNum)
            } else {
                setTimeout(() => {
                    return res.redirect('/login-error');
                }, randomNum)

            }
        } else {
            setTimeout(() => {
                return res.redirect('/login-error');
            }, randomNum)
            
        }
    } catch(err) {
        setTimeout(() => {
            return res.redirect('/login-error');
        }, randomNum)
        
    }

})


app.get('/create', async(req, res) => {

    const sessionId = req.cookies.sessionId;
    const sessionUsername = SESSIONS[sessionId]
    const validUser = await userExists(sessionUsername)

    if (validUser === true) {
        return res.render('pages/create');
    } else {
        return res.render('pages/login');
    }
})

app.post('/create', async (req, res) => {
    try {

        let {
            name: wname,
            vintage: wyear,
            winery: winery, 
            location: origin,
            wineColor: color,
            berry: berry,
            citrus: citrus,
            stonefruit: stone_fruit,
            herbgrass: grassy,
            floral: floral,
            spicy: spicy,
            mineral: mineral,
            sweet: sweet,
            sour: sour,
            woody: woody,
            tannic: tannic,
            content: content } = req.body

        // validate the input - as to not allow XSS
        const vname = validator.escape(wname);
        const vyear = validator.escape(wyear);
        const vwinery = validator.escape(origin);
        const vcontent = validator.escape(content);


        // testing with hardcoded - fix when using cookies
        const sessionId = req.cookies.sessionId;
        const sessionUsername = SESSIONS[sessionId]
        const validUser = await userExists(sessionUsername)

        if (validUser === true){

            
            let post_id = uuidv4()
            
            insertNote(vname, vyear, vwinery, origin, color, berry, citrus, stone_fruit, grassy, floral, spicy, mineral, sweet, sour, woody, tannic, vcontent, sessionUsername, post_id);

            const allNotesData = await getAllNotes()
            const allNotes = allNotesData.rows
            return res.render('pages/home', { notes: allNotes})

        }

    } catch(err) {
        console.error(err);
        return res.redirect('/welcome');
    }

})




app.get('/manage', async (req, res) => {
    // get username from session cookie

    try {
        const sessionId = req.cookies.sessionId;
        const sessionUsername = SESSIONS[sessionId];
        const validUser = await userExists(sessionUsername);
    
        if (validUser === true) {
            const noteData = await getAllUserNotes(sessionUsername)
            const userNotes = noteData.rows
    
            res.render('pages/manage', { userNotes, username: sessionUsername });
        } else {
            res.render('pages/welcome');
        }
    } catch {
        console.error(err)
        return res.send('error')
    }

})


app.post('/delete', async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const sessionUsername = SESSIONS[sessionId];
        const validUser = await userExists(sessionUsername);

        let postToDelete = req.body
        const post_id = postToDelete.postId
        const post_username = postToDelete.postUsername

        if (validUser === true && sessionUsername === post_username) {
            deleteNote(post_username, post_id);
            const noteData = await getAllUserNotes(sessionUsername)
            const userNotes = noteData.rows
            res.render('pages/manage', { userNotes, username: sessionUsername });
        } else {
            res.render('pages/welcome');
        }

    } catch(err) {
        console.error(err)
        return res.send('error')
    }
})

app.get('/search', async(req, res) => {
    try {        
        const sessionId = req.cookies.sessionId;
        const sessionUsername = SESSIONS[sessionId];
        const validUser = await userExists(sessionUsername);

        if (validUser === true) {
            let { searchInput : search } = req.query;
            let escapedSearch = validator.escape(search);
            const searchResults = await searchNotesWith(escapedSearch);
            const searchData = searchResults.rows
            res.render('pages/searchresults', { searchData });
        } else {
            res.render('pages/welcome');
        }


    } catch(err) {
        return console.error(err)
    }
})

app.get('/logout', (req, res) => {
    // get and delete session cookies to logout person
    const sessionId = req.cookies.sessionId;
    delete SESSIONS[sessionId];
    res.clearCookie('sessionId');
    res.redirect('/');
    

})



app.listen(8080, () => console.log('Wine app is running on port 8080'));