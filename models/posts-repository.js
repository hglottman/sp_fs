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
        let postId = this.posts[postIndex]._id;
        return $.ajax({
            method:"POST", 
            url:'/posts/' + postId + '/comments',
            data: newComment
        .then((data) => {
            console.log(data)
                newComment._id = data.id
                this.posts[postIndex].comments.push(newComment._id, newComment);  
                return (newComment._id, newComment);
        })
    })  
    };




        deleteComment(postIndex, commentIndex) {
            this.posts[postIndex].comments.splice(commentIndex, 1);
        };
    }

    export default PostsRepository