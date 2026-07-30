import React from 'react';

export default function Link({ href, children, ...props }) {
  let targetHref = href;
  if (href === '/projects') {
    targetHref = 'https://www.theapexgroup.in/qubec.php';
  } else if (href === '/') {
    targetHref = 'index.html';
  }
  return <a href={targetHref} {...props}>{children}</a>;
}
