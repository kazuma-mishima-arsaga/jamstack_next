import fs from 'fs';
import matter from 'gray-matter';
import { FrontMatterProps, Post } from '..';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkPrism from 'remark-prism';

type Props = {
  params: Post;
}

type StaticProps = {
  frontMatter: FrontMatterProps;
  content: string;
}

export const getStaticProps = async ({ params }: Props) => {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      plugins: ['line-numbers'],
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  
  return { props: { frontMatter: data, content: result.toString() } };
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false, // リソースがないページは 404ページ が表示
  };
}

const Post = ({ frontMatter, content }: StaticProps) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Post;