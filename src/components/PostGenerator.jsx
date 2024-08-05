import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from '@tanstack/react-query';

const PostGenerator = ({ historicalPosts }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');

  const generatePostMutation = useMutation({
    mutationFn: async (fullPrompt) => {
      const response = await fetch('https://jyltskwmiwqthebrpzxt.supabase.co/functions/v1/llm', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bHRza3dtaXdxdGhlYnJwenh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxNTA2NjIsImV4cCI6MjAzNzcyNjY2Mn0.a1y6NavG5JxoGJCNrAckAKMvUDaXAmd2Ny0vMvz-7Ng',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: fullPrompt }
          ]
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.choices[0].message.content;
    },
    onSuccess: (data) => {
      setGeneratedPost(data);
    },
    onError: (error) => {
      console.error('Error generating post:', error);
      setGeneratedPost('Error generating post. Please try again.');
    },
  });

  const generatePost = () => {
    const historicalContent = historicalPosts.map(post => `${post.title}\n${post.content}`).join('\n\n');
    const systemPrompt = "Read the historical posts and based on that write or rewrite posts that the user asks for:\n\n";
    const fullPrompt = `${systemPrompt}${historicalContent}\n\nWrite a post about: ${prompt}`;
    
    generatePostMutation.mutate(fullPrompt);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Write a post about..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button 
        onClick={generatePost} 
        disabled={generatePostMutation.isPending}
      >
        {generatePostMutation.isPending ? 'Generating...' : 'Generate Post'}
      </Button>
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