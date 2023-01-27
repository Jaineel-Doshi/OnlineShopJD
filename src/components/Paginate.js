import React from 'react'
// import { Pagination } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { LinkContainer } from 'react-router-bootstrap'

{/* Turns number of pages into array and maps page to specific url  */ }
function Paginate({ pages, page, keyword = '' }) {

    // Turns this 'KEYWORD: ?keyword=device&page=1' into this: 'device'
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }



    console.log('KEYWORD:', keyword)

    return (pages > 1 && (
        <Pagination size='sm'>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer key={x + 1}
                    to={`/?keyword=${keyword}&page=${x + 1}`}
                >
                    <Pagination.Item active={x + 1 === page} key={x + 1}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    ))
}

export default Paginate