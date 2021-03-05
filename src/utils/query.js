import { gql } from '@apollo/client';

const Query = (currency) => gql`
{
  products {
    id
    title
    image_url
    price(currency: ${currency})
  }
}
`

export default Query;
