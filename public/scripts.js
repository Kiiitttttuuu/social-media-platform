// document.addEventListener('DOMContentLoaded', () => {
//     if (document.getElementById('post-list')) {
//         fetch('/posts')
//             .then(response => response.json())
//             .then(posts => {
//                 const postList = document.getElementById('post-list');
//                 posts.forEach(post => {
//                     const postDiv = document.createElement('div');
//                     postDiv.className = 'post';
//                     postDiv.innerHTML = `
//                         <p>${post.content}</p>
//                         <button data-id="${post.id}" class="like-button">Like</button>
//                         <div id="comments-${post.id}"></div>
//                         <textarea data-id="${post.id}" class="comment-input" placeholder="Add a comment..."></textarea>
//                         <button data-id="${post.id}" class="comment-button">Comment</button>
//                     `;
//                     postList.appendChild(postDiv);
//                     fetchComments(post.id);
//                 });

//                 document.querySelectorAll('.like-button').forEach(button => {
//                     button.addEventListener('click', () => {
//                         const postId = button.dataset.id;
//                         fetch(`/like/${postId}`, { method: 'POST' });
//                     });
//                 });

//                 document.querySelectorAll('.comment-button').forEach(button => {
//                     button.addEventListener('click', () => {
//                         const postId = button.dataset.id;
//                         const commentInput = document.querySelector(`.comment-input[data-id="${postId}"]`);
//                         fetch(`/comment/${postId}`, {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({ content: commentInput.value })
//                         });
//                         commentInput.value = '';
//                     });
//                 });
//             });
//     }

//     if (document.getElementById('profile-info')) {
//         fetch('/profile')
//             .then(response => response.json())
//             .then(profile => {
//                 const profileInfo = document.getElementById('profile-info');
//                 profileInfo.innerHTML = `
//                     <div class="profile">
//                         <h2>${profile.username}</h2>
//                         <p>${profile.email}</p>
//                     </div>
//                 `;
//             });
//     }

//     if (document.getElementById('new-post-form')) {
//         document.getElementById('new-post-form').addEventListener('submit', (e) => {
//             e.preventDefault();
//             const postContent = document.getElementById('post-content').value;
//             fetch('/posts', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ content: postContent })
//             });
//             document.getElementById('post-content').value = '';
//         });
//     }
// });

// function fetchComments(postId) {
//     fetch(`/comments/${postId}`)
//         .then(response => response.json())
//         .then(comments => {
//             const commentsDiv = document.getElementById(`comments-${postId}`);
//             comments.forEach(comment => {
//                 const commentDiv = document.createElement('div');
//                 commentDiv.className = 'comment';
//                 commentDiv.innerHTML = `<p>${comment.content}</p>`;
//                 commentsDiv.appendChild(commentDiv);
//             });
//         });
// }


document.addEventListener('DOMContentLoaded', () => {
    // Handle posts page
    if (document.getElementById('post-list')) {
        fetch('/posts')
            .then(response => response.json())
            .then(posts => {
                const postList = document.getElementById('post-list');
                postList.innerHTML = ''; // Clear existing posts
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'post';
                    postDiv.innerHTML = `
                        <p>${post.content}</p>
                        <button data-id="${post.id}" class="like-button">Like</button>
                        <div id="comments-${post.id}"></div>
                        <textarea data-id="${post.id}" class="comment-input" placeholder="Add a comment..."></textarea>
                        <button data-id="${post.id}" class="comment-button">Comment</button>
                    `;
                    postList.appendChild(postDiv);
                    fetchComments(post.id);
                });

                document.querySelectorAll('.like-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const postId = button.dataset.id;
                        fetch(`/like/${postId}`, { method: 'POST' });
                    });
                });

                document.querySelectorAll('.comment-button').forEach(button => {
                    button.addEventListener('click', () => {
                        const postId = button.dataset.id;
                        const commentInput = document.querySelector(`.comment-input[data-id="${postId}"]`);
                        fetch(`/comment/${postId}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ content: commentInput.value })
                        });
                        commentInput.value = '';
                    });
                });
            });
    }

    // Handle profile page
    if (document.getElementById('profile-info')) {
        fetch('/profile')
            .then(response => response.json())
            .then(profile => {
                const profileInfo = document.getElementById('profile-info');
                profileInfo.innerHTML = `
                    <div class="profile">
                        <h2>${profile.username}</h2>
                        <p>${profile.email}</p>
                        <button id="edit-profile-btn">Edit Profile</button>
                    </div>
                `;
                
                // Handle profile editing
                document.getElementById('edit-profile-btn').addEventListener('click', () => {
                    document.getElementById('edit-profile-form').style.display = 'block';
                });
            });

        // Handle profile editing form submission
        document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            fetch('/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email })
            })
            .then(response => response.json())
            .then(data => {
                alert('Profile updated successfully!');
                location.reload(); // Reload the page to reflect changes
            });
        });

        // Load and display user's posts
        fetch('/user/posts')
            .then(response => response.json())
            .then(posts => {
                const userPostsList = document.getElementById('user-posts-list');
                userPostsList.innerHTML = ''; // Clear existing posts
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'post';
                    postDiv.innerHTML = `
                        <p>${post.content}</p>
                    `;
                    userPostsList.appendChild(postDiv);
                });
            });
    }

    // Handle new post creation
    if (document.getElementById('new-post-form')) {
        document.getElementById('new-post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const postContent = document.getElementById('post-content').value;
            fetch('/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: postContent })
            });
            document.getElementById('post-content').value = '';
        });
    }
});

function fetchComments(postId) {
    fetch(`/comments/${postId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsDiv = document.getElementById(`comments-${postId}`);
            commentsDiv.innerHTML = ''; // Clear existing comments
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `<p>${comment.content}</p>`;
                commentsDiv.appendChild(commentDiv);
            });
        });
}
