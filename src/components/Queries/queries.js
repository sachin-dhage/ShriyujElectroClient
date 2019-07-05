import gql from 'graphql-tag'

export const getPinStatusQuery = gql`query($gpiopins:[String]){
  result: getGPIOPinStatus(
    gpiopins : $gpiopins
  ){
    GPIOPIN
    STATUS
  }
}`

export const setPinStatusQuery = gql`mutation($gpiopins:[GPIOIp!]!){
  result: setGPIOPinStatus(
    gpiopins : $gpiopins
  ){
    GPIOPIN
    STATUS
  }
}`