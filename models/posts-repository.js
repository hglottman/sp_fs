/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getPosts() {
        return $.get('/posts')
            .then((data) => {
                this.posts = data;
                return this.posts;
            })
    }

    addPost(postText) {
        return $.post('/posts', { text: postText })
            .then((savedPost) => {
                console.log(savedPost)
                this.posts.push(savedPost);
                return savedPost;
            })

    }

    removePost(index) {
        let postId = this.posts[index]._id;
        return $.ajax({
            method: "DELETE",
            url: '/posts/' + postId
        })
            .then((data) => {
                this.posts = data;
                console.log(data)
                return this.posts;
            })
    };


    addComment(newComment, postIndex) {
        let postId = this.posts[index]._id;
        return $.post('/posts/' + postId + '/comments', { text: commentText, user: userName })
            .then((savedComment) => {
                console.log(savedComment);
                this.posts[postIndex].comments.push(newComment);
                return savedComment;
            });
        };


        deleteComment(postIndex, commentIndex) {
            this.posts[postIndex].comments.splice(commentIndex, 1);
        };
    }

    export default PostsRepository