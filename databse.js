// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('social_media.db', (err) => {
//     if (err) {
//         console.error('Error opening database ' + err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//     }
// });

// db.serialize(() => {
//     db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)");
//     db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, content TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))");
//     db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, content TEXT, post_id INTEGER, FOREIGN KEY(post_id) REFERENCES posts(id))");
//     db.run("CREATE TABLE IF NOT EXISTS likes (id INTEGER PRIMARY KEY, post_id INTEGER, FOREIGN KEY(post_id) REFERENCES posts(id))");
//     db.run("CREATE TABLE IF NOT EXISTS follows (id INTEGER PRIMARY KEY, follower_id INTEGER, following_id INTEGER, FOREIGN KEY(follower_id) REFERENCES users(id), FOREIGN KEY(following_id) REFERENCES users(id))");
// });

// module.exports = db;

const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('social_media.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables and indexes
db.serialize(() => {
    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE
        )
    `);

    // Create posts table
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            user_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    // Create comments table
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            post_id INTEGER,
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
    `);

    // Create likes table
    db.run(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER,
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
    `);

    // Create follows table
    db.run(`
        CREATE TABLE IF NOT EXISTS follows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            follower_id INTEGER,
            following_id INTEGER,
            FOREIGN KEY(follower_id) REFERENCES users(id),
            FOREIGN KEY(following_id) REFERENCES users(id)
        )
    `);

    // Add indexes for better performance
    db.run('CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id)');
    db.run('CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id)');
});

// Export the database connection
module.exports = db;
