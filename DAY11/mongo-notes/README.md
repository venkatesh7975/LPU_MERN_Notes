# 📒 **Complete MongoDB Query & Aggregation Notes**

---

## 1. MongoDB Shell Basics

```bash
show databases        # List all databases
use <dbname>          # Switch to database <dbname>
show collections      # Show all collections in current database
db.createCollection("collectionName")  # Create a new collection
```

---

## 2. CRUD Operations in MongoDB

### CREATE

- **Insert one document**

```js
db.products.insertOne({
  name: "Shirt",
  price: 499,
  category: "men's clothing",
});
```

- **Insert multiple documents**

```js
db.products.insertMany([
  { name: "Jeans", price: 999, category: "men's clothing" },
  { name: "Dress", price: 799, category: "women's clothing" },
]);
```

---

### READ (Find Documents)

- **Find all documents**

```js
db.products.find();
```

- **Find documents matching condition**

```js
db.products.find({ price: 499 }); // exact match
db.products.find({ category: "books" }); // match category
```

- **Comparison operators**

```js
db.products.find({ price: { $gt: 500 } }); // price > 500
db.products.find({ price: { $gte: 500 } }); // price >= 500
db.products.find({ price: { $lt: 1000 } }); // price < 1000
db.products.find({ price: { $lte: 1000 } }); // price <= 1000
db.products.find({ price: { $ne: 999 } }); // price != 999
```

- **Logical operators**

```js
db.products.find({
  $and: [{ price: { $gt: 500 } }, { category: "men's clothing" }],
});

db.products.find({
  $or: [{ price: { $lt: 500 } }, { category: "books" }],
});

db.products.find({
  price: { $not: { $gte: 1000 } }, // price < 1000
});
```

- **Projection (select specific fields)**

```js
db.products.find({}, { name: 1, price: 1, _id: 0 }); // show only name, price, hide _id
```

- **Limit & Sort**

```js
db.products.find().limit(5); // limit results to 5
db.products.find().sort({ price: 1 }); // ascending price
db.products.find().sort({ price: -1 }); // descending price
```

---

### UPDATE

- **Update one document**

```js
db.products.updateOne({ name: "Shirt" }, { $set: { price: 599 } });
```

- **Update many documents**

```js
db.products.updateMany(
  { category: "men's clothing" },
  { $set: { discount: true } }
);
```

- **Replace one document**

```js
db.products.replaceOne(
  { name: "Shirt" },
  { name: "T-Shirt", price: 499, category: "men's clothing" }
);
```

- **Increment/decrement a value**

```js
db.products.updateOne(
  { name: "Shirt" },
  { $inc: { price: 100 } } // increase price by 100
);
```

- **Remove a field**

```js
db.products.updateOne({ name: "Shirt" }, { $unset: { discount: "" } });
```

---

### DELETE

- **Delete one document**

```js
db.products.deleteOne({ name: "Shirt" });
```

- **Delete many documents**

```js
db.products.deleteMany({ category: "expired" });
```

---

## 3. Extra Operations

- **Count documents**

```js
db.products.countDocuments(); // total documents count
db.products.countDocuments({ category: "books" }); // count with filter
```

- **Check if a field exists**

```js
db.products.find({ discount: { $exists: true } });
```

- **Drop collection**

```js
db.products.drop();
```

- **Drop database**

```js
use mydb;
db.dropDatabase();
```

---

## 4. MongoDB Aggregation Framework (Advanced Queries)

Aggregation uses a pipeline of stages:

```js
db.collection.aggregate([
  { stage1 },
  { stage2 },
  ...
]);
```

---

### Common Aggregation Stages & Examples

#### 1. `$match` — Filter documents (like `WHERE`)

```js
db.products.aggregate([{ $match: { category: "electronics" } }]);
```

#### 2. `$group` — Group and aggregate data

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      totalProducts: { $sum: 1 },
    },
  },
]);
```

Accumulators: `$sum`, `$avg`, `$min`, `$max`, `$push`, `$addToSet`

---

#### 3. `$project` — Shape the output

```js
db.products.aggregate([
  {
    $project: {
      _id: 0,
      title: 1,
      price: 1,
      discountedPrice: { $multiply: ["$price", 0.9] }, // 10% discount
    },
  },
]);
```

---

#### 4. `$sort` — Sort results

```js
db.products.aggregate([
  { $sort: { price: -1 } }, // descending by price
]);
```

---

#### 5. `$count` — Count documents

```js
db.products.aggregate([{ $count: "totalProducts" }]);
```

---

#### 6. Pagination: `$skip` and `$limit`

```js
db.products.aggregate([
  { $skip: 5 }, // skip first 5
  { $limit: 5 }, // get next 5
]);
```

---

#### 7. `$unwind` — Flatten arrays (for array fields)

```js
{
  $unwind: "$tags";
}
```

---

#### 8. Match with comparison on nested fields

```js
db.products.aggregate([{ $match: { "rating.rate": { $gt: 4 } } }]);
```

---

#### 9. Find top rated product per category

```js
db.products.aggregate([
  { $sort: { "rating.rate": -1 } },
  {
    $group: {
      _id: "$category",
      topProduct: { $first: "$title" },
      topRating: { $first: "$rating.rate" },
    },
  },
]);
```

---

#### 10. Average rating & total rating count per category

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgRating: { $avg: "$rating.rate" },
      totalRatings: { $sum: "$rating.count" },
    },
  },
]);
```

---

#### 11. Highest priced product in each category

```js
db.products.aggregate([
  { $sort: { price: -1 } },
  {
    $group: {
      _id: "$category",
      mostExpensive: { $first: "$title" },
      maxPrice: { $first: "$price" },
    },
  },
]);
```

---

#### 12. Products under ₹100 with rating > 4

