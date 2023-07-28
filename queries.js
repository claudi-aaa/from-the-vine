const pool = require('./db');



//  checks if user exists and returns boolean
const userExists = async(username) => {
    try {
        let userData = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
        if (parseInt(userData.rowCount) !== 0) {
            // console.log('true')
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.error(err)
        return false;
    }
}

// checks if registration information is already in system and returns boolean 
const validRegQuery = async(username, email) => {
    try {
        let validRegData = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $2`, [username, email]);
        if (parseInt(validRegData.rowCount) === 0 ) {
            console.log('valid reg true')
            return true;
        } else {
            console.log('invalid reg false')
            return false;
        }
    } catch(err) {
        console.error(err)
        return false;
    }
}

// inserts new user
const insertUser = async(username, email, password) => {
    try {
        const insertUserData = await pool.query(`INSERT INTO users(username, email, password, acc_created) VALUES($1, $2, $3, CURRENT_TIMESTAMP)`, [username, email, password])
    } catch(err) {
        console.error(err)
    }
}


// checks if valid login details (username and password match) returns boolean 
const validLoginQuery = async(username, password) => {
    try {
        const userData = await pool.query(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password])
        if (parseInt(userData.rowCount) !== 0) {
            return true;
        } else {
            return false;
        }
        // return userData;
    } catch(err) {
        console.error(err)
    }
}




// returns row if user exists 
const getUserData = async(username) => {
    try{
        const userData = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        return userData;
    } catch(err) {
        console.error(err)
    }
}


// insert new note as user 
const insertNote = async(wname, wyear, winery, origin, color, berry, citrus, stone_fruit, grassy, floral, spicy, mineral, sweet, sour, woody, tannic, content, username, post_id) => {
    try {
        let note1 = parseInt(berry)
        let note2 = parseInt(citrus)
        let note3 = parseInt(stone_fruit)
        let note4 = parseInt(grassy)
        let note5 = parseInt(floral)
        let note6 = parseInt(spicy)
        let note7 = parseInt(mineral)
        let note8 = parseInt(sweet)
        let note9 = parseInt(sour)
        let note10 = parseInt(woody)
        let note11 = parseInt(tannic)

        const newNote = await pool.query(`INSERT INTO notes(username, wname, wyear, winery, origin, color, berry, citrus, stone_fruit, grassy, floral, spicy, mineral, sweet, sour, woody, tannic, content, post_id, date_posted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, CURRENT_TIMESTAMP)`, [username, wname, wyear, winery, origin, color, note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11, content, post_id])
        return 'updated';
    } catch(err) {
        console.error(err)
    }
}

// retrieve all posts from all users 
const getAllNotes = async() => {
    try {
        const allNotes = await pool.query(`SELECT * FROM notes ORDER BY date_posted DESC`);
        return allNotes;
    } catch(err) {
        console.error(err)
    }
}

// get all notes from user 
const getAllUserNotes = async(username) => {
    try {
        const userNotes = await pool.query(`SELECT * FROM notes WHERE username = $1 ORDER BY date_posted DESC`, [username]);
        if (parseInt(userNotes.rowCount) !== 0) {
            return userNotes;
        } else {
            return null;
        }
    } catch(err) {
        console.error(err);
    }
}


// delete single post
const deleteNote = async (username, post_id) => {
    console.log(`username is: ${username}`)
    try {
        const delPost = await pool.query(`DELETE FROM notes WHERE username = $1 AND post_id = $2`, [username, post_id]);
        return;
    } catch(err){
        return console.error(err);

    }
} 


const searchNotesWith = async(keyword) => {
    try {
        let searchTerm = String('%' + keyword + '%')
        const allNotes = await pool.query(`SELECT * FROM notes WHERE content LIKE $1 OR username LIKE $2`, [searchTerm, searchTerm]);
        return allNotes;
    } catch(err){
        return console.error(err);
    }
}





module.exports = { userExists, validRegQuery, insertUser, validLoginQuery, getUserData, insertNote, getAllNotes, deleteNote, getAllUserNotes, searchNotesWith}