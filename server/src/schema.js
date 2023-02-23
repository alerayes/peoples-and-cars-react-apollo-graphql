import { gql } from "apollo-server-express";
import { find } from "lodash";

const people = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
  ]
  
  const cars = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura ',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
  ]

const typeDefs = gql`
    type People {
        id: String!
        firstName: String
        lastName: String
    }

    type Cars {
        id: String!
        year: String
        make: String
        model: String
        price: String
        personId: String!
    }

    type Query {
        people: [People]
        person(id: String!): People

        cars: [Cars]
        car(id: String!): Cars
    }
`

const resolvers = {
    Query: {
        people: () => people,

        person: (root, args) => {
            const person = find(people, {id: args.id})
            return person
        },

        cars: () => cars,

        car: (root, args) => {
            const car = find(cars, {id: args.id})
            return car
        }
    }
}


export  {typeDefs, resolvers }