import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useHistoricalPosts, useAddHistoricalPost, useDeleteHistoricalPost } from '../integrations/supabase';

const HistoricalPosts = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { data: posts, isLoading, isError } = useHistoricalPosts();
  const addPostMutation = useAddHistoricalPost();
  const deletePostMutation = useDeleteHistoricalPost();

  const addPost = () => {
    if (newPost.title && newPost.content) {
      addPostMutation.mutate(newPost, {
        onSuccess: () => {
          setNewPost({ title: '', content: '' });
        }
      });
    }
  };

  const removePost = (id) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">{post.title}</h3>
          <p className="mt-2 whitespace-pre-wrap">{post.content}</p>
          <Button variant="destructive" size="sm" onClick={() => removePost(post.id)} className="mt-2">
            Remove
          </Button>
        </div>
      ))}
      <div className="space-y-2">
        <Input
          placeholder="Post title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          placeholder="Post content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <Button onClick={addPost} disabled={addPostMutation.isPending}>
          {addPostMutation.isPending ? 'Adding...' : 'Add Post'}
        </Button>
      </div>
    </div>
  );
};

export default HistoricalPosts;
