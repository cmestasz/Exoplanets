import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import { useEffect, useRef } from 'react';

type ScrollProps = UGUIElements['scroll'] & {
  scrollBarClassName?: string;
  thumbClassName?: string;
};

export default function Scroll({
  scrollBarClassName, thumbClassName, children, ...props
}: ScrollProps) {
  const scrollRef = useRef<ReactUnity.UGUI.ScrollComponent>();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.HorizontalScrollbar.Thumb.SetProperty('className', thumbClassName || '');
      scrollRef.current.HorizontalScrollbar.SetProperty('className', scrollBarClassName || '');
      scrollRef.current.VerticalScrollbar.Thumb.SetProperty('className', thumbClassName || '');
      scrollRef.current.VerticalScrollbar.SetProperty('className', scrollBarClassName || '');
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
