import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### historical_posts

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | uuid                     | string | true     |
| title      | text                     | string | true     |
| content    | text                     | string | true     |
| created_at | timestamp with time zone | string | false    |

*/

// Hooks for historical_posts

export const useHistoricalPosts = () => useQuery({
    queryKey: ['historical_posts'],
    queryFn: () => fromSupabase(supabase.from('historical_posts').select('*')),
});

export const useHistoricalPost = (id) => useQuery({
    queryKey: ['historical_posts', id],
    queryFn: () => fromSupabase(supabase.from('historical_posts').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddHistoricalPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('historical_posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('historical_posts');
        },
    });
};

export const useUpdateHistoricalPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('historical_posts').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('historical_posts');
        },
    });
};

export const useDeleteHistoricalPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('historical_posts').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('historical_posts');
        },
    });
};