import { useMutation, useQuery } from "@apollo/client"
import { Button, Form, Input, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useState, useEffect } from "react"
import { GET_CARS, GET_PEOPLE, UPDATE_CAR } from "../../queries"


const UpdateCarForm = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const { loading, error, data } = useQuery(GET_PEOPLE)
    const [updateCar] = useMutation(UPDATE_CAR)



    useEffect(() => {
        forceUpdate()
    }, [])

    const onFinish = (values) => {
        const { year, make, model, price, personId } = values;
        updateCar({
          variables: {
            id,
            year,
            make,
            model,
            price,
            personId,
          },
        });
        props.onButtonClick();
      };
    
    

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)

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
            case 'personId':
                setPersonId(value)
                break
            default:
                break            
        }
    }

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: personId
            }}
            style={{
                marginBottom: '30px',
                marginTop: '30px',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                alignItems: 'center'
            }}
        >
            <Form.Item
                name='year'
                label='Year'
                rules={[{
                    required: true,
                    message: 'Please input the car year!'
                }]}
                style={{flex: '0 1 auto'}}
            >
                <Input
                    placeholder='i.e. 1993'
                    onChange={(e) => updateStateVariable('year', e.target.value)} 
                />
            </Form.Item>
            <Form.Item
                name='make'
                label='Make'
                rules={[{
                    required: true,
                    message: 'Please input the car make'
                }]}
                style={{flex: '0 1 auto'}}
            >
                <Input
                    placeholder='i.e. Hyundai'
                    onChange={(e) => updateStateVariable('make', e.target.value)}
                 />
            </Form.Item>
            <Form.Item
                name='model'
                label='Model'
                rules={[{
                    required: true,
                    message: 'Please input the car model'
                }]}
                style={{flex: '0 1 auto'}}
            >
                <Input
                    placeholder='i.e. Sonata'
                    onChange={(e) => updateStateVariable('model', e.target.value)}
                 />
            </Form.Item>
            <Form.Item
                name='price'
                label='Price'
                rules={[{
                    required: true,
                    message: 'Please input the car price'
                }]}
                style={{flex: '0 1 auto'}}
            >
                <Input
                    placeholder='i.e. 1000'
                    prefix='$'
                    onChange={(e) => updateStateVariable('model', e.target.value)}
                 />
            </Form.Item>
            <Form.Item
                name='personId'
                label='Person'
                rules={[{
                    required: false
                }]}
                style={{flex: '0 1 auto'}}
            >
                <Select
                    placeholder='Select a person'
                    onChange={(value) => updateStateVariable('personId', value)}
                    value={personId}
                >
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
                { () => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('year') &&
                             !form.isFieldTouched('make') &&
                             !form.isFieldTouched('model') &&
                             !form.isFieldTouched('price') &&
                             !form.isFieldTouched('personId')) ||
                             form
                                .getFieldsError()
                                .filter(({errors}) => errors.length)
                                .length
                        }
                    >
                        Update Car
                    </Button>
                )}            
            </Form.Item>
            <Button onClick={props.onButtonClick}>
                Cancel        
            </Button>
        </Form>
    )
}

export default UpdateCarForm
