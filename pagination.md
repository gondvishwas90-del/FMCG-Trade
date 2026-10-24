# Implementation Plan: Persistent Pagination in Admin Pages

## Goal
Implement persistent pagination and filtering across all admin pages using the `nuqs` library. This ensures that the state (page, rows per page, search, and filters) is preserved in the URL, allowing for bookmarking, sharing, and correct back/forward navigation.

## Target Files
The following files in `src/app/admin` have been identified as having pagination implementations that need refactoring:

1. `trade-offers/client.tsx`
2. `uk-domestic-trade-offers/client.tsx`
3. `hero-banners/client.tsx`
4. `brands/client.tsx`
5. `categories/client.tsx`
6. `brand-owners/client.tsx`

## Issues Identified
- **State Loss on Refresh**: Current `useState` implementation loses page number, rows per page, and search/filter criteria when the page is reloaded.
- **Broken Back/Forward Navigation**: Navigation through pagination or filters doesn't create browser history entries, so the back button doesn't work as expected.
- **Deep Linking**: Impossible to share a URL that points to a specific page or a filtered set of data.
- **Manual Reset Logic**: Resetting to page 1 is currently handled manually in multiple places (e.g., `onSearchChange`), which is prone to being missed in new filters.
- **Implicit Type Handling**: State values like `page` and `rowsPerPage` are numbers in code but strings in the URL, requiring manual conversion if synced manually.

## Proposed Solution: `nuqs` Integration

### 1. Unified Search Parameter Schema
Define a consistent schema for pagination and filtering to be used across all admin tables.

```typescript
import { 
  parseAsInteger, 
  parseAsString, 
  parseAsArrayOf, 
  parseAsStringLiteral 
} from 'nuqs';

const paginationSchema = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(''),
  sort: parseAsString,
  order: parseAsStringLiteral(['asc', 'desc']).withDefault('asc')
};
```

### 2. Refactoring Strategy
- Replace `useState` with `useQueryStates` from `nuqs`.
- Set `shallow: true` to ensure URL updates don't trigger unnecessary server-side re-renders, as current filtering/pagination is handled on the client via `useMemo`.
- Ensure that updating filters or search automatically resets the `page` to 1.

### 3. Shared Hook (Optional but Recommended)
Create a `useDataTableParams` hook in `src/app/admin/_hooks/use-data-table-params.ts` to encapsulate the logic for common parameters.

## Implementation Steps

### Step 1: Create Shared Hook
Define common parameters for all tables.

### Step 2: Refactor `TradeOffersClient`
This is the most complex page with multiple filters.
- Migrate `page`, `rowsPerPage`, `search`, `availabilityFilter`, and `categoryFilter` to `nuqs`.

### Step 3: Refactor `BrandsClient`
- Migrate `page`, `rowsPerPage`, `search`, `capabilitiesFilter`, and `countryFilter` to `nuqs`.

### Step 4: Refactor remaining pages
- `UKDomesticTradeOffersClient`
- `HeroBannersClient`
- `CategoriesClient`
- `BrandOwnersClient`

## Verification Plan
- [x] Change page and refresh: Page number should persist.
- [x] Change rows per page and refresh: Limit should persist.
- [x] Enter a search query, go to page 2, then clear search: Page should reset to 1.
- [x] Use browser back button: Previous pagination/filter state should be restored.
- [x] Copy URL and open in new tab: All filters and pagination should be preserved.
