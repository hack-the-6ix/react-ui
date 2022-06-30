import { useEffect, useRef } from 'react';
import Tooltip, { TooltipProps } from '.';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
  },
};

export const DefaultStory = (args: TooltipProps & { content: string }) => {
  const label = useRef<HTMLParagraphElement>(null);
  return (
    <>
      <p ref={label}>Tooltip will attach to this</p>
      <Tooltip {...args} target={label}>
        {args.content}
      </Tooltip>
    </>
  );
};

DefaultStory.args = {
  content: 'Tooltip content',
};
