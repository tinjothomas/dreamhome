// app/about/page.js
import aboutContent from "./terms.md";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

async function markdownToHtml(markdown) {
  const { data: frontmatter, content } = matter(markdown);
  const processedContent = await remark().use(html).process(content);
  return {
    frontmatter,
    content: processedContent.toString(),
  };
}

export const metadata = {
  title: "Terms and Conditions",
};

export const dynamic = "force-static";

export default async function AboutPage() {
  const { frontmatter, content } = await markdownToHtml(aboutContent);

  return (
    <article className="prose mx-auto max-w-3xl p-4">
      {frontmatter.title && <h1>{frontmatter.title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
