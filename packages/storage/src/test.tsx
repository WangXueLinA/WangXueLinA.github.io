import storage from './index';
const Local = new storage({ name: 'test-', type: 'localStorage' });
const Session = new storage({ name: 'test-', type: 'sessionStorage' });

const Test = () => {
  Local.setItem('testLocal', 'asdsalkjdlksajdlk');
  Session.setItem('testSession', 'asdsalkjdlksajdlk');
  return <div>Test Component</div>;
};

export default Test;