```js
db.products.aggregate([
  { $match: { price: { $lt: 100 }, "rating.rate": { $gt: 4 } } },
  { $project: { title: 1, price: 1, "rating.rate": 1, _id: 0 } },
]);
```

---

#### 13. Count of products by rating buckets

```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$rating.rate",
      boundaries: [0, 2, 3, 4, 5],
      default: "other",
      output: {
        count: { $sum: 1 },
        titles: { $push: "$title" },
      },
    },
  },
]);
```

---

#### 14. Compare average prices: Men's vs Women's clothing

```js
db.products.aggregate([
  {
    $match: { category: { $in: ["men's clothing", "women's clothing"] } },
  },
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
    },
  },
]);
```

---

#### 15. Products with rating count > 400 sorted by rating

```js
db.products.aggregate([
  { $match: { "rating.count": { $gt: 400 } } },
  { $sort: { "rating.rate": -1 } },
  { $project: { title: 1, "rating.rate": 1, "rating.count": 1, _id: 0 } },
]);
```

---

# **Summary**

You now have a **complete reference** to MongoDB:

- Basic commands & database navigation
- CRUD operations with multiple real-world examples
- Aggregation pipeline stages with complex queries and transformations
- Collection & database management commands

---

Awesome! I'll craft **100 MongoDB queries** using your Fakestore API product schema — covering basic to advanced operations, explaining fundamentals clearly, with plenty of practical examples using fields like `id`, `title`, `price`, `description`, `category`, `image`, and nested `rating.rate` & `rating.count`.

---

# 100 MongoDB Queries Using Fakestore API Product Schema

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

---

## Insertions — Create

1. Insert one product (single document)

```js
db.products.insertOne({
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "...",
  category: "men's clothing",
  image: "...",
  rating: { rate: 3.9, count: 120 },
});
```

2. Insert many products (multiple documents)

```js
db.products.insertMany([
  {
    id: 2,
    title: "Mens Casual Slim Fit",
    price: 22.3,
    description: "...",
    category: "men's clothing",
    image: "...",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "...",
    category: "men's clothing",
    image: "...",
    rating: { rate: 4.7, count: 500 },
  },
]);
```

---

## Basic Reads — Find Queries

3. Find all products

```js
db.products.find();
```

4. Find product by exact title

```js
db.products.find({ title: "Mens Cotton Jacket" });
```

5. Find products with price exactly 109.95

```js
db.products.find({ price: 109.95 });
```

6. Find products where category is "men's clothing"

```js
db.products.find({ category: "men's clothing" });
```

7. Find products where rating.rate is 4.7

```js
db.products.find({ "rating.rate": 4.7 });
```

8. Find product by id 3

```js
db.products.find({ id: 3 });
```

---

## Filtering with Comparison Operators

9. Find products with price greater than 50

```js
db.products.find({ price: { $gt: 50 } });
```

10. Find products with price greater than or equal to 100

```js
db.products.find({ price: { $gte: 100 } });
```

11. Find products with price less than 50

```js
db.products.find({ price: { $lt: 50 } });
```

12. Find products with price less than or equal to 22.3

```js
db.products.find({ price: { $lte: 22.3 } });
```

13. Find products where rating.count is not equal to 120

```js
db.products.find({ "rating.count": { $ne: 120 } });
```

---

## Logical Operators

14. Find products priced above 50 AND in category "men's clothing"

```js
db.products.find({
  $and: [{ price: { $gt: 50 } }, { category: "men's clothing" }],
});
```

15. Find products priced below 30 OR have rating.rate above 4.5

```js
db.products.find({
  $or: [{ price: { $lt: 30 } }, { "rating.rate": { $gt: 4.5 } }],
});
```

16. Find products NOT in category "electronics"

```js
db.products.find({ category: { $not: { $eq: "electronics" } } });
```

17. Find products where category is either "men's clothing" or "women's clothing"

```js
db.products.find({ category: { $in: ["men's clothing", "women's clothing"] } });
```

18. Find products where category is NOT "men's clothing" or "women's clothing"

```js
db.products.find({
  category: { $nin: ["men's clothing", "women's clothing"] },
});
```

---

## Projection (Select specific fields)

19. Find all products but only show title and price (exclude \_id)

```js
db.products.find({}, { title: 1, price: 1, _id: 0 });
```

20. Find products with category "men's clothing" showing only title and rating.rate

```js
db.products.find(
  { category: "men's clothing" },
  { title: 1, "rating.rate": 1, _id: 0 }
);
```

21. Find all products excluding description and image fields

```js
db.products.find({}, { description: 0, image: 0 });
```

---

## Sorting

22. Find all products sorted by price ascending

```js
db.products.find().sort({ price: 1 });
```

23. Find all products sorted by price descending

```js
db.products.find().sort({ price: -1 });
```

24. Find all products sorted by rating.rate descending

```js
db.products.find().sort({ "rating.rate": -1 });
```

---

## Limiting and Skipping

25. Find first 5 products

```js
db.products.find().limit(5);
```

26. Find products skipping first 3, limit next 5

```js
db.products.find().skip(3).limit(5);
```

---

## Update Operations

27. Update price of product with id 1 to 120

```js
db.products.updateOne({ id: 1 }, { $set: { price: 120 } });
```

28. Increase price by 10 for all products in category "men's clothing"

```js
db.products.updateMany({ category: "men's clothing" }, { $inc: { price: 10 } });
```

29. Add new field discount: true to all products with price > 100

```js
db.products.updateMany({ price: { $gt: 100 } }, { $set: { discount: true } });
```

30. Remove discount field from product with id 1

```js
db.products.updateOne({ id: 1 }, { $unset: { discount: "" } });
```

31. Replace entire product document with id 2

```js
db.products.replaceOne(
  { id: 2 },
  {
    id: 2,
    title: "Updated Jacket",
    price: 75,
    description: "New description",
    category: "men's clothing",
    image: "...",
    rating: { rate: 4.5, count: 300 },
  }
);
```

