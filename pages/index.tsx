import fs from 'fs';
import type { NextPage } from 'next';
import matter from 'gray-matter';

export type FrontMatterProps = {
  title: string;
  data: string;
  description: string;
} 

export type Post = {
  frontMatter: FrontMatterProps,
  slug: string;
}

type Props = {
  posts: Post[];
}

export const getStaticProps = async () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });
    
  return {
    props: {
      posts,
    },
  };
};



const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <>
      <h1> hahaha</h1>
      {posts.map((post) => {
        return (
          <div key={post.slug}>
            <h2>{post.frontMatter.title}</h2>
            <p>{post.frontMatter.description}</p>
          </div>
        )
      })}
    </>
  )
}

export default Home
