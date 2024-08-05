import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HistoricalPosts = ({ posts, setPosts }) => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const addPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost]);
      setNewPost({ title: '', content: '' });
    }
  };

  const removePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">{post.title}</h3>
          <p className="mt-2">{post.content}</p>
          <Button variant="destructive" size="sm" onClick={() => removePost(index)} className="mt-2">
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
        <Button onClick={addPost}>Add Post</Button>
      </div>
    </div>
  );
};

export default HistoricalPosts;
