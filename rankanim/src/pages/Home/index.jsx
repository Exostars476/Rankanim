import React, { useEffect, useState } from 'react'
import { Loader } from '../../utils/style/Atoms'
import AnimeCard from '../../components/AnimeCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import styled from 'styled-components'

const AnimeListContainer = styled(Container)`
    width: 700px;
    height: 50%;
`

const PagingRow = styled(Row)`
    justify-content: end;
`

const PagingContainer = styled(Pagination)`
    width: max-content;
    float: right;
    margin-bottom: 0;
`

const NbAnimeSelect = styled(Form.Select)`
    width: auto;
    align-self: center;
    margin-right: 15px;
`

function Home() {
    const [animeList, setAnimeList] = useState([{}])
    const [currentPageAnimeList, setCurrentPageAnimeList] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [animeListIndex, setAnimeListIndex] = useState(0)
    const [nbAnimesDisplayed, setNbAnimeDisplayed] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        setIsLoading(true)

        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/api/anime')
                const data = await response.json()

                setAnimeList(data)

                // Select anime to display on current page
                const animesToDisplay = data?.slice(animeListIndex, animeListIndex + nbAnimesDisplayed)
                setCurrentPageAnimeList(animesToDisplay)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [nbAnimesDisplayed])

    useEffect(() => {
        const newAnimeList = animeList?.slice(animeListIndex, animeListIndex + nbAnimesDisplayed)
        setCurrentPageAnimeList(newAnimeList)
    }, [animeListIndex, animeList, nbAnimesDisplayed])

    const totalAnimes = animeList.length
    const totalPages = Math.ceil(totalAnimes / nbAnimesDisplayed)

    // Next page button
    const handleNext = () => {
        const nextPage = Math.min(totalPages - 1, currentPage + 1)
        setCurrentPage(nextPage)
        setAnimeListIndex(nextPage * nbAnimesDisplayed)
    }

    // Previous page button
    const handlePrevious = () => {
        const newPage = Math.max(0, currentPage - 1)
        setCurrentPage(newPage)
        setAnimeListIndex(newPage * nbAnimesDisplayed)
    }

    // First page button
    const handleFirst = () => {
        setAnimeListIndex(0)
        setCurrentPage(0)
    }

    // Last page button
    const handleLast = () => {
        setAnimeListIndex((totalPages - 1) * nbAnimesDisplayed)
        setCurrentPage(totalPages - 1)
    }

    // Specific page button
    const setPage = (page) => {
        const newIndex = page * nbAnimesDisplayed
        setAnimeListIndex(newIndex)
        setCurrentPage(page)
    }

    // Generate paging button
    const renderPageNumbers = () => {
        let pages = []
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(currentPage + 2, totalPages); i++) {
            pages.push(
                <Pagination.Item key={i} onClick={() => setPage(i - 1)} active={currentPage === i - 1}>
                    {i}
                </Pagination.Item>,
            )
        }

        // Add ellipsis before and add page 1 button
        if (currentPage > 3) {
            pages.unshift(<Pagination.Ellipsis />)
            pages.unshift(
                <Pagination.Item key={1} onClick={() => setPage(0)}>
                    1
                </Pagination.Item>,
            )
        }

        // Add ellipsis after and add last page button
        if (currentPage < totalPages - 3) {
            pages.push(<Pagination.Ellipsis />)
            pages.push(<Pagination.Item key={totalPages} onClick={() => setPage(totalPages - 1)}></Pagination.Item>)
        }

        return pages
    }

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <AnimeListContainer>
                    {currentPageAnimeList.map((anime) => (
                        <AnimeCard key={anime._id} name={anime.name} genres={anime.genres} thumbnail={anime.thumbnail}></AnimeCard>
                    ))}
                    <Container>
                        <PagingRow>
                            <NbAnimeSelect
                                size="sm"
                                aria-label="Number of anime displayed"
                                onChange={(e) => {
                                    setNbAnimeDisplayed(e.target.value)
                                }}
                            >
                                <option>{nbAnimesDisplayed}</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </NbAnimeSelect>
                            <PagingContainer>
                                <Pagination.First onClick={handleFirst} disabled={currentPage === 0} />
                                <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 0} />
                                {renderPageNumbers()}
                                <Pagination.Next onClick={handleNext} disabled={currentPage + 1 >= totalPages} />
                                <Pagination.Last onClick={handleLast} disabled={currentPage + 1 === totalPages} />
                            </PagingContainer>
                        </PagingRow>
                    </Container>
                </AnimeListContainer>
            )}
        </div>
    )
}

export default Home
