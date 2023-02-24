import { Card } from "antd"
import { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import UpdateCarForm from "../forms/UpdateCarForm"
import RemoveCarButton from "../buttons/RemoveCarButton"


const CarCard = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)   
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'persoId':
                setPersonId(value)
                break;             
        }
    }

    return (
        <div>
            <Card
                actions={[
                    <EditOutlined
                        key='edit'
                        onClick={handleButtonClick}
                    />,
                    <RemoveCarButton id={id}/>
                ]}
                style={{width: '90vw', margin: '0 auto'}}
            >
                {year} {make} {model} → {price}
                {editMode &&  (
                    <UpdateCarForm
                        id={props.id}
                        year={props.year}
                        make={props.make}
                        model={props.model}
                        price={props.price}
                        personId={props.personId}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                    />
                )}
            </Card>
        </div>
    )
}

export default CarCard
