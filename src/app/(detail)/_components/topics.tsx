import { Badge } from '@/components/ui/badge';
import getCategories from '@/lib/query/writing/get-categories';
import React from 'react';

const Topics = async () => {
  const topics = await getCategories();
  if (!topics.length) return <></>;
  return (
    <div className="mt-4">
      <h3>Topics</h3>
      {topics.map((topic) => (
        <Badge
          key={topic.id}
          style={{
            color: `hsl(${topic.color})`,
          }}
        >
          {topic.name}
        </Badge>
      ))}
    </div>
  );
};

export default Topics;
