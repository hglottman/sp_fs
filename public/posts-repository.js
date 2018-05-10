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
        return $.post('/posts', {text: postText})
        .then(  (savedPost) => {
            console.log(savedPost)
            this.posts.push(savedPost);
            return savedPost;
        })
 
    }

    removePost(index) {
        let postId = this.posts[index]._id;
        return $.ajax({
            method:"DELETE",
            url: '/posts/'+postId})
        .then((data) => {
            this.posts = data;
            console.log(data)
            return this.posts; 
        })
    };

        // delete(id) {
        //     return $.ajax({
        //         method:"DELETE",
        //         url: '/posts/:'+id
        //     }).catch(function(data){
        //         console.log(data)
        //     })
        // }  





    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };
}

export default PostsRepository