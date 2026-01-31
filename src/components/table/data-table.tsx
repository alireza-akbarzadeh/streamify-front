
import { TableBody } from "./table-body"
import { TableBulkActions } from "./table-bulk-actions"
import { TableRoot } from "./table-context"
import { TableFilterTabs } from "./table-filter-tabs"
import { TableLoading } from "./table-loading"
import { TablePagination } from "./table-pagination"
import { TableSearch } from "./table-search"
import { TableStatusFilters } from "./table-status-filters"

/**
 * The unified Table object.
 * Usage: <Table.Root table={table}> ... <Table.Body /> </Table.Root>
 */
export const Table = {
    Root: TableRoot,
    Search: TableSearch,
    FilterTabs: TableFilterTabs,
    StatusFilters: TableStatusFilters,
    Body: TableBody,
    Pagination: TablePagination,
    BulkActions: TableBulkActions,
    Loading: TableLoading,
}