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
    };

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


    addComment(newCom, postIndex) {
        let id = this.posts[postIndex]._id;
        return $.ajax({
            url: '/posts/' + id + '/comments',
            method: "POST",
            data: newCom,
            dataType: 'json'
        }).then((data) => {
            console.log(data)
            this.posts[postIndex].comments.push(newCom);
        })
    };


    deleteComment(postIndex, comIndex) {
        let id = this.posts[postIndex]._id;
        let comId = this.posts[postIndex].comments[comIndex]._id;
        return $.ajax({
            method: "DELETE",
            url: '/posts/del-comments/' + id + '/' + comId
        }).then((data) => {
            this.posts[postIndex].comments.splice(comIndex, 1);
        })
    }
}
//class ends





export default PostsRepository;

