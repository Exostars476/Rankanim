import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import styled from 'styled-components'
import genreColors from '../../utils/style/colors'

const AnimeContainer = styled(Container)`
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 5px 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
`

const GenreStack = styled(Stack)`
    padding-left: 0;
    padding-top: 2px;
`

const RankingCol = styled(Col)`
    align-self: center;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 30px;
`

const ThumbnailCol = styled(Col)`
    text-align: center;
`

const Thumbnail = styled(Image)`
    height: 70px;
    width: 50px;
`

const CardBody = styled(Container)`
    height: 100%;
`

const CardBodyRow = styled(Row)`
    height: 50%;
    align-items: center;
`

const GenreBadge = styled(Badge)`
    background-color: ${(props) => genreColors.genreColors[mapGenreNameToColorKey(props.genreName)]} !important;
    color: ${(props) => getTextColorFromBackground(genreColors.genreColors[mapGenreNameToColorKey(props.genreName)])};
`

const getTextColorFromBackground = (background) => {
    let r = parseInt(background.substr(1, 2), 16)
    let g = parseInt(background.substr(3, 2), 16)
    let b = parseInt(background.substr(5, 2), 16)

    // Convert RGB to linear RGB
    r = r / 255.0
    g = g / 255.0
    b = b / 255.0
    r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    // Return #FFFFFF for low luminance; #000000 for high luminance
    return luminance < 0.179 ? '#FFFFFF' : '#000000'
}

const mapGenreNameToColorKey = (genreName) => {
    const genreMap = {
        Action: 'action',
        Aventure: 'adventure',
        Drame: 'drama',
        Comédie: 'comedy',
        Fantaisie: 'fantasy',
        Horreur: 'horror',
        Mystère: 'mystery',
        Romance: 'romance',
        'Science-fiction': 'sciFi',
        'Tranche de vie': 'sliceOfLife',
        Sport: 'sport',
        Surnaturel: 'supernatural',
    }

    return genreMap[genreName] || 'unknown'
}

const renderGenres = (genres, name) => {
    const genreToDisplay = genres.length > 4 ? genres.slice(0, 4) : genres

    return genreToDisplay.map((genre) => (
        <GenreBadge pill key={`${name}_${genre._id}`} bd="info" genreName={genre.name}>
            {genre.name}
        </GenreBadge>
    ))
}

function AnimeCard({ name, genres, note, thumbnail }) {
    const thumbnailPath = `${process.env.PUBLIC_URL}/${thumbnail}`

    return (
        <AnimeContainer>
            <Row>
                <ThumbnailCol>
                    <Thumbnail src={thumbnailPath} />
                </ThumbnailCol>
                <Col xs={9}>
                    <CardBody>
                        <CardBodyRow>{name}</CardBodyRow>
                        <CardBodyRow>
                            <GenreStack direction="horizontal" gap={1}>
                                {renderGenres(genres, name)}
                            </GenreStack>
                        </CardBodyRow>
                    </CardBody>
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
    thumbnail: PropTypes.string,
}

AnimeCard.defaultProps = {
    name: '',
    genres: [],
    note: 0,
    thumbnail: 'assets/images/thumbnails/no_image.jpg',
}

export default AnimeCard
