import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BookCart from './BookCard';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import BookDetails from './BookDetails';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
}));

function Book() {
    const books = useSelector((state) => state.books.bookList);
    const [bookLimit, setBookLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBook, setSearchBook] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [filterToggle, setFilterToggle] = useState(false);
    const [bookInfo, setBookInfo] = useState();
    const [toggle, setToggle] = useState(true);
    

    useEffect(() => {
        if (searchBook.length !== 0) {
            setFilterToggle(true);
            setFilterData(
                books.filter(
                    (bookObject) =>
                        bookObject.author.toLowerCase().includes(searchBook.toLowerCase()) ||
                        bookObject.bookName.toLowerCase().includes(searchBook.toLowerCase())
                )
            );
        } else {
            setFilterToggle(false);
        }
    }, [searchBook, books]);

    const setPage = (event, pagenum) => {
        setCurrentPage(pagenum);
    };
    
    
    const displayedBooks = filterToggle ? filterData : books.slice(bookLimit * (currentPage - 1), bookLimit * currentPage);

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column' }} className='w-[1345px] items-center mt-[-50px] ml-[70px]' >
            <Item className='w-[70%] mt-[80px]'>
                {
                    toggle ?
                        <div className=' w-full h-[80%] flex flex-col items-center '>
                            <div className='h-[33px] w-full flex justify-between items-center'>
                                <div className='flex justify-between items-center w-42'>
                                    <h2 className='font-bold text-[25px] flex items-bottom text-slate-800'>Books </h2>
                                    <p className='text-[12px] h-[16px] text-slate-400'> ({books.length} items)</p>
                                </div>
                                <button className='h-[80%] w-32 flex justify-center items-center shadow-sm shadow-slate-500'>sort by relevance</button>
                            </div>
                            <div className='flex flex-col justify-between items-center items-start  mt-[10px]'>
                                <Grid className='grid' container spacing={2}>
                                    {displayedBooks.map((bookobj) => (
                                        <BookCart key={bookobj.id} setToggle={setToggle} bookData={setBookInfo} bookobj={bookobj} />
                                    ))}
                                </Grid>
                            </div>
                            <Item color="primary" sx={{ marginTop: '20px' }}>
                                <Pagination onChange={setPage} color='primary' count={Math.ceil(books.length / bookLimit)} />
                            </Item>
                        </div> :
                        <BookDetails setToggle={setToggle} bookInfo={bookInfo} />
                }
            </Item>
        </Grid>
    );
}

export default Book;    

