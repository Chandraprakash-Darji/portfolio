import * as React from 'react';

type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

const PostTableTitle: React.FC<Props> = ({ title, description, action }) => {
  return (
    <>
      <div className="mb-5 flex flex-row border-b pb-5">
        <div className="flex-none items-center justify-start">
          <h1 className="text-base font-semibold leading-6 text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none items-center justify-end">{action}</div>
      </div>
    </>
  );
};

export default PostTableTitle;