---

## Delete Operations

32. Delete product with id 3

```js
db.products.deleteOne({ id: 3 });
```

33. Delete all products with price less than 20

```js
db.products.deleteMany({ price: { $lt: 20 } });
```

---

## Counting Documents

34. Count total products

```js
db.products.countDocuments();
```

35. Count products in category "electronics"

```js
db.products.countDocuments({ category: "electronics" });
```

36. Count products with rating.rate greater than 4.0

```js
db.products.countDocuments({ "rating.rate": { $gt: 4.0 } });
```

---

## Existence Check

37. Find products that have discount field

```js
db.products.find({ discount: { $exists: true } });
```

38. Find products missing discount field

```js
db.products.find({ discount: { $exists: false } });
```

---

## Text Search (If text index is created on title & description)

39. Search products containing "backpack" in title or description

```js
db.products.find({ $text: { $search: "backpack" } });
```

40. Search products with phrase "casual slim"

```js
db.products.find({ $text: { $search: '"casual slim"' } });
```

---

## Aggregation Pipeline Examples

41. Get average price of all products

```js
db.products.aggregate([
  { $group: { _id: null, avgPrice: { $avg: "$price" } } },
]);
```

42. Get average price per category

```js
db.products.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
]);
```

43. Get total number of products per category

```js
db.products.aggregate([
  { $group: { _id: "$category", totalProducts: { $sum: 1 } } },
]);
```

44. Get max price per category

```js
db.products.aggregate([
  { $group: { _id: "$category", maxPrice: { $max: "$price" } } },
]);
```

45. Get min price per category

```js
db.products.aggregate([
  { $group: { _id: "$category", minPrice: { $min: "$price" } } },
]);
```

46. Sort products by rating.rate descending, limit 5 (top 5 rated)

```js
db.products.aggregate([{ $sort: { "rating.rate": -1 } }, { $limit: 5 }]);
```

47. Get products with price under 50 and rating.rate > 4

```js
db.products.aggregate([
  { $match: { price: { $lt: 50 }, "rating.rate": { $gt: 4 } } },
]);
```

48. Show products with discounted price (10% off)

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      price: 1,
      discountedPrice: { $multiply: ["$price", 0.9] },
    },
  },
]);
```

49. Group products by category and collect all titles in array

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      titles: { $push: "$title" },
    },
  },
]);
```

50. Count total rating counts per category

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalRatingCount: { $sum: "$rating.count" },
    },
  },
]);
```

---

## Complex Aggregations

51. Get highest rated product title per category

```js
db.products.aggregate([
  { $sort: { "rating.rate": -1 } },
  {
    $group: {
      _id: "$category",
      topProduct: { $first: "$title" },
      topRating: { $first: "$rating.rate" },
    },
  },
]);
```

52. Bucket products by price ranges

```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 50, 100, 200, 1000],
      default: "Other",
      output: { count: { $sum: 1 }, titles: { $push: "$title" } },
    },
  },
]);
```

53. Filter and sort products with rating.count > 100 by price ascending

```js
db.products.aggregate([
  { $match: { "rating.count": { $gt: 100 } } },
  { $sort: { price: 1 } },
]);
```

54. Get average rating.rate of products with discount=true

```js
db.products.aggregate([
  { $match: { discount: true } },
  { $group: { _id: null, avgRating: { $avg: "$rating.rate" } } },
]);
```

55. Unwind array example — assuming tags field (add one for demo)

```js
db.products.updateOne(
  { id: 1 },
  { $set: { tags: ["outdoor", "travel", "backpack"] } }
);

db.products.aggregate([{ $match: { id: 1 } }, { $unwind: "$tags" }]);
```

---

## Array and Embedded Documents

56. Find products where rating.rate is between 4 and 5

```js
db.products.find({ "rating.rate": { $gte: 4, $lte: 5 } });
```

57. Find products where rating.count > 100 and price < 50

```js
db.products.find({ "rating.count": { $gt: 100 }, price: { $lt: 50 } });
```

58. Update rating.rate to 5 for product with id 2

```js
db.products.updateOne({ id: 2 }, { $set: { "rating.rate": 5 } });
```

59. Increment rating.count by 1 for product with id 2

```js
db.products.updateOne({ id: 2 }, { $inc: { "rating.count": 1 } });
```

---

## Pattern Matching & Regex

60. Find products with title starting with "Mens"

```js
db.products.find({ title: /^Mens/ });
```

61. Find products with title containing "Cotton"

```js
db.products.find({ title: /Cotton/i });
```

62. Find products with description ending with "forest."

```js
db.products.find({ description: /forest\.$/ });
```

---

## Indexes and Performance (basic commands)

63. Create text index on title and description for text search

```js
db.products.createIndex({ title: "text", description: "text" });
```

64. Create index on price field

```js
db.products.createIndex({ price: 1 });
```

65. View indexes on products collection

```js
db.products.getIndexes();
```

---

## Miscellaneous Queries

66. Find the most expensive product

```js
db.products.find().sort({ price: -1 }).limit(1);
```

67. Find the cheapest product

```js
db.products.find().sort({ price: 1 }).limit(1);
```

68. Find products with duplicate prices (aggregation example)

```js
db.products.aggregate([
  {
    $group: {
      _id: "$price",
      count: { $sum: 1 },
      products: { $push: "$title" },
    },
  },
  { $match: { count: { $gt: 1 } } },
]);
```

69. Rename field "title" to "productTitle" (requires aggregation with \$addFields + \$project)

```js
db.products.aggregate([
  {
    $addFields: { productTitle: "$title" },
  },
  {
    $project: { title: 0 },
  },
]);
```

---

## Bulk Write Example (insert/update/delete in one operation)

70. Bulk write example

```js
db.products.bulkWrite([
  {
    insertOne: {
      document: { id: 100, title: "New Product", price: 50, category: "new" },
    },
  },
  { updateOne: { filter: { id: 1 }, update: { $set: { price: 130 } } } },
  { deleteOne: { filter: { id: 3 } } },
]);
```

---

## More Advanced Aggregations

71. Calculate total revenue (sum of price \* rating.count) per category

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: {
        $sum: { $multiply: ["$price", "$rating.count"] },
      },
    },
  },
]);
```

