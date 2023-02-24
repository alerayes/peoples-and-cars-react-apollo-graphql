

import { Divider } from 'antd';

const getStyles = () => ({
  title: {
    fontSize: 20,
    padding: '15px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const Title = () => {
  const styles = getStyles();
  return (
    <div>
      <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
      <Divider />
    </div>
  );
};

export default Title;