import { Card } from "antd"
import { useState } from "react"
import { EditOutlined } from '@ant-design/icons'
import CarsList from "../lists/CarsList"
import { Link } from 'react-router-dom';
import UpdatePersonForm from "../forms/UpdatePersonForm";
import RemovePersonButton from "../buttons/RemovePersonButton";


const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            default:
                break        
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
                    <RemovePersonButton id={id}/>
                ]}
                style={{width: '95vw', margin: '0 auto'}}
            >
                {firstName} {lastName}
                {editMode &&  (
                    <UpdatePersonForm
                        id={props.id}
                        firstName={props.firstName}
                        lastName={props.lastName}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                    />
                )}
                <CarsList id={id}/>
                <div style={{display: 'flex'}}>
                    <Link
                        to={`/learn-more/${id}`}
                        id={`learn-more-${id}`}
                        
                        style={{alignContent: 'end', 
                                color:"black", 
                                marginTop: '15px', 
                                marginLeft: '15px',
                                fontSize: '14px'}}
                    >
                        Learn More
                    </Link>
                </div>
            </Card>
        </div>
    )

}

export default PersonCard