72. Find products with rating.count greater than average rating count

```js
db.products.aggregate([
  {
    $group: { _id: null, avgRatingCount: { $avg: "$rating.count" } },
  },
  {
    $lookup: {
      from: "products",
      pipeline: [
        { $match: { $expr: { $gt: ["$rating.count", "$$avgRatingCount"] } } },
      ],
      as: "highRatedProducts",
    },
  },
]);
```

---

## Update Nested Documents

73. Set rating.rate to 4.8 for product with id 5

```js
db.products.updateOne({ id: 5 }, { $set: { "rating.rate": 4.8 } });
```

74. Increase rating.count by 10 for product with id 5

```js
db.products.updateOne({ id: 5 }, { $inc: { "rating.count": 10 } });
```

---

## Conditional Queries & Aggregations

75. Find products where price is between 50 and 150 inclusive

```js
db.products.find({ price: { $gte: 50, $lte: 150 } });
```

76. Find products where category is not "men's clothing" and rating.rate > 4

```js
db.products.find({
  category: { $ne: "men's clothing" },
  "rating.rate": { $gt: 4 },
});
```

---

## Using `$expr` for expressions in queries

77. Find products where price is greater than rating.rate \* 20

```js
db.products.find({
  $expr: { $gt: ["$price", { $multiply: ["$rating.rate", 20] }] },
});
```

---

## Aggregation with `$facet` (multiple pipelines)

78. Get counts and average price by category in one query

```js
db.products.aggregate([
  {
    $facet: {
      counts: [{ $group: { _id: "$category", count: { $sum: 1 } } }],
      avgPrices: [
        { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
      ],
    },
  },
]);
```

---

## Find products with long descriptions

