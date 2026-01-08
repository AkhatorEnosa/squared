import React, { createContext, useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [posts, setPosts] = useState([]);

  
    const { useGetPosts, invalidatePosts } = usePosts();

    const { data,isFetching, isLoading, isError, error } = useGetPosts();

    // Load token from storage on startup
    useEffect(() => {

        if (isLoading || isFetching) {
            setLoadingPosts(true);
        }
        
        const loadPosts = async () => {
            try {
                setPosts([...data] || []);
            } catch (err) {
                console.log('Failed to load post', err);
            } finally {
                setLoadingPosts(false);
            }
        };
        loadPosts();
    }, [loadingPosts, data, isError, error]);

    const refreshPosts = () => {
        setLoadingPosts(true);
        invalidatePosts();
    }
        

    return (
        <AppContext.Provider
            value={{ posts, loadingPosts, refreshPosts, error, isError }}
        >
            {children}
        </AppContext.Provider>
    );
}