import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import AddCarForm from "../forms/AddCarForm";
import AddPersonForm from "../forms/AddPersonForm";
import Title from "../layout/Title";
import PeopleList from "../lists/PeopleList";

const Records = () => {
  const {loading, error, data} = useQuery(GET_PEOPLE)

  const hasPeople = !loading && !error && data.people.length > 0

  return (
    <div>
      <Title/>
      <AddPersonForm/>
      {hasPeople && <AddCarForm />}
      <PeopleList/>
    </div>
  )
}

export default Records;