79. Find products where description length > 100 characters (using aggregation)

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      descriptionLength: { $strLenCP: "$description" },
    },
  },
  {
    $match: { descriptionLength: { $gt: 100 } },
  },
]);
```

---

## Add a new array field to product documents

80. Add a new "tags" field as an empty array to all products

```js
db.products.updateMany({}, { $set: {
```

tags: \[] } });

````

---

## Add tags to a product

81. Add tags ["outdoor", "travel"] to product with id 1

```js
db.products.updateOne(
  { id: 1 },
  { $push: { tags: { $each: ["outdoor", "travel"] } } }
);
````

---

## Find products with a specific tag

82. Find products with tag "travel"

```js
db.products.find({ tags: "travel" });
```

---

## Remove a tag from product

83. Remove tag "travel" from product with id 1

```js
db.products.updateOne({ id: 1 }, { $pull: { tags: "travel" } });
```

---

## Find products with tags matching multiple tags (AND)

84. Find products that have both "outdoor" AND "travel" tags

```js
db.products.find({ tags: { $all: ["outdoor", "travel"] } });
```

---

## Array Filters on update (MongoDB 3.6+)

85. Update rating.rate to 5 for all products with rating.rate < 3

```js
db.products.updateMany(
  { "rating.rate": { $lt: 3 } },
  { $set: { "rating.rate": 5 } }
);
```

---

## Using `$sample` for random products

86. Get 3 random products

```js
db.products.aggregate([{ $sample: { size: 3 } }]);
```

---

## Distinct Values

87. Get list of all unique categories

```js
db.products.distinct("category");
```

---

## Using `$exists` with projections

88. Find products having a discount field and show only id, title, discount

```js
db.products.find(
  { discount: { $exists: true } },
  { id: 1, title: 1, discount: 1, _id: 0 }
);
```

---

## Find by Multiple Criteria in Embedded Docs

89. Find products where rating.rate is between 3 and 4, and rating.count > 100

```js
db.products.find({
  "rating.rate": { $gte: 3, $lte: 4 },
  "rating.count": { $gt: 100 },
});
```

---

## Rename a field in all documents (requires aggregation pipeline updates)

90. Rename "image" field to "imageUrl"

```js
db.products.aggregate([
  {
    $addFields: { imageUrl: "$image" },
  },
  {
    $project: { image: 0 },
  },
]);
```

---

## Find products with empty or missing description

91. Find products with empty description

```js
db.products.find({ description: "" });
```

92. Find products missing description field

```js
db.products.find({ description: { $exists: false } });
```

---

## Convert price to integer (rounding) in aggregation

93. Show price rounded down (floor)

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      priceRounded: { $floor: "$price" },
    },
  },
]);
```

---

## Combine multiple conditions with `$and`

94. Find products priced between 20 and 100 with rating.rate > 3.5

```js
db.products.find({
  $and: [{ price: { $gte: 20, $lte: 100 } }, { "rating.rate": { $gt: 3.5 } }],
});
```

---

## Using Regex with Case Insensitive Flag

95. Find products with category containing "Clothing" (case insensitive)

```js
db.products.find({ category: /clothing/i });
```

---

## Find products with titles containing digits

96. Find products with digits in title

```js
db.products.find({ title: /\d/ });
```

---

## Delete all documents (clear collection)

97. Delete all products

```js
db.products.deleteMany({});
```

---

## Drop products collection

98. Drop entire products collection

```js
db.products.drop();
```

---

## Create text index on title for search

99. Create text index on title

```js
db.products.createIndex({ title: "text" });
```

---

## Use `$regex` with `$options`

100. Search titles containing "shirt" case insensitive

```js
db.products.find({ title: { $regex: "shirt", $options: "i" } });
```

---

---

# Summary

These 100 queries span:

- Basic CRUD
- Filtering and logical operators
- Projection, sorting, pagination
- Updates & deletes (including nested fields)
- Text search & regex
- Aggregations for grouping, sorting, bucketing
- Array operations and updates
- Indexing and performance basics

---

Got it! Here are **100 more advanced and important MongoDB queries** using the Fakestore API product schema, continuing from the basics and diving deeper into aggregation, updates, indexing, array manipulation, conditional logic, and more complex scenarios.

---

# 100 More Important MongoDB Queries for Fakestore Data

---

### Insert / Upsert / Replace

1. Upsert product (insert if not exists, else update) by `id`

```js
db.products.updateOne(
  { id: 10 },
  { $set: { title: "New Product", price: 45, category: "new" } },
  { upsert: true }
);
```

2. Replace product with id 10 completely

```js
db.products.replaceOne(
  { id: 10 },
  {
    id: 10,
    title: "Replaced Product",
    price: 55,
    category: "men's clothing",
    rating: { rate: 4.0, count: 100 },
  }
);
```

---

### Aggregation with Conditional Logic

3. Add field `isExpensive` true if price > 100, else false

```js
db.products.aggregate([
  {
    $addFields: {
      isExpensive: { $gt: ["$price", 100] },
    },
  },
]);
```

4. Add field `ratingCategory`: "low", "medium", or "high" based on rating.rate

```js
db.products.aggregate([
  {
    $addFields: {
      ratingCategory: {
        $switch: {
          branches: [
            { case: { $lt: ["$rating.rate", 3] }, then: "low" },
            {
              case: {
                $and: [
                  { $gte: ["$rating.rate", 3] },
                  { $lt: ["$rating.rate", 4] },
                ],
              },
              then: "medium",
            },
            { case: { $gte: ["$rating.rate", 4] }, then: "high" },
          ],
          default: "unknown",
        },
      },
    },
  },
]);
```

---

### Find with Aggregation Expressions (`$expr`)

5. Find products where rating.count is greater than price

```js
db.products.find({
  $expr: { $gt: ["$rating.count", "$price"] },
});
```

6. Find products where price is twice or more of rating.rate

```js
db.products.find({
  $expr: { $gte: ["$price", { $multiply: ["$rating.rate", 2] }] },
});
```

---

### Array Operations & Updates

7. Add tag "sale" to all products priced over 50

```js
db.products.updateMany({ price: { $gt: 50 } }, { $addToSet: { tags: "sale" } });
```

8. Remove tag "sale" from all products

```js
db.products.updateMany({}, { $pull: { tags: "sale" } });
```

9. Update rating.count to max of current and 200 for products with rating.count < 200

```js
db.products.updateMany({ "rating.count": { $lt: 200 } }, [
  { $set: { "rating.count": { $max: ["$rating.count", 200] } } },
]);
```

---

### Complex Aggregations

10. Calculate average rating count for each rating category ("low", "medium", "high") using previous logic

```js
db.products.aggregate([
  {
    $addFields: {
      ratingCategory: {
        $switch: {
          branches: [
            { case: { $lt: ["$rating.rate", 3] }, then: "low" },
            {
              case: {
                $and: [
                  { $gte: ["$rating.rate", 3] },
                  { $lt: ["$rating.rate", 4] },
                ],
              },
              then: "medium",
            },
            { case: { $gte: ["$rating.rate", 4] }, then: "high" },
          ],
          default: "unknown",
        },
      },
    },
  },
  {
    $group: {
      _id: "$ratingCategory",
      avgRatingCount: { $avg: "$rating.count" },
    },
  },
]);
```

11. Group products by category and list products priced above average price of that category

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      products: { $push: { title: "$title", price: "$price" } },
    },
  },
  { $unwind: "$products" },
  {
    $match: {
      $expr: { $gt: ["$products.price", "$avgPrice"] },
    },
  },
  {
    $group: {
      _id: "$_id",
      expensiveProducts: { $push: "$products.title" },
    },
  },
]);
```

---

### Text Search Advanced

12. Find products with description containing "perfect pack" (case insensitive)

```js
db.products.find({ description: /perfect pack/i });
```

13. Text search with weights on title (higher) and description (lower)

```js
db.products.createIndex(
  { title: "text", description: "text" },
  { weights: { title: 5, description: 1 } }
);

db.products
  .find({ $text: { $search: "backpack" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } });
```

---

### Projections and Transformations

14. Project title, price, and convert price to integer (rounded)

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      priceRounded: { $round: ["$price", 0] },
    },
  },
]);
```

15. Project with conditional field: show "discounted" only if discount field exists

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      discounted: { $cond: [{ $ifNull: ["$discount", false] }, true, false] },
    },
  },
]);
```

---

### Updates with Array Filters

16. Increase rating.rate by 0.1 for all products where rating.rate < 4

```js
db.products.updateMany({ "rating.rate": { $lt: 4 } }, [
  { $set: { "rating.rate": { $add: ["$rating.rate", 0.1] } } },
]);
```

---

### Bulk Operations

17. Bulk write example: insert 2, update 1, delete 1

```js
db.products.bulkWrite([
  {
    insertOne: {
      document: {
        id: 101,
        title: "Bulk Product 1",
        price: 15,
        category: "misc",
        rating: { rate: 3, count: 10 },
      },
    },
  },
  {
    insertOne: {
      document: {
        id: 102,
        title: "Bulk Product 2",
        price: 25,
        category: "misc",
        rating: { rate: 4, count: 20 },
      },
    },
  },
  { updateOne: { filter: { id: 1 }, update: { $set: { price: 130 } } } },
  { deleteOne: { filter: { id: 3 } } },
]);
```

---

### Explain Plan and Index Use

18. Explain query plan for price > 50

```js
db.products.find({ price: { $gt: 50 } }).explain("executionStats");
```

19. Create compound index on category and price

```js
db.products.createIndex({ category: 1, price: -1 });
```

---

### Geospatial Queries (assuming location field exists)

20. Find products within 10 km of given coordinates (if `location` field exists)

```js
db.products.find({
  location: {
    $nearSphere: {
      $geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
      $maxDistance: 10000,
    },
  },
});
```

---

### Date Queries (if `createdAt` field added)

21. Insert product with `createdAt` date

```js
db.products.insertOne({
  id: 103,
  title: "New Date Product",
  price: 99,
  category: "new",
  rating: { rate: 4, count: 100 },
  createdAt: new Date("2023-01-01"),
});
```

22. Find products created after Jan 1, 2023

```js
db.products.find({ createdAt: { $gt: new Date("2023-01-01") } });
```

---

### Find with `$expr` on dates

23. Find products created in last 30 days (assuming `createdAt`)

```js
db.products.find({
  $expr: {
    $gte: [
      "$createdAt",
      { $dateSubtract: { startDate: new Date(), unit: "day", amount: 30 } },
    ],
  },
});
```

---

### Aggregation with Date Fields

24. Group products by year of creation

```js
db.products.aggregate([
  {
    $group: {
      _id: { $year: "$createdAt" },
      totalProducts: { $sum: 1 },
    },
  },
]);
```

---

### Faceted Search Example

25. Faceted search by category counts and price ranges

```js
db.products.aggregate([
  {
    $facet: {
      categories: [{ $group: { _id: "$category", count: { $sum: 1 } } }],
      priceRanges: [
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 20, 50, 100, 200, 500],
            default: "Other",
            output: { count: { $sum: 1 } },
          },
        },
      ],
    },
  },
]);
```

---

### Aggregation with `$merge` (save results to another collection)

26. Save products with price > 100 into `premium_products` collection

```js
db.products.aggregate([
  { $match: { price: { $gt: 100 } } },
  { $merge: "premium_products" },
]);
```

---

### Distinct Values with Conditions

27. Get distinct categories where avg price > 50

```js
db.products.aggregate([
  {
    $group: { _id: "$category", avgPrice: { $avg: "$price" } },
  },
  { $match: { avgPrice: { $gt: 50 } } },
  { $project: { category: "$_id", _id: 0 } },
]);
```

---

### Conditional Updates

28. Set discount field to true only for products priced above average price

```js
const avgPrice = db.products
  .aggregate([{ $group: { _id: null, avg: { $avg: "$price" } } }])
  .toArray()[0].avg;

db.products.updateMany(
  { price: { $gt: avgPrice } },
  { $set: { discount: true } }
);
```

---

### Map-Reduce (legacy but sometimes useful)

29. Use Map-Reduce to calculate total products per category

```js
db.products.mapReduce(
  function () {
    emit(this.category, 1);
  },
  function (key, values) {
    return Array.sum(values);
  },
  { out: "category_counts" }
);
```

---

### Distinct Nested Field Values

30. Get distinct rating rates

```js
db.products.distinct("rating.rate");
```

---

### Pagination using Aggregation `$skip` and `$limit`

31. Paginate products sorted by price ascending, page 2, 10 items per page

```js
db.products.aggregate([{ $sort: { price: 1 } }, { $skip: 10 }, { $limit: 10 }]);
```

---

### Multi-key Indexing (for array fields)

32. Create index on tags array field

```js
db.products.createIndex({ tags: 1 });
```

---

### Find products with tags array size greater than 2

33.

```js
db.products.find({
  tags: { $exists: true, $not: { $size: 0 }, $size: { $gt: 2 } },
});
```

---

### Conditional Projection

34. Project a field only if exists (hide if not)

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      discount: { $ifNull: ["$discount", "Not Available"] },
    },
  },
]);
```

---

### Using `$sample` in aggregation with match condition

35. Get 2 random products with price less than 50

```js
db.products.aggregate([
  { $match: { price: { $lt: 50 } } },
  { $sample: { size: 2 } },
]);
```

---

### Array Aggregation Example - unwind tags and count each tag

36.

```js
db.products.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

---

### Find products where rating.count is in array of values

37.

```js
db.products.find({ "rating.count": { $in: [120, 259, 500] } });
```

---

### Find products with price divisible by 10 (using aggregation modulo)

38.

```js
db.products.aggregate([
  {
    $match: {
      $expr: { $eq: [{ $mod: [{ $toInt: "$price" }, 10] }, 0] },
    },
  },
]);
```

---

### Create compound text index on title, description and category

39.

```js
db.products.createIndex({
  title: "text",
  description: "text",
  category: "text",
});
```

---

### Find products with rating.count between 100 and 300 using aggregation

40.

```js
db.products.aggregate([
  {
    $match: {
      "rating.count": { $gte: 100, $lte: 300 },
    },
  },
]);
```

---

### Using `$regex` for advanced pattern matching

41. Find products with title starting with either "Fjallraven" or "Mens"

```js
db.products.find({ title: { $regex: /^(Fjallraven|Mens)/ } });
```

---

### Add multiple tags at once without duplicates

42.

```js
db.products.updateOne(
  { id: 1 },
  { $addToSet: { tags: { $each: ["hiking", "summer", "lightweight"] } } }
);
```

---

### Remove multiple tags at once

43.

```js
db.products.updateOne({ id: 1 }, { $pullAll: { tags: ["hiking", "summer"] } });
```

---

### Aggregate to find products with rating below average rating for category

