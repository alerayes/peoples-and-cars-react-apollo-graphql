import { useQuery } from '@apollo/client'
import { Divider, List } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { GET_PEOPLE } from '../../queries'
import PersonCard from '../listitems/PersonCard'


const getStyles = () => ({
    list: {
        justifyContent: 'center',
        // border: '2px solid red',
        width: '100vw'
    }
})

const PeopleList = () => {
    const styles = getStyles()

    const {loading, error, data} = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return(
        <div>
            <Divider>
                <Title level={4}>
                    Records
                </Title>
                <List
                    grid={{gutter: 20, column: 1}}
                    style={styles.list}
                >
                    {data.people.map(({id, firstName, lastName}) => (
                        <List.Item key={id}>
                            <PersonCard
                                key={id}
                                id={id}
                                firstName={firstName}
                                lastName={lastName}
                            />
                        </List.Item>
                    ))}
                </List>
            </Divider>
        </div>
    )

}

export default PeopleList

