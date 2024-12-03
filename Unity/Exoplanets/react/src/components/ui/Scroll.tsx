import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ScrollProps = UGUIElements['scroll'] & {
  scrollBarClassName?: string;
  thumbClassName?: string;
};

export default function Scroll({
  scrollBarClassName, thumbClassName, children, ...props
}: ScrollProps) {
  const scrollRef = useRef<ReactUnity.UGUI.ScrollComponent>();
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
      ref={scrollRef}
      {...props}
    >
      {children}
    </scroll>
  );
}
