import Image from '@tiptap/extension-image';

const UpdatedImage = Image.extend({
  name: 'updatedImage',
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
});

export default UpdatedImage;
