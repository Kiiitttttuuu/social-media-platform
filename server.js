const express = require('express');
const bodyParser = require('body-parser');
const db = require('./databse');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Get posts
app.get('/posts', (req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create post
app.post('/posts', (req, res) => {
    const { content } = req.body;
    db.run("INSERT INTO posts (content, user_id) VALUES (?, ?)", [content, 1], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get comments for a post
app.get('/comments/:postId', (req, res) => {
    const { postId } = req.params;
    db.all("SELECT * FROM comments WHERE post_id = ?", [postId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create comment
app.post('/comment/:postId', (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    db.run("INSERT INTO comments (content, post_id) VALUES (?, ?)", [content, postId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Like a post
app.post('/like/:postId', (req, res) => {
    const { postId } = req.params;
    db.run("INSERT INTO likes (post_id) VALUES (?)", [postId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get profile
app.get('/profile', (req, res) => {
    db.get("SELECT * FROM users WHERE id = 1", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./database'); // Ensure this file exists and is named correctly

// const app = express();
// const port = 3000;

// app.use(express.static('public'));
// app.use(bodyParser.json());

// // Get all posts
// app.get('/posts', (req, res) => {
//     db.all("SELECT * FROM posts", (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// // Create a new post
// app.post('/posts', (req, res) => {
//     const { content, user_id } = req.body;
//     if (!content || !user_id) {
//         return res.status(400).json({ error: 'Content and user_id are required.' });
//     }
//     db.run("INSERT INTO posts (content, user_id) VALUES (?, ?)", [content, user_id], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(201).json({ id: this.lastID });
//     });
// });

// // Get comments for a post
// app.get('/comments/:postId', (req, res) => {
//     const { postId } = req.params;
//     db.all("SELECT * FROM comments WHERE post_id = ?", [postId], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// // Create a new comment
// app.post('/comment/:postId', (req, res) => {
//     const { postId } = req.params;
//     const { content } = req.body;
//     if (!content) {
//         return res.status(400).json({ error: 'Content is required.' });
//     }
//     db.run("INSERT INTO comments (content, post_id) VALUES (?, ?)", [content, postId], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(201).json({ id: this.lastID });
//     });
// });

// // Like a post
// app.post('/like/:postId', (req, res) => {
//     const { postId } = req.params;
//     db.run("INSERT INTO likes (post_id) VALUES (?)", [postId], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(201).json({ id: this.lastID });
//     });
// });

// // Get profile information
// app.get('/profile', (req, res) => {
//     db.get("SELECT * FROM users WHERE id = 1", (err, row) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(row);
//     });
// });

// // Update profile information
// app.put('/profile', (req, res) => {
//     const { username, email } = req.body;
//     if (!username || !email) {
//         return res.status(400).json({ error: 'Username and email are required.' });
//     }
//     db.run("UPDATE users SET username = ?, email = ? WHERE id = 1", [username, email], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(200).json({ message: "Profile updated" });
//     });
// });

// // Follow a user
// app.post('/follow/:userId', (req, res) => {
//     const { userId } = req.params;
//     const followerId = 1; // This should be replaced with the actual logged-in user's ID
//     db.run("INSERT INTO follows (follower_id, following_id) VALUES (?, ?)", [followerId, userId], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(201).json({ id: this.lastID });
//     });
// });

// // Unfollow a user
// app.delete('/follow/:userId', (req, res) => {
//     const { userId } = req.params;
//     const followerId = 1; // This should be replaced with the actual logged-in user's ID
//     db.run("DELETE FROM follows WHERE follower_id = ? AND following_id = ?", [followerId, userId], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.status(200).json({ message: "Unfollowed" });
//     });
// });

// // Get followers of a user
// app.get('/followers/:userId', (req, res) => {
//     const { userId } = req.params;
//     db.all("SELECT * FROM users WHERE id IN (SELECT follower_id FROM follows WHERE following_id = ?)", [userId], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// // Get users that a user is following
// app.get('/following/:userId', (req, res) => {
//     const { userId } = req.params;
//     db.all("SELECT * FROM users WHERE id IN (SELECT following_id FROM follows WHERE follower_id = ?)", [userId], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
