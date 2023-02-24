import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries"
import { filter } from "lodash"


const RemovePersonButton = ({id}) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, {data: {removePerson}}) {
        const {people} = cache.readQuery({
            query: GET_PEOPLE
        })
        cache.writeQuery({
            query: GET_PEOPLE,
            data: {
                people: filter(people, (p) => {
                    return p.id !== removePerson.id
                })
            }
        })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if(result) {
        removePerson({
            variables: {
                id,
            }
        })
    }
  }

  return (
    <DeleteOutlined
        key='delete'
        style={{color: 'red'}}
        onClick={handleButtonClick}
     />
  )

}

export default RemovePersonButton
