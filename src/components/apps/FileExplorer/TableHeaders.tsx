import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { HiArrowSmDown } from 'react-icons/hi';
import { Sort, SortOrder } from 'utils/hooks/useFilesTable';
import { ResizeHandle } from './styled';

interface Props {
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  tableRef: React.MutableRefObject<HTMLDivElement | null>;
}

const headers = ['Name', 'Date modified', 'Size', 'Type'];
const minCellWidth = 150;

const createHeaders = (headers: string[]) => {
  return headers.map(item => ({
    text: item,
    ref: useRef<HTMLTableCellElement>(),
  }));
};

export const TableHeaders = ({ sort, setSort, tableRef }: Props) => {
  const [tableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const columns = createHeaders(headers);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          const rectLeft = col.ref.current!.getBoundingClientRect().left;
          const width = e.clientX - rectLeft;

          if (width >= minCellWidth) {
            return `${width}px`;
          }
        }

        return `${col.ref.current!.offsetWidth}px`;
      });

      tableRef.current!.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
    },
    [activeIndex, columns, tableRef],
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  const renderTableHeaders = () => {
    return columns.map(({ text, ref }, i) => {
      const sortingByThisCol = sort.col === i;

      const handleClick = () => {
        const getNewSortOrder = (currentSort: Sort): Sort['order'] => {
          if (currentSort.col === i) {
            return currentSort.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
          }

          return SortOrder.asc;
        };

        setSort(currentSort => ({ col: i, order: getNewSortOrder(currentSort) }));
      };

      return (
        // @ts-ignore
        <th ref={ref} key={text}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            onClick={handleClick}
          >
            <span>{text}</span>
            {sortingByThisCol && (
              <HiArrowSmDown
                style={{ transform: `rotate(${sort.order === 'desc' ? 0 : 180}deg)` }}
              />
            )}
          </div>
          <ResizeHandle
            style={{ height: tableHeight }}
            onMouseDown={() => setActiveIndex(i)}
            className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
          />
        </th>
      );
    });
  };

  return <tr>{renderTableHeaders()}</tr>;
};
