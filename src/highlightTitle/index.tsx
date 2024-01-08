import React from 'react';

type Props = {
  text: string;
  keyWord?: string;
  style?: React.CSSProperties;
  className?: string;
};
const App: React.FC<Props> = ({ text, keyWord, style, className }) => {
  if (!keyWord || !text.includes(keyWord)) return <>{text}</>;
  const list = text?.split(keyWord) ?? [];
  return (
    <>
      {list.map((str, index) => {
        return (
          <>
            {str}
            {index !== list.length - 1 && (
              <span style={{ color: 'red', ...style }} className={className}>
                {keyWord}
              </span>
            )}
          </>
        );
      })}
    </>
  );
};

export default App;
