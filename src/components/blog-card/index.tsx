import { useEffect, useState } from 'react';
import { Card, Chip } from '@heroui/react';
import SectionHeader from '../section-header';
import LazyImage from '../lazy-image';
import { PiNewspaper } from 'react-icons/pi';
import { getDevPost, getMediumPost } from '@arifszn/blog-js';
import { formatDistance } from 'date-fns';
import { SanitizedBlog } from '../../interfaces/sanitized-config';
import { ga, skeleton } from '../../utils';
import { Article } from '../../interfaces/article';

const BlogCard = ({
  loading,
  blog,
  googleAnalyticsId,
}: {
  loading: boolean;
  blog: SanitizedBlog;
  googleAnalyticsId?: string;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (blog.source === 'medium') {
      getMediumPost({
        user: blog.username,
      }).then((res) => {
        setArticles(res);
      });
    } else if (blog.source === 'dev') {
      getDevPost({
        user: blog.username,
      }).then((res) => {
        setArticles(res);
      });
    }
  }, [blog.source, blog.username]);

  return (
    <Card className="p-6 lg:p-8">
      <SectionHeader
        icon={<PiNewspaper />}
        title="Articles"
        subtitle="Recent posts"
        loading={loading}
      />
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array.from({ length: blog.limit }, (_, i) => (
            <Card key={i} variant="secondary" className="flex-row gap-5 p-5">
              {skeleton({ widthCls: 'size-20', shape: 'rounded-2xl' })}
              <div className="flex-1 space-y-2">
                {skeleton({ widthCls: 'w-2/3', heightCls: 'h-5' })}
                {skeleton({ widthCls: 'w-24', heightCls: 'h-3' })}
                {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
              </div>
            </Card>
          ))
        ) : articles.length === 0 ? (
          <div className="py-6 text-center text-muted">
            <PiNewspaper className="mx-auto size-10 opacity-40" />
            <p className="mt-1 text-sm">No recent posts</p>
          </div>
        ) : (
          articles.slice(0, blog.limit).map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-3xl"
              onClick={() => {
                if (googleAnalyticsId)
                  ga.event('Click Blog Post', { post: article.title });
              }}
            >
              <Card
                variant="secondary"
                className="flex-col gap-5 p-5 transition-colors group-hover:bg-surface-tertiary md:flex-row"
              >
                {article.thumbnail && (
                  <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-surface-tertiary">
                    <LazyImage
                      src={article.thumbnail}
                      alt=""
                      className="size-full object-cover"
                      placeholder={skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-full',
                        shape: '',
                      })}
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Card.Title className="text-base">{article.title}</Card.Title>
                  <p className="text-xs text-muted">
                    {formatDistance(article.publishedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  <Card.Description className="mt-2 line-clamp-2">
                    {article.description}
                  </Card.Description>
                  {article.categories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {article.categories.map((c) => (
                        <Chip key={c} size="sm" variant="tertiary">
                          #{c}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </a>
          ))
        )}
      </div>
    </Card>
  );
};

export default BlogCard;
