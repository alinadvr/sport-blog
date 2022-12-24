export type DataType = {
  posts: PostDataType[];
  categories: CategoriesDataType[];
  comments: CommentsDataType[];
  users: UsersDataType[];
};

export type PostDataType = {
  id: number;
  title: string;
  date: string;
  author_id: number;
  image: string;
  category_id: number;
  likes_user_id: number[];
  saved_user_id: number[];
  text: string;
};

export type CategoriesDataType = {
  id: number;
  title: string;
};

type CommentsDataType = {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
};

export type CommentsComponentDataType = {
  id: number;
  user: string;
  user_id: number;
  userImage: string;
  post_id: number;
  text: string;
};

export type UsersDataType = {
  id: number;
  nickname: string;
  email: string;
  password: string;
  image: string;
  description: string;
};

export type CurrentUserDataType = {
  id: number;
  nickname: string;
  email: string;
  image: string;
  description: string;
};

export type PostComponentDataType = {
  id: number;
  title: string;
  date: string;
  image: string;
  text: string;
  likes_user_id: number[];
  saved_user_id: number[];
  category_id: number;
  category: string;
  author: string;
  author_id: number;
};

export function getPostsData(data: DataType) {
  const posts: PostComponentDataType[] = [];

  data.posts.forEach((post) => {
    let postComponent: PostComponentDataType = {
      id: post.id,
      title: post.title,
      date: post.date,
      image: post.image,
      text: post.text,
      likes_user_id: post.likes_user_id,
      saved_user_id: post.saved_user_id,
      category_id: post.category_id,
      category: "",
      author: "",
      author_id: post.author_id,
    };

    data.categories.forEach((category) => {
      if (post.category_id === category.id) {
        postComponent.category = category.title;
      }
    });

    data.users.forEach((user) => {
      if (post.author_id === user.id) {
        postComponent.author = user.nickname;
      }
    });
    posts.push(postComponent);
  });

  return posts;
}

export function getCommentsData(data: DataType) {
  const comments: CommentsComponentDataType[] = [];

  data.comments.forEach((comment) => {
    let commentComponent: CommentsComponentDataType = {
      id: comment.id,
      user: "",
      user_id: comment.user_id,
      userImage: "",
      post_id: comment.post_id,
      text: comment.text,
    };

    data.users.forEach((user) => {
      if (user.id === comment.user_id) {
        commentComponent.user = user.nickname;
        commentComponent.userImage = user.image;
      }
    });
    comments.push(commentComponent);
  });

  return comments;
}
