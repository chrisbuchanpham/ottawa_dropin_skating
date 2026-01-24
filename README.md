# Ottawa Drop-in Skating & Hockey

Search City of Ottawa drop-in skating and hockey sessions by date and neighbourhood.

Live site:
- https://chrisbuchanpham.github.io/ottawa_dropin_skating/

## Features
- Filters for skating, adult hockey (18+), and youth hockey.
- Time-of-day filters (morning, afternoon, evening).
- Calendar range selection with per-day location modal and list view routing.
- Neighbourhood grouping from west to east.
- CSV export of the current results.

## Data source
- https://data.ottrec.ca/export/latest.json

## How to use
1. Start on the calendar at `/` and drag across days to select a range (or click a single day).
2. Choose the activity type and time-of-day filters.
3. Single-day selections open the list view at `/<date>` with a back-to-calendar button.
4. Multi-day selections stay on the calendar; click a day to see locations in a modal.
5. Use Download CSV from the list view to save the current view.

## Notes
- Reservations are inferred from listing text and may change; check the facility listing if unsure.
