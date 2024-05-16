import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

import ColorSwatch from './color-swatch';

describe('ColorSwatch', () => {
  it('renders the title and subtitle correctly', () => {
    const title = 'Color Title';
    const subTitle = 'Color Subtitle';
    const { getByText } = render(
      <ColorSwatch
        title={title}
        subTitle={subTitle}
        colorClassName='color-class'
      />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subTitle)).toBeInTheDocument();
  });

  it('applies the correct color class', () => {
    const colorClassName = 'color-class';
    const { container } = render(
      <ColorSwatch
        title='Color Title'
        subTitle='Color Subtitle'
        colorClassName={colorClassName}
      />
    );

    const colorSwatch = container.querySelector('.color-class');
    expect(colorSwatch).toBeInTheDocument();
  });
});
