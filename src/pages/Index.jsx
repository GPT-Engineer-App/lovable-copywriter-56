// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HistoricalPosts from '../components/HistoricalPosts';
import PostGenerator from '../components/PostGenerator';

const Index = () => {
  const [historicalPosts, setHistoricalPosts] = useState([]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Historical Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <HistoricalPosts posts={historicalPosts} setPosts={setHistoricalPosts} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <PostGenerator historicalPosts={historicalPosts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
