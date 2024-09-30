import { useBookCreateService } from "@/services/useBookCreateService";
import { useBookDeleteService } from "@/services/useBookDeleteService";
import { useBookStatusService } from "@/services/useBookStatusService";
import { IBook } from "@/types/book";
import { truncate } from "@/utils";

interface IComponentProps {
  book: IBook;
}

const BookCard = ({ book: { book, status } }: IComponentProps) => {
  const { createBook } = useBookCreateService();
  const { deleteBook } = useBookDeleteService();
  const { changeStatus } = useBookStatusService();

  const addBook = () => {
    createBook(book.isbn);
  };

  const removeBook = () => {
    deleteBook(book.id);
  };

  const canRead = useMemo(() => {
    return status === 0;
  }, [status]);

  const canFinish = useMemo(() => {
    return status !== 2;
  }, [status]);

  const startReading = () => {
    if (canRead) {
      const data = {
        id: book.id,
        status: 1,
      };
      changeStatus(data);
    }
  };

  const finishReading = () => {
    if (canFinish) {
      const data = {
        id: book.id,
        status: 2,
      };
      changeStatus(data);
    }
  };

  return (
    <div className="bg-white w-[200px] rounded-[10px] p-5 flex flex-col justify-between relative">
      <img src={book.cover} alt="book cover" />
      <div>
        <h4 className="text-black-main text-sm mt-2">
          {truncate(book.title, 20)}
        </h4>
        <p className="text-xs text-black-main">
          {book.author}, {book.published}
        </p>
        {!book.id ? (
          <button
            onClick={addBook}
            className="block w-full py-1 rounded-lg right-4 text-white top-4 uppercase mt-2 bg-orange-main "
          >
            Add
          </button>
        ) : (
          <div className="mt-2">
            {status === 0 ? (
              <button
                className="w-full bg-yellow-500 text-sm text-white py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-opacity-50"
                disabled={!canRead}
                onClick={startReading}
              >
                {canRead ? "Start reading" : "Reading"}
              </button>
            ) : (
              <button
                className="w-full bg-green-500 text-white py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-opacity-80"
                disabled={!canFinish}
                onClick={finishReading}
              >
                {!canFinish ? "Finished" : "Finish"}
              </button>
            )}
            <button
              className="w-full bg-red-500 text-white py-1 rounded-lg mt-2"
              onClick={removeBook}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
