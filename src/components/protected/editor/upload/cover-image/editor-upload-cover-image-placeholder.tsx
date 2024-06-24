import React from 'react';

import { protectedEditorConfig } from '@/config/protected';
import { Image as ImageIcon } from 'lucide-react';

const EditorUploadCoverImagePlaceHolder = () => {
  return (
    <div className="col-span-full  ">
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <ImageIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <p className="pl-1">{protectedEditorConfig.formImageNote}</p>
          </div>
          <p className="text-sm leading-5 text-gray-600">
            {protectedEditorConfig.formImageSize}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorUploadCoverImagePlaceHolder;
