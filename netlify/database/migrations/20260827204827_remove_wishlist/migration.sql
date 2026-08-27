-- The wishlist/restock-hunt feature depended on staff scanning each book's
-- ISBN in as it arrived; since arrivals aren't scanned in, matches never
-- fired and the feature only caused confusion. Removed.
DROP TABLE IF EXISTS wishlists;
