import { useMutation } from "@apollo/client"
import { Form, Input, Button } from "antd"
import { useEffect, useState } from "react"
import { UPDATE_PERSON } from "../../queries"


const UpdatePersonForm = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)

    const [updatePerson] = useMutation(UPDATE_PERSON,
        )

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate()
    }, [])

    const onFinish = (values) => {
        const {firstName, lastName} = values
        updatePerson({
            variables: {
                id,
                firstName,
                lastName,
            }
        })
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)

        switch (variable) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
            default:
                break        
        }
    }


    return (
        <div style={{marginTop: '10px'}}>
            <Form
                form={form}
                name='update-person-form'
                layout='inline'
                onFinish={onFinish}
                size='medium'
                initialValues={{
                    firstName: firstName,
                    lastName: lastName
                }}
                style={{justifyContent: 'center', display: 'flex', flexFlow: 'row'}}
            >
                <Form.Item
                    name='firstName'
                    label='First Name'
                    rules={[{
                        required: true,
                        message: 'Please Input Your First Name!'
                    }]}
                >
                    <Input
                        placeholder="i.e. John"
                        onChange={(e) => updateStateVariable('firstName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name='lastName'
                    label='Last Name'
                    rules={[{
                        required: true,
                        message: 'Please Input Your Last Name!'
                    }]}
                >
                    <Input
                        placeholder="i.e. Smith"
                        onChange={(e) => updateStateVariable('lastName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                (!form.isFieldTouched('firstName') &&
                                !form.isFieldTouched('lastName')) ||
                                form
                                    .getFieldsError()
                                    .filter(({errors}) => errors.length)
                                    .length
                            }
                        >
                            Update Person
                        </Button>
                    )}
                </Form.Item>
                <Button onClick={props.onButtonClick}>
                    Cancel
                </Button>
            </Form>
        </div>
    )
}

export default UpdatePersonForm
