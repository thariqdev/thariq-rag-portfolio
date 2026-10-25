"use client";

import Icon from "./Icon";

// The hero "Talk to Thariq" button. It opens the chat widget by sending a browser event.
// The class props let each hero layout use the design's exact classes.
export default function OpenChatButton({
  icon,
  className,
  iconClassName,
  labelClassName,
}: {
  icon: string;
  className: string;
  iconClassName: string;
  labelClassName?: string;
}) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-chat"))} className={className}>
      <Icon name={icon} className={iconClassName} />
      <span className={labelClassName}>Talk to Thariq</span>
    </button>
  );
}
