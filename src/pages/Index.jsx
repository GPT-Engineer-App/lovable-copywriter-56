// Update this page (the content is just a fallback if you fail to update the page)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HistoricalPosts from '../components/HistoricalPosts';
import PostGenerator from '../components/PostGenerator';
import { useHistoricalPosts } from '../integrations/supabase';

const Index = () => {
  const { data: historicalPosts } = useHistoricalPosts();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Lovable Copywriter</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Historical Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <HistoricalPosts />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate/Rewrite Post</CardTitle>
          </CardHeader>
          <CardContent>
            <PostGenerator historicalPosts={historicalPosts || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