44.

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgRating: { $avg: "$rating.rate" },
    },
  },
  {
    $lookup: {
      from: "products",
      let: { cat: "$_id", avgRating: "$avgRating" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$category", "$$cat"] },
                { $lt: ["$rating.rate", "$$avgRating"] },
              ],
            },
          },
        },
      ],
      as: "belowAvgProducts",
    },
  },
]);
```

---

### Using `$redact` to filter fields conditionally

45. Hide products with rating.rate below 3

```js
db.products.aggregate([
  {
    $redact: {
      $cond: [{ $gte: ["$rating.rate", 3] }, "$$KEEP", "$$PRUNE"],
    },
  },
]);
```

---

### Sorting by nested fields, then by price

46.

```js
db.products.find().sort({ "rating.rate": -1, price: 1 });
```

---

### Update nested field only if condition matches

47. Increase rating.count by 5 only for products with rating.rate above 4.5

```js
db.products.updateMany(
  { "rating.rate": { $gt: 4.5 } },
  { $inc: { "rating.count": 5 } }
);
```

---

### Use `$exists` with `$ne` to find products missing or null discount

48.

```js
db.products.find({
  $or: [{ discount: { $exists: false } }, { discount: null }],
});
```

---

### Use `$type` operator

49. Find documents where price field is of type double

```js
db.products.find({ price: { $type: "double" } });
```

---

### Sort by computed field (price after discount 10%)

50.

```js
db.products.aggregate([
  {
    $addFields: {
      discountedPrice: { $multiply: ["$price", 0.9] },
    },
  },
  { $sort: { discountedPrice: 1 } },
]);
```

---

### Update multiple nested fields at once

51.

```js
db.products.updateOne(
  { id: 1 },
  {
    $set: {
      "rating.rate": 4.5,
      "rating.count": 500,
    },
  }
);
```

---

### Filter products with description length > 100 (aggregation)

52.

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      descLength: { $strLenCP: "$description" },
    },
  },
  { $match: { descLength: { $gt: 100 } } },
]);
```

---

### Use `$sample` with pipeline for pagination sampling

53. Get 5 random products after sorting by price descending

```js
db.products.aggregate([{ $sort: { price: -1 } }, { $sample: { size: 5 } }]);
```

---

### Aggregation with `$ifNull` to set default values

54.

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      discount: { $ifNull: ["$discount", false] },
    },
  },
]);
```

---

### Find products with category in array \["electronics", "jewelery"]

55.

```js
db.products.find({ category: { $in: ["electronics", "jewelery"] } });
```

---

### Find products NOT in categories \["men's clothing", "women's clothing"]

56.

```js
db.products.find({
  category: { $nin: ["men's clothing", "women's clothing"] },
});
```

---

### Use `$exists` and `$type` to find documents where `tags` is array

57.

```js
db.products.find({ tags: { $exists: true, $type: "array" } });
```

---

### Aggregation - Count of products by category with more than 2 products

58.

```js
db.products.aggregate([
  {
    $group: { _id: "$category", count: { $sum: 1 } },
  },
  { $match: { count: { $gt: 2 } } },
]);
```

---

### Update products to add field `stock` with default 100

59.

```js
db.products.updateMany({}, { $set: { stock: 100 } });
```

---

### Find products where stock is below 20

60.

```js
db.products.find({ stock: { $lt: 20 } });
```

---

### Increase stock by 10 for products priced above 200

61.

```js
db.products.updateMany({ price: { $gt: 200 } }, { $inc: { stock: 10 } });
```

---

### Delete products with stock 0

62.

```js
db.products.deleteMany({ stock: 0 });
```

---

### Count products grouped by stock level ranges

63.

```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$stock",
      boundaries: [0, 20, 50, 100, 200],
      default: "Other",
      output: { count: { $sum: 1 } },
    },
  },
]);
```

---

### Find products with `title` starting with capital letter

64.

```js
db.products.find({ title: /^[A-Z]/ });
```

---

### Find products with price as whole number (no decimals)

65.

```js
db.products.find({ $expr: { $eq: ["$price", { $trunc: "$price" }] } });
```

---

### Sort products by length of title descending

66.

```js
db.products.aggregate([
  {
    $addFields: {
      titleLength: { $strLenCP: "$title" },
    },
  },
  { $sort: { titleLength: -1 } },
]);
```

---

### Update price rounding all prices to 2 decimals

67.

```js
db.products.updateMany({}, [{ $set: { price: { $round: ["$price", 2] } } }]);
```

---

### Aggregation - Find category with highest average rating

68.

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgRating: { $avg: "$rating.rate" },
    },
  },
  { $sort: { avgRating: -1 } },
  { $limit: 1 },
]);
```

---

### Aggregation - Get top 3 most expensive products overall

69.

```js
db.products.aggregate([
  { $sort: { price: -1 } },
  { $limit: 3 },
  { $project: { title: 1, price: 1 } },
]);
```

---

### Find products with price between 50 and 150 and rating.rate >= 4.0

70.

```js
db.products.find({
  price: { $gte: 50, $lte: 150 },
  "rating.rate": { $gte: 4.0 },
});
```

---

### Create TTL Index (expire products after 30 days, assuming `createdAt`)

71.

```js
db.products.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
```

---

### Update nested rating rate and count atomically

72.

```js
db.products.updateOne(
  { id: 1 },
  { $inc: { "rating.rate": 0.1, "rating.count": 10 } }
);
```

---

### Find product with maximum rating.count

73.

```js
db.products.find().sort({ "rating.count": -1 }).limit(1);
```

---

### Find products with rating.rate not equal to 3.9

74.

```js
db.products.find({ "rating.rate": { $ne: 3.9 } });
```

---

### Find products with missing `tags` field or empty array

75.

```js
db.products.find({
  $or: [{ tags: { $exists: false } }, { tags: { $size: 0 } }],
});
```

---

### Aggregation: List categories and count products, include categories with zero products (left join simulation)

76. Requires categories collection — assuming one exists

```js
db.categories.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "name",
      foreignField: "category",
      as: "products",
    },
  },
  {
    $project: {
      name: 1,
      productCount: { $size: "$products" },
    },
  },
]);
```

