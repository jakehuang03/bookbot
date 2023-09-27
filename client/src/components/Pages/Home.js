import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TopBook from './TopBook';
import Book from './Book';
import FileUpload from './FileUpload';

const Top1Book = {
  title: 'The Element of Scrum',
  author: 'Chris Sims',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const RecommendBooks = [
  {
    title: 'Analysis of Algorithms',
    author: 'Robert Sedgewick',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'The Art of Computer Programming',
    author: 'AAA',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Analysis of Algorithms',
    author: 'Robert Sedgewick',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'The Art of Computer Programming',
    author: 'AAA',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

export default function Blog() {
  return (
      <Container maxWidth="lg">
        <main>
          <div className='tophalf'> 
            <div className="topbookintro">
              <TopBook post={Top1Book} />
            </div>
            <div className="topbookcover">
              <img src="https://source.unsplash.com/random?wallpapers" alt="" />
            </div>
            
          </div>
          <div className='middlehalf'>
          <Grid container spacing={4}>
           
           {RecommendBooks.map((post) => (
             <Book key={post.title} post={post} />
           ))}
           
         </Grid>
          </div>
          <div className="bottomhalf">
            <FileUpload />
          </div>
          
        </main>
      </Container>
  );
}