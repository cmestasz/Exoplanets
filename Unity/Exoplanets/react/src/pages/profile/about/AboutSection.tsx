import React from 'react';

interface AboutSectionsProps {
  title: string;
  children?: React.ReactNode;
}

export default function AboutSection({
  title, children,
}: AboutSectionsProps) {
  return (
    <article
      className="flex flex-col gap-3"
    >
      <h2 className="font-audiowide text-primary text-5xl leading-10">{title}</h2>
      <view
        className="flex flex-col text-secondary gap-2"
      >
        {children}
      </view>
    </article>
  );
}
