import { createPost, getFeedPosts } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { likePost, unlikePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeedPosts();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    if (!postId) {
      console.error("handleLike: missing postId");
      return;
    }
    if (loading) return; // prevent duplicate clicks
    setLoading(true);
    try {
      console.log("Liking post", postId);
      const data = await likePost(postId);
      console.log("like response:", data);
      await handleGetFeed();
    } catch (err) {
      console.error("Failed to like post:", err?.response || err);
    } finally {
      setLoading(false);
    }
  };
  const handleUnLike = async (postId) => {
    if (!postId) {
      console.error("handleUnLike: missing postId");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      console.log("Unliking post", postId);
      const data = await unlikePost(postId);
      console.log("unlike response:", data);
      await handleGetFeed();
    } catch (err) {
      console.error("Failed to unlike post:", err?.response || err);
    } finally {
      setLoading(false);
    }
  };
  const handleLikePost = (postId) => handleLike(postId);
  const handleUnlikePost = (postId) => handleUnLike(postId);

  return {
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost,
    loading,
    feed,
    post,
  };
};
