// src/pages/rss.xml.js
// Generates the RSS feed that Beehiiv watches to auto-send emails
import rss from '@astrojs/rss';

export async function GET(context) {
  // Import all article markdown files
  const articles = import.meta.glob('./articles/*.md', { eager: true });

  const items = Object.values(articles)
    .filter(article => {
      // Only include published (past or today) articles
      const pub = new Date(article.frontmatter.date + 'T12:00:00');
      return pub <= new Date();
    })
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
    .map(article => ({
      title:       article.frontmatter.title,
      description: article.frontmatter.description,
      pubDate:     new Date(article.frontmatter.date + 'T11:00:00'),
      link:        article.url,
      categories:  [article.frontmatter.pillar],
    }));

  return rss({
    title:       'American Foundations',
    description: 'A daily conservative blog covering the principles, policies, and events that shape America. Published every weekday by Quenton Jordan.',
    site:        context.site,
    items,
    customData: `<language>en-us</language><managingEditor>hello@americanfoundations.com</managingEditor>`,
  });
}
