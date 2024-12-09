import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ScrollProps = UGUIElements['scroll'] & {
  scrollBarClassName?: string;
  thumbClassName?: string;
};

const Scroll = React.forwardRef<ReactUnity.UGUI.ScrollComponent, ScrollProps>(({
  scrollBarClassName, thumbClassName, children, ...props
}, ref) => {
  const scrollRef = useRef<ReactUnity.UGUI.ScrollComponent>();
  const setCombinedRef = (node: ReactUnity.UGUI.ScrollComponent | null) => {
    scrollRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<ReactUnity.UGUI.ScrollComponent | null>).current = node;
    }
  };
  const defaultThumb = 'bg-primary border-secondary border-4 border-solid rounded-full';
  const defaultScrollbar = 'bg-transparent h-[0.4rem] w-[0.4rem]';
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.HorizontalScrollbar.Thumb.SetProperty('className', twMerge(defaultThumb, thumbClassName));
      scrollRef.current.HorizontalScrollbar.SetProperty('className', twMerge(defaultScrollbar, scrollBarClassName));
      scrollRef.current.VerticalScrollbar.Thumb.SetProperty('className', twMerge(defaultThumb, thumbClassName));
      scrollRef.current.VerticalScrollbar.SetProperty('className', twMerge(defaultScrollbar, scrollBarClassName));
    }
  }, [scrollBarClassName, thumbClassName]);
  return (
    <scroll
      // eslint-disable-next-line react/no-unknown-property
      sensitivity={100}
      ref={setCombinedRef}
      {...props}
    >
      {children}
    </scroll>
  );
});

Scroll.displayName = 'Scroll';

export default Scroll;
