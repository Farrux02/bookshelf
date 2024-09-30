import BookCard from "@/components/BookCard";
import useDebounce from "@/hooks/useDebounce";
import { useBooksGetService } from "@/services/useBooksGetService";
import { IBook } from "@/types/book";
import { Skeleton, TextField } from "@mui/material";

const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading } = useBooksGetService(debouncedSearchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div>
        <TextField
          placeholder="Search a book for adding to library"
          className="w-full bg-white"
          slotProps={{ htmlInput: { className: "!p-2", type: "search" } }}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex gap-4 flex-wrap h-[400px]">
            <Skeleton className="w-[200px] h-[400px] block" />
            <Skeleton className="w-[200px] h-[400px] block" />
            <Skeleton className="w-[200px] h-[400px] block" />
            <Skeleton className="w-[200px] h-[400px] block" />
          </div>
        ) : !isLoading && !data?.length ? (
          <p>Search a book for adding to library</p>
        ) : !isLoading && data?.length ? (
          <div className="flex gap-4 flex-wrap">
            {data.map((book: IBook) => (
              <BookCard book={book} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BooksSearch;