---

### Find products with price increased by 10% and updated in place

77.

```js
db.products.updateMany({}, [
  { $set: { price: { $multiply: ["$price", 1.1] } } },
]);
```

---

### Aggregation with `$facet` to get multiple summaries

78.

```js
db.products.aggregate([
  {
    $facet: {
      averagePriceByCategory: [
        { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
      ],
      maxRatingByCategory: [
        { $group: { _id: "$category", maxRating: { $max: "$rating.rate" } } },
      ],
      productCount: [{ $count: "totalProducts" }],
    },
  },
]);
```

---

### Find products with description longer than 200 characters

79.

```js
db.products.aggregate([
  {
    $project: {
      title: 1,
      descLength: { $strLenCP: "$description" },
    },
  },
  { $match: { descLength: { $gt: 200 } } },
]);
```

---

### Find products with rating.rate and rating.count fields present

80.

```js
db.products.find({
  rating: { $exists: true },
  "rating.rate": { $exists: true },
  "rating.count": { $exists: true },
});
```

---

### Update documents adding field `lastUpdated` with current timestamp

81.

```js
db.products.updateMany({}, { $currentDate: { lastUpdated: true } });
```

---

### Aggregation: Calculate average price excluding outliers (price > 3 std dev from mean)

82.

```js
db.products.aggregate([
  {
    $group: {
      _id: null,
      avgPrice: { $avg: "$price" },
      stdDevPrice: { $stdDevPop: "$price" },
    },
  },
  {
    $lookup: {
      from: "products",
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    "$price",
                    {
                      $subtract: [
                        "$avgPrice",
                        { $multiply: ["$stdDevPrice", 3] },
                      ],
                    },
                  ],
                },
                {
                  $lte: [
                    "$price",
                    { $add: ["$avgPrice", { $multiply: ["$stdDevPrice", 3] }] },
                  ],
                },
              ],
            },
          },
        },
      ],
      as: "filteredProducts",
    },
  },
]);
```

---

### Find products sorted by text search score

83.

```js
db.products
  .find({ $text: { $search: "backpack" } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } });
```

---

### Find product IDs with duplicate titles

84.

```js
db.products.aggregate([
  {
    $group: {
      _id: "$title",
      count: { $sum: 1 },
      ids: { $push: "$id" },
    },
  },
  { $match: { count: { $gt: 1 } } },
]);
```

---

### Update products to add `tags` field if missing

85.

```js
db.products.updateMany({ tags: { $exists: false } }, { $set: { tags: [] } });
```

---

### Find products with price ending with .99

86.

```js
db.products.find({ price: { $regex: /\.99$/ } });
```

---

### Aggregation: Group by category and count products with price > 100

87.

```js
db.products.aggregate([
  { $match: { price: { $gt: 100 } } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
]);
```

---

### Remove field `discount` from all documents

88.

```js
db.products.updateMany({}, { $unset: { discount: "" } });
```

---

### Rename field `rating.rate` to `rating_score` (aggregation)

89.

```js
db.products.aggregate([
  {
    $addFields: { rating_score: "$rating.rate" },
  },
  {
    $project: { "rating.rate": 0 },
  },
]);
```

---

### Find products with multiple conditions (price > 50, rating.count < 100, category != "electronics")

90.

```js
db.products.find({
  price: { $gt: 50 },
  "rating.count": { $lt: 100 },
  category: { $ne: "electronics" },
});
```

---

### Create unique index on id field

91.

```js
db.products.createIndex({ id: 1 }, { unique: true });
```

---

### Find products with missing or null price field

92.

```js
db.products.find({
  $or: [{ price: { $exists: false } }, { price: null }],
});
```

---

### Find products with titles containing words "backpack" or "bag"

93.

```js
db.products.find({
  $text: { $search: "backpack bag" },
});
```

---

### Aggregation to find category with max total rating count

94.

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalRatingCount: { $sum: "$rating.count" },
    },
  },
  { $sort: { totalRatingCount: -1 } },
  { $limit: 1 },
]);
```

---

### Project nested fields with aliasing

95.

```js
db.products.aggregate([
  {
    $project: {
      productTitle: "$title",
      priceInINR: { $multiply: ["$price", 75] }, // assuming conversion rate
      ratingValue: "$rating.rate",
    },
  },
]);
```

---

### Filter documents based on existence of nested field

96.

```js
db.products.find({ "rating.rate": { $exists: true } });
```

---

### Find products where tags array has exactly 3 elements

97.

```js
db.products.find({ tags: { $size: 3 } });
```

---

### Sort products by number of tags descending

98.

```js
db.products.aggregate([
  {
    $addFields: {
      tagsCount: { $size: { $ifNull: ["$tags", []] } },
    },
  },
  { $sort: { tagsCount: -1 } },
]);
```

---

### Count total number of tags used across all products

99.

```js
db.products.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: null, totalTags: { $sum: 1 } } },
]);
```

---

### Find products where rating.count is multiple of 50

100.

```js
db.products.aggregate([
  {
    $match: {
      $expr: { $eq: [{ $mod: ["$rating.count", 50] }, 0] },
    },
  },
]);
```

---

---

# Summary

These 100 advanced queries expand on:

- Upserts, replacements, bulk operations
- Conditional aggregation and `$switch` usage
- `$expr` for comparisons involving fields
- Array updates with `$addToSet`, `$pullAll`
- Faceted search and bucketing
- Date queries and TTL indexes
- Text search indexing and scoring
- Index creation and explain plans
- Aggregations with grouping, sorting, and projecting nested fields
- Complex filters with regex, logical operators, and `$exists`
- Pagination with aggregation
- Map-reduce example
- Geospatial queries (if applicable)

If you want these queries in a **downloadable file** (Markdown or PDF), or imported into your Notion or other documentation, just let me know!
