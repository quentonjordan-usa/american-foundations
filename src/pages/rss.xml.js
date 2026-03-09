import rss from '@astrojs/rss';

export async function GET(context) {
  const articles = import.meta.glob('./articles/*.md', { eager: true });

  const items = Object.values(articles)
    .filter(a => {
      const pub = new Date(a.frontmatter.date + 'T12:00:00');
      return pub <= new Date();
    })
    .sort((a, b) =>
      new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    )
    .map(a => ({
      title:       a.frontmatter.title,
      pubDate:     new Date(a.frontmatter.date + 'T12:00:00'),
      description: a.frontmatter.description,
      link:        a.url,
    }));

  return rss({
    title:       'American Foundations',
    description: 'A daily conservative blog covering the principles, policies, and events that shape America. Published every weekday by Quenton Jordan.',
    site:        'https://americanfoundationsblog.com',
    items,
  });
}