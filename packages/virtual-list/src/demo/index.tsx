import App from '../index';

const Demo: React.FC = () => {
  return (
    <App
      itemHeight={15}
      itemCount={1000000}
      height={380}
      renderItem={({ index, style }) => (
        <div key={index} style={style}>
          item-{index}
        </div>
      )}
    />
  );
};

export default Demo;
