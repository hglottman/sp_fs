class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!");
            } else {
                var newPost = this.postsRepository.addPost($input.val());
                newPost.then(() => {
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                    $input.val("");
                })
            }
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();;
            var newPostsArray = this.postsRepository.removePost(index);
            newPostsArray.then(() => {
                alert('Post deleted');
                this.postsRenderer.renderPosts(this.postsRepository.posts);
            });
        });
    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            } else {
                let postIndex = $(event.currentTarget).closest('.post').index();
                let newComment = { text: $comment.val(), user: $user.val() };
                var newCommentToAdd = this.postsRepository.addComment(newComment, postIndex);
                newCommentToAdd.then(() => {
                    this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
                    $comment.val("");
                    $user.val("");
                });
            }
        })
    }


    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            this.postsRepository.deleteComment(postIndex, commentIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        });
    }
}

export default EventsHandler