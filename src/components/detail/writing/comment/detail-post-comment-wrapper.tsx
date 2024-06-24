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
      className="mx-auto w-full rounded-xl bg-muted px-7 py-5 xl:col-start-2 xl:col-end-3"
    >
      <div>{children}</div>
    </div>
  );
};

export default DetailPostCommentWrapper;
