import React from 'react'
import { Pagination } from 'semantic-ui-react'

const ProductListPagination = ({total}) => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={total}
    size="tiny"
   
   
  />
)

export default ProductListPagination;