import React from 'react';
import Card from "@/components/card";
import Carousel from '@/components/carousel';
import Category from '@/components/category';
interface Post {
  original_title: string;
  poster_path: string;
  vote_count:number;
}

interface myPageProp {
  data:Post[]
}

const Home:React.FC<myPageProp> = async () => {
  const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=6f90fc49a79e7765fa0571aa8eaf1bad&query=a')
  const data = await response.json()
  return (
      <>
        <div className='w-full flex'>
          <div className='w-full lg:w-3/4'>
            <Carousel />
          </div>
          <div className='grid grid-cols-2 lg:w-1/4 mx-auto mt-4'>
            
          </div>
        </div>
        <div className='w-full flex space-x-2 overflow-x-auto'>
          <Category />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.results.map((post:any,i:number)=>(
              <Card key={post.id} ID={post.id} name={post.original_title} result={post} price={post.vote_count} images={post.poster_path} 
              index={i}  />
          ))}
        </div>
      </>
  );
}

export default Home;