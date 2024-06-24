import React, { FC } from 'react';

interface DetailPostCommentWrapperProps {
  children?: React.ReactNode;
}

const DetailPostCommentWrapper: FC<DetailPostCommentWrapperProps> = ({
  children,
}) => {
  return (
    <div
      id="comments"
      className="mx-auto w-full rounded-xl bg-muted px-7 py-5"
      style={{
        gridColumn: '2/3',
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default DetailPostCommentWrapper;
