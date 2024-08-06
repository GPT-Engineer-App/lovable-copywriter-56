import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHistoricalPosts, useAddHistoricalPost, useDeleteHistoricalPost } from '../integrations/supabase';

const HistoricalPosts = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const { data: posts, isLoading, isError } = useHistoricalPosts();
  const addPostMutation = useAddHistoricalPost();
  const deletePostMutation = useDeleteHistoricalPost();

  const addPost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      addPostMutation.mutate(newPost, {
        onSuccess: () => {
          setNewPost({ title: '', content: '', category: '' });
        }
      });
    }
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'linkedin':
        return 'bg-blue-100 border-blue-300';
      case 'twitter':
        return 'bg-sky-100 border-sky-300';
      case 'facebook':
        return 'bg-indigo-100 border-indigo-300';
      case 'instagram':
        return 'bg-pink-100 border-pink-300';
      default:
        return 'bg-gray-100 border-gray-300';
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
        <div key={post.id} className={`p-4 rounded-lg shadow border ${getCategoryStyle(post.category)}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{post.title}</h3>
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-opacity-50 text-gray-700 capitalize">
              {post.category}
            </span>
          </div>
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
        <Select
          value={newPost.category}
          onValueChange={(value) => setNewPost({ ...newPost, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addPost} disabled={addPostMutation.isPending || !newPost.category}>
          {addPostMutation.isPending ? 'Adding...' : 'Add Post'}
        </Button>
      </div>
    </div>
  );
};

export default HistoricalPosts;
