import { Card, Divider } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { List } from 'antd';
import { GET_CARS, GET_PERSON} from '../../queries';
import CarCard from '../listitems/CarCard';
import Title from 'antd/es/typography/Title';

const getStyles = () => ({
  list: {
    justifyContent: 'center',
  },
});

const LearnMore = (props) => {
  const styles = getStyles();
  const { id } = useParams();

  const {
    loading: personLoading,
    error: personError,
    data: personData,
  } = useQuery(GET_PERSON, {
    variables: { id },
  });

  const {
    loading: carsLoading,
    error: carsError,
    data: carsData,
  } = useQuery(GET_CARS);

  if (personLoading || carsLoading) return 'Loading...';
  if (personError) return `Error! ${personError.message}`;
  if (carsError) return `Error! ${carsError.message}`;

  // const person = personData.person;
  const filteredCars = carsData.cars.filter(
    (car) => car.personId === id
  );

  return (
    <div>
      <Card>
        <Divider>
          <Title level={4}>
          {[personData.person.firstName + ' ' + personData.person.lastName]}
          </Title>
        </Divider>
        <List
          grid={{ gutter: 20, column: 1 }}
          style={styles.list}
        >
          {filteredCars.map(({id, year, make, model,price, personId, }) => (
              <List.Item key={id} style ={{textAlign: 'center'}}>
                <CarCard
                  key={id}
                  id={id}
                  year={year}
                  make={make}
                  model={model}
                  price={price}
                  personId={personId}
                />
              </List.Item>
            )
          )}
        </List>
      </Card>
      <div style={{ marginTop: '20px' }}>
        <Link to='/'>Go Back To Records Page</Link>
      </div>
    </div>
  );
};

export default LearnMore;