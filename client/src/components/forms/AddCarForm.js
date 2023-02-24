import { useMutation, useQuery } from '@apollo/client'
import { Divider, Form, Input, Select, Button } from 'antd'
import { Option } from 'antd/es/mentions'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries'

const AddCarForm = () => {
    const [id, setId] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const { loading, error, data } = useQuery(GET_PEOPLE)

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = (values) => {
        const {year, make, model, price, personId } = values

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price, 
                personId
            },

            update: (cache, {data: {addCar}}) => {
                const data = cache.readQuery({query: GET_CARS})
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
        form.resetFields()
    }

    return (
        <div>
            <Divider>
                <Title level={4}>
                    Add Car
                </Title>
            </Divider>
            <Form
                form={form}
                name='add-car-form'
                layout='inline'
                onFinish={onFinish}
                style={{
                    marginBottom: '30px',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                    alignItems: 'center'
                }}
            >
                <Form.Item
                    label='Year'
                    name='year'
                    rules={[{
                        required: true,
                        message: 'Please input the car year!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. 1993'
                    />
                </Form.Item>
                <Form.Item
                    label='Make'
                    name='make'
                    rules={[{
                        required: true,
                        message: 'Please input the car make!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. Hyundai'
                    />
                </Form.Item>
                <Form.Item
                    label='Model'
                    name='model'
                    rules={[{
                        required: true,
                        message: 'Please input the car model!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. Sonata'
                    />
                </Form.Item>
                <Form.Item
                    label='Price'
                    name='price'
                    rules={[{
                        required: true,
                        message: 'Please input the car price!'
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Input
                        placeholder='i.e. 1000'
                        prefix='$'
                    />
                </Form.Item>
                <Form.Item
                    label='Person'
                    name='personId'
                    rules={[{
                        required: true
                    }]}
                    style={{flex: '0 1 auto'}}
                >
                    <Select placeholder='Select a person'>
                        {loading ? (
                            <Select.Option value='' disabled>
                                Loading...
                            </Select.Option>
                        ) : error ? (
                            <Select.Option value='' disabled>
                                Error! {error.message}
                            </Select.Option>
                        ) : (
                            data.people.map((p) => (
                                <Select.Option key={p.id} value={p.id}>
                                    {`${p.firstName} ${p.lastName}`}
                                </Select.Option>
                            ))
                        )}
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                     {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form   
                                    .getFieldError()
                                    .filter(({errors}) => errors.length)
                                    .length
                            }
                            style={{flex: '0 1 auto'}}
                        >
                            Add Car
                        </Button>
                     )}           
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCarForm
