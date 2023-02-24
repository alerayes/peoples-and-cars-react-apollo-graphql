import { useMutation } from '@apollo/client'
import { Divider, Form, Input, Button } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'


const AddPersonForm = () => {
    const [id, setId] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const {firstName, lastName} = values

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },

            update: (cache, {data: {addPerson}}) => {
                const data = cache.readQuery({query: GET_PEOPLE})
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data:{
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })
        form.resetFields();
    }
    return (

        <div>
            <Divider>
                <Title
                    level={4}
                    style={{textAlign: 'center'}}
                >
                    Add Person
                </Title>
            </Divider>
            <Form
                form={form}
                name='add-person-form'
                layout='inline'
                onFinish={onFinish}
                style={{
                    marginBottom:'30px',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                    alignItems: 'center'
                }}
            >
                <Form.Item
                    label='First Name'
                    name='firstName'
                    rules={[{
                        required: true,
                        message: 'Please input a first name!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. John'
                    />
                </Form.Item>
                <Form.Item
                    label='Last Name'
                    name='lastName'
                    rules={[{
                        required: true,
                        message: 'Please input a last name!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. Smith'
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}> 
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form
                                    .getFieldsError()
                                    .filter(({errors}) => errors.length)
                                    .length
                            }
                            style={{flex: '0 1 auto'}}
                        > 
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )

}

export default AddPersonForm
