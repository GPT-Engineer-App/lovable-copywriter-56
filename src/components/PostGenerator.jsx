import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PostGenerator = ({ historicalPosts }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');

  const generatePost = () => {
    // In a real application, this is where you'd make an API call to your AI model
    // For this example, we'll just concatenate the historical posts and the prompt
    const historicalContent = historicalPosts.map(post => `${post.title}\n${post.content}`).join('\n\n');
    const systemPrompt = "Read the historical posts and based on that write or rewrite posts that the user asks for:\n\n";
    const fullPrompt = `${systemPrompt}${historicalContent}\n\nWrite a post about: ${prompt}`;
    
    setGeneratedPost(`Generated post based on the prompt: "${prompt}"\n\nThis is where the AI-generated content would appear, based on the historical posts and the given prompt.`);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Write a post about..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={generatePost}>Generate Post</Button>
      {generatedPost && (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          <h3 className="font-bold">Generated Post:</h3>
          <p className="mt-2 whitespace-pre-wrap">{generatedPost}</p>
        </div>
      )}
    </div>
  );
};

export default PostGenerator;
