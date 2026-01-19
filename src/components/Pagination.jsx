const Pagination = ({
    page,
    totalPages,
    total,
    limit,
    onPageChange,
    onLimitChange,
}) => {
    return (
        <div className="flex items-center justify-between py-4 text-sm">
            {/* Left: Total count */}
            <span className="text-gray-500 dark:text-white">
                {total} total items
            </span>

            {/* Center: Page controls */}
            <div className="flex items-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1 border dark:border-gray-400 dark:text-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="dark:text-white">
                    Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1 border dark:border-gray-400 dark:text-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
