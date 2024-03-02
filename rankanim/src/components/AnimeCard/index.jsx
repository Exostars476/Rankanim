import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import styled from 'styled-components'

const AnimeContainer = styled(Container)`
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 5px 0;
`

const GenreStack = styled(Stack)`
    padding-left: 0;
    padding-top: 2px;
`

const RankingCol = styled(Col)`
    align-self: center;
`

function AnimeCard({ name, genres, note }) {
    return (
        <AnimeContainer>
            <Row>
                <Col>IMAGE</Col>
                <Col xs={10}>
                    <Container>
                        <Row>{name}</Row>
                        <Row>
                            <GenreStack direction="horizontal" gap={1}>
                                {genres.map((genre) => (
                                    <Badge pill key={`${name}_${genre._id}`} bd="info">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </GenreStack>
                        </Row>
                    </Container>
                </Col>
                <RankingCol>{note ? note : 9}</RankingCol>
            </Row>
        </AnimeContainer>
    )
}

AnimeCard.propTypes = {
    name: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    note: PropTypes.number,
}

AnimeCard.defaultProps = {
    name: '',
    genres: [],
    note: 0,
}

export default AnimeCard
