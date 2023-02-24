import { useQuery } from "@apollo/client"
import { List } from "antd"
import { GET_CARS } from "../../queries"
import CarCard from "../listitems/CarCard"


const getStyles = () => ({
    list: {
        justifyContent: 'center'
    }
})

const CarsList = props => {
    const styles = getStyles()

    const {loading, error, data} = useQuery(GET_CARS)
    if (loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

    const personCars = data.cars.filter(
        (c) => c.personId === props.id
    )

    return (
        <List
            grid={{gutter: 20, column: 1}}
            style={styles.list}
        >
            {personCars.map(({id, year, make, model, price, personId}) => (
                <CarCard 
                    key={id}
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                />
            ))}
        </List>
    )

}


export default CarsList